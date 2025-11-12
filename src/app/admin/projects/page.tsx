import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Briefcase,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  Activity,
  CheckCircle,
  Pause,
  XCircle,
  User,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  Globe,
  Code,
  Zap,
  FileText,
} from 'lucide-react';

interface AdminProjectsPageProps {
  searchParams: {
    status?: string;
    search?: string;
  };
}

export default async function AdminProjectsPage({ searchParams }: AdminProjectsPageProps) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Build filters
  const where: any = {};
  
  if (searchParams.status) {
    where.status = searchParams.status;
  }
  
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search } },
      { user: { name: { contains: searchParams.search } } },
      { user: { company: { contains: searchParams.search } } },
    ];
  }

  // Fetch projects with user and quote info
  const [projects, totalCount, statusCounts] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        user: true,
        quote: true,
        _count: {
          select: {
            invoices: true,
            supportTickets: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    
    prisma.project.count({ where }),
    
    prisma.project.groupBy({
      by: ['status'],
      _count: true,
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

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not set';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const statusConfig: { [key: string]: { label: string; icon: any; color: string; bg: string } } = {
    PENDING: { label: 'Pending', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    IN_PROGRESS: { label: 'In Progress', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    COMPLETED: { label: 'Completed', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
    ON_HOLD: { label: 'On Hold', icon: Pause, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    CANCELLED: { label: 'Cancelled', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  };

  const serviceTypeConfig: { [key: string]: { label: string; icon: any; color: string } } = {
    WEBSITE_DEVELOPMENT: { label: 'Website', icon: Globe, color: 'text-blue-400' },
    SOFTWARE_DEVELOPMENT: { label: 'Software', icon: Code, color: 'text-purple-400' },
    WORKFLOW_AUTOMATION: { label: 'Automation', icon: Zap, color: 'text-orange-400' },
  };

  // Calculate stats
  const pendingCount = statusCounts.find(s => s.status === 'PENDING')?._count || 0;
  const inProgressCount = statusCounts.find(s => s.status === 'IN_PROGRESS')?._count || 0;
  const completedCount = statusCounts.find(s => s.status === 'COMPLETED')?._count || 0;
  const onHoldCount = statusCounts.find(s => s.status === 'ON_HOLD')?._count || 0;
  const cancelledCount = statusCounts.find(s => s.status === 'CANCELLED')?._count || 0;

  const activeCount = pendingCount + inProgressCount;
  const totalRevenue = projects.reduce((sum, p) => sum + Number(p.contractValue), 0);
  const totalPaid = projects.reduce((sum, p) => sum + Number(p.paidAmount), 0);
  const outstandingBalance = totalRevenue - totalPaid;

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
            <h1 className="text-4xl font-bold">Project Management</h1>
            <p className="text-gray-400 mt-2">Monitor and manage all client projects</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link
            href="/admin/projects"
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <p className="text-sm text-gray-400">Total</p>
            </div>
            <p className="text-3xl font-bold">{totalCount}</p>
            <p className="text-xs text-purple-400 mt-1">{activeCount} active</p>
          </Link>

          <Link
            href="/admin/projects?status=PENDING"
            className={`backdrop-blur-sm border rounded-xl p-4 transition-colors ${
              searchParams.status === 'PENDING' ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-gray-400">Pending</p>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
          </Link>

          <Link
            href="/admin/projects?status=IN_PROGRESS"
            className={`backdrop-blur-sm border rounded-xl p-4 transition-colors ${
              searchParams.status === 'IN_PROGRESS' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-gray-400">Active</p>
            </div>
            <p className="text-3xl font-bold text-blue-400">{inProgressCount}</p>
          </Link>

          <Link
            href="/admin/projects?status=COMPLETED"
            className={`backdrop-blur-sm border rounded-xl p-4 transition-colors ${
              searchParams.status === 'COMPLETED' ? 'bg-green-500/20 border-green-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-sm text-gray-400">Done</p>
            </div>
            <p className="text-3xl font-bold text-green-400">{completedCount}</p>
          </Link>

          <Link
            href="/admin/projects?status=ON_HOLD"
            className={`backdrop-blur-sm border rounded-xl p-4 transition-colors ${
              searchParams.status === 'ON_HOLD' ? 'bg-orange-500/20 border-orange-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Pause className="w-5 h-5 text-orange-400" />
              <p className="text-sm text-gray-400">On Hold</p>
            </div>
            <p className="text-3xl font-bold text-orange-400">{onHoldCount}</p>
          </Link>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-green-400">{formatKES(totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Paid</p>
                <p className="text-2xl font-bold text-blue-400">{formatKES(totalPaid)}</p>
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${totalRevenue > 0 ? (totalPaid / totalRevenue) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Outstanding</p>
                <p className="text-2xl font-bold text-orange-400">{formatKES(outstandingBalance)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <form method="GET" className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchParams.search}
              placeholder="Search by project name, client, or company..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors text-lg"
            />
          </form>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No projects found</p>
              <p className="text-sm text-gray-500">
                {searchParams.status || searchParams.search
                  ? 'Try adjusting your filters'
                  : 'Projects will appear here when quotes are converted'}
              </p>
            </div>
          ) : (
            projects.map((project) => {
              const statusInfo = statusConfig[project.status];
              const serviceInfo = serviceTypeConfig[project.quote.serviceType];
              const StatusIcon = statusInfo.icon;
              const ServiceIcon = serviceInfo.icon;
              
              const paymentProgress = Number(project.contractValue) > 0
                ? (Number(project.paidAmount) / Number(project.contractValue)) * 100
                : 0;

              return (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${serviceInfo.color.replace('text-', 'bg-')}/20`}>
                        <ServiceIcon className={`w-6 h-6 ${serviceInfo.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold truncate mb-1">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <User className="w-4 h-4" />
                          <span className="truncate">{project.user.name}</span>
                          {project.user.company && (
                            <>
                              <span>•</span>
                              <span className="truncate">{project.user.company}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusInfo.bg} flex-shrink-0`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                      <span className={`text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Service</p>
                      <div className={`flex items-center gap-1.5 ${serviceInfo.color}`}>
                        <ServiceIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{serviceInfo.label}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Contract Value</p>
                      <p className="text-sm font-bold">{formatKES(Number(project.contractValue))}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Paid</p>
                      <p className="text-sm font-bold text-green-400">{formatKES(Number(project.paidAmount))}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Start Date</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Activity</p>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                          <span>{project._count.invoices}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                          <span>{project._count.supportTickets}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Payment Progress</span>
                      <span className="font-medium">{paymentProgress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${paymentProgress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Results Count */}
        {projects.length > 0 && (
          <div className="text-center text-sm text-gray-400">
            Showing {projects.length} of {totalCount} projects
          </div>
        )}
      </div>
    </div>
  );
}
