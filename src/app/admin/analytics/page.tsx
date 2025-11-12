import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Code,
  Zap,
  Target,
  PieChart,
} from 'lucide-react';

export default async function AdminAnalyticsPage() {
  const session = await auth();
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Fetch all analytics data
  const [
    totalUsers,
    totalQuotes,
    totalProjects,
    totalRevenue,
    quotesByStatus,
    quotesByService,
    projectsByStatus,
    recentQuotes,
    recentProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.quote.count(),
    prisma.project.count(),
    prisma.project.aggregate({ _sum: { contractValue: true, paidAmount: true } }),
    prisma.quote.groupBy({ by: ['status'], _count: true }),
    prisma.quote.groupBy({ by: ['serviceType'], _count: true }),
    prisma.project.groupBy({ by: ['status'], _count: true }),
    prisma.quote.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true, oneTimeTotal: true, serviceType: true },
    }),
    prisma.project.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true, contractValue: true },
    }),
  ]);

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenueAmount = Number(totalRevenue._sum?.contractValue || 0);
  const totalPaidAmount = Number(totalRevenue._sum?.paidAmount || 0);
  const outstandingAmount = totalRevenueAmount - totalPaidAmount;
  const collectionRate = totalRevenueAmount > 0 ? (totalPaidAmount / totalRevenueAmount) * 100 : 0;

  // Calculate conversion rates
  const submittedQuotes = quotesByStatus.find(q => q.status === 'SUBMITTED')?._count || 0;
  const acceptedQuotes = quotesByStatus.find(q => q.status === 'ACCEPTED')?._count || 0;
  const conversionRate = totalQuotes > 0 ? (totalProjects / totalQuotes) * 100 : 0;
  const acceptanceRate = (submittedQuotes + acceptedQuotes) > 0 ? (acceptedQuotes / (submittedQuotes + acceptedQuotes)) * 100 : 0;

  // Service breakdown
  const serviceTypeConfig: { [key: string]: { label: string; icon: any; color: string } } = {
    WEBSITE_DEVELOPMENT: { label: 'Website', icon: Globe, color: 'text-blue-400' },
    SOFTWARE_DEVELOPMENT: { label: 'Software', icon: Code, color: 'text-purple-400' },
    WORKFLOW_AUTOMATION: { label: 'Automation', icon: Zap, color: 'text-orange-400' },
  };

  const serviceBreakdown = quotesByService.map(service => ({
    type: service.serviceType,
    count: service._count,
    label: serviceTypeConfig[service.serviceType]?.label || service.serviceType,
    icon: serviceTypeConfig[service.serviceType]?.icon,
    color: serviceTypeConfig[service.serviceType]?.color,
    percentage: totalQuotes > 0 ? (service._count / totalQuotes) * 100 : 0,
  }));

  // Project status breakdown
  const activeProjects = projectsByStatus
    .filter(p => ['PENDING', 'IN_PROGRESS'].includes(p.status))
    .reduce((sum, p) => sum + p._count, 0);

  const completedProjects = projectsByStatus.find(p => p.status === 'COMPLETED')?._count || 0;
  const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

  // Calculate average deal size
  const avgDealSize = totalProjects > 0 ? totalRevenueAmount / totalProjects : 0;

  // Monthly trend (simplified - last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentQuotesLast30 = recentQuotes.filter(q => new Date(q.createdAt) >= thirtyDaysAgo);
  const recentProjectsLast30 = recentProjects.filter(p => new Date(p.createdAt) >= thirtyDaysAgo);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link 
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-2">Business insights and performance metrics</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+{collectionRate.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-green-400">{formatKES(totalRevenueAmount)}</p>
            <p className="text-xs text-gray-500 mt-2">{formatKES(totalPaidAmount)} collected</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-purple-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{acceptanceRate.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Quote Conversion</p>
            <p className="text-3xl font-bold">{conversionRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-2">{totalProjects} of {totalQuotes} quotes</p>
          </div>

          {/* Active Projects */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-blue-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{activeProjects}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Projects</p>
            <p className="text-3xl font-bold">{totalProjects}</p>
            <p className="text-xs text-gray-500 mt-2">{completionRate.toFixed(0)}% completed</p>
          </div>

          {/* Average Deal Size */}
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex items-center gap-1 text-orange-400 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>Avg</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">Avg Deal Size</p>
            <p className="text-3xl font-bold text-orange-400">{formatKES(avgDealSize)}</p>
            <p className="text-xs text-gray-500 mt-2">Per project</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Type Distribution */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold">Service Distribution</h2>
            </div>
            
            <div className="space-y-4">
              {serviceBreakdown.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div key={service.type}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ServiceIcon className={`w-4 h-4 ${service.color}`} />
                        <span className="text-sm font-medium">{service.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{service.count} quotes</span>
                        <span className={`text-sm font-bold ${service.color}`}>
                          {service.percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${service.color.replace('text-', 'bg-')}`}
                        style={{ width: `${service.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {serviceBreakdown.length === 0 && (
              <p className="text-gray-400 text-center py-8">No data available</p>
            )}
          </div>

          {/* Financial Overview */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold">Financial Overview</h2>
            </div>
            
            <div className="space-y-6">
              {/* Revenue Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Revenue Collection</span>
                  <span className="text-sm font-bold">{collectionRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${collectionRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Collected: {formatKES(totalPaidAmount)}</span>
                  <span className="text-gray-500">Total: {formatKES(totalRevenueAmount)}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Contract Value</p>
                  <p className="text-lg font-bold">{formatKES(totalRevenueAmount)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Collected</p>
                  <p className="text-lg font-bold text-green-400">{formatKES(totalPaidAmount)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Outstanding</p>
                  <p className="text-lg font-bold text-orange-400">{formatKES(outstandingAmount)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Avg Deal</p>
                  <p className="text-lg font-bold text-purple-400">{formatKES(avgDealSize)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quote Performance */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">Quote Performance</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Total Quotes</span>
                <span className="text-xl font-bold">{totalQuotes}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Conversion Rate</span>
                <span className="text-xl font-bold text-purple-400">{conversionRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Last 30 Days</span>
                <span className="text-xl font-bold text-blue-400">{recentQuotesLast30.length}</span>
              </div>
            </div>
          </div>

          {/* Project Performance */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold">Project Performance</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Total Projects</span>
                <span className="text-xl font-bold">{totalProjects}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Active Now</span>
                <span className="text-xl font-bold text-blue-400">{activeProjects}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Completion Rate</span>
                <span className="text-xl font-bold text-green-400">{completionRate.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Client Metrics */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-bold">Client Metrics</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Total Clients</span>
                <span className="text-xl font-bold">{totalUsers}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Avg Revenue/Client</span>
                <span className="text-xl font-bold text-green-400">
                  {formatKES(totalUsers > 0 ? totalRevenueAmount / totalUsers : 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Acceptance Rate</span>
                <span className="text-xl font-bold text-purple-400">{acceptanceRate.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Link
              href="/admin/quotes?status=SUBMITTED"
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">Review Quotes</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400" />
            </Link>
            <Link
              href="/admin/projects?status=IN_PROGRESS"
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">Active Projects</span>
              <ArrowUpRight className="w-4 h-4 text-blue-400" />
            </Link>
            <Link
              href="/admin/clients"
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">Manage Clients</span>
              <ArrowUpRight className="w-4 h-4 text-orange-400" />
            </Link>
            <Link
              href="/admin"
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">Dashboard</span>
              <ArrowUpRight className="w-4 h-4 text-green-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
