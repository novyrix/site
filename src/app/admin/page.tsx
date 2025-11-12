import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  DollarSign,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const user = session.user;

  // Fetch all stats in parallel
  const [
    totalUsers,
    totalQuotes,
    totalProjects,
    totalRevenue,
    recentQuotes,
    recentProjects,
    quotesByStatus,
    projectsByStatus,
  ] = await Promise.all([
    // Total users
    prisma.user.count(),

    // Total quotes
    prisma.quote.count(),

    // Total projects
    prisma.project.count(),

    // Total revenue (sum of all project contract values)
    prisma.project.aggregate({
      _sum: { contractValue: true },
    }),

    // Recent quotes (last 5)
    prisma.quote.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),

    // Recent projects (last 5)
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        quote: true,
      },
    }),

    // Quotes by status
    prisma.quote.groupBy({
      by: ['status'],
      _count: true,
    }),

    // Projects by status
    prisma.project.groupBy({
      by: ['status'],
      _count: true,
    }),
  ]);

  const totalRevenueAmount = Number(totalRevenue._sum?.contractValue || 0);

  // Format currency
  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  // Calculate quote stats
  const draftQuotes = quotesByStatus.find(q => q.status === 'DRAFT')?._count || 0;
  const submittedQuotes = quotesByStatus.find(q => q.status === 'SUBMITTED')?._count || 0;
  const acceptedQuotes = quotesByStatus.find(q => q.status === 'ACCEPTED')?._count || 0;

  // Calculate project stats
  const activeProjects = projectsByStatus
    .filter(p => ['PENDING', 'IN_PROGRESS'].includes(p.status))
    .reduce((sum, p) => sum + p._count, 0);

  const completedProjects = projectsByStatus.find(p => p.status === 'COMPLETED')?._count || 0;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user.name}! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm text-green-400 font-medium">+12.5%</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-green-400">{formatKES(totalRevenueAmount)}</p>
          </div>

          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm text-blue-400 font-medium">+{totalUsers}</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Clients</p>
            <p className="text-3xl font-bold">{totalUsers}</p>
            <Link
              href="/admin/clients"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
            >
              View all →
            </Link>
          </div>

          {/* Active Projects */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-sm text-purple-400 font-medium">{activeProjects} active</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Projects</p>
            <p className="text-3xl font-bold">{totalProjects}</p>
            <Link
              href="/admin/projects"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors mt-2 inline-block"
            >
              Manage →
            </Link>
          </div>

          {/* Total Quotes */}
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-sm text-orange-400 font-medium">{submittedQuotes} pending</span>
            </div>
            <p className="text-sm text-gray-400 mb-1">Total Quotes</p>
            <p className="text-3xl font-bold">{totalQuotes}</p>
            <Link
              href="/admin/quotes"
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors mt-2 inline-block"
            >
              Review →
            </Link>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quote Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-bold">Quote Pipeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Draft</span>
                <span className="font-medium">{draftQuotes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Submitted</span>
                <span className="font-medium text-yellow-400">{submittedQuotes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Accepted</span>
                <span className="font-medium text-green-400">{acceptedQuotes}</span>
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">Project Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Active</span>
                <span className="font-medium text-blue-400">{activeProjects}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Completed</span>
                <span className="font-medium text-green-400">{completedProjects}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <span className="font-medium">{totalProjects}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <Link
                href="/admin/quotes?status=SUBMITTED"
                className="block px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-sm transition-colors"
              >
                Review Pending Quotes ({submittedQuotes})
              </Link>
              <Link
                href="/admin/analytics"
                className="block px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm transition-colors"
              >
                View Analytics
              </Link>
              <Link
                href="/admin/projects?status=IN_PROGRESS"
                className="block px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm transition-colors"
              >
                Check Active Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Quotes */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Quotes</h3>
              <Link
                href="/admin/quotes"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                View all →
              </Link>
            </div>

            {recentQuotes.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No quotes yet</p>
            ) : (
              <div className="space-y-3">
                {recentQuotes.map((quote) => {
                  const statusConfig: { [key: string]: { color: string; bg: string; icon: any } } = {
                    DRAFT: { color: 'text-gray-400', bg: 'bg-gray-500/10', icon: Clock },
                    SUBMITTED: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: AlertCircle },
                    ACCEPTED: { color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
                    REJECTED: { color: 'text-red-400', bg: 'bg-red-500/10', icon: XCircle },
                  };

                  const config = statusConfig[quote.status];
                  const StatusIcon = config.icon;

                  return (
                    <Link
                      key={quote.id}
                      href={`/admin/quotes/${quote.id}`}
                      className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{quote.user.name}</p>
                          <p className="text-sm text-gray-400 truncate">{quote.user.email}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {quote.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{quote.serviceType.replace('_', ' ')}</span>
                        <span className="font-medium">{formatKES(Number(quote.oneTimeTotal))}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{formatDate(quote.createdAt)}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Projects */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Projects</h3>
              <Link
                href="/admin/projects"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                View all →
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => {
                  const statusConfig: { [key: string]: { color: string; bg: string; icon: any } } = {
                    PENDING: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Clock },
                    IN_PROGRESS: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Activity },
                    COMPLETED: { color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
                    ON_HOLD: { color: 'text-orange-400', bg: 'bg-orange-500/10', icon: AlertCircle },
                    CANCELLED: { color: 'text-red-400', bg: 'bg-red-500/10', icon: XCircle },
                  };

                  const config = statusConfig[project.status];
                  const StatusIcon = config.icon;

                  return (
                    <Link
                      key={project.id}
                      href={`/admin/projects/${project.id}`}
                      className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{project.name}</p>
                          <p className="text-sm text-gray-400 truncate">{project.user.name}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {project.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{project.quote.serviceType.replace('_', ' ')}</span>
                        <span className="font-medium">{formatKES(Number(project.contractValue))}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Started {project.startDate ? formatDate(project.startDate) : 'Not started'}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
