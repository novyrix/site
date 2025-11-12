import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  FileText,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Globe,
  Code,
  Zap,
  User,
  Mail,
  Calendar,
} from 'lucide-react';

interface AdminQuotesPageProps {
  searchParams: {
    status?: string;
    serviceType?: string;
    search?: string;
  };
}

export default async function AdminQuotesPage({ searchParams }: AdminQuotesPageProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Build filters
  const where: any = {};

  if (searchParams.status) {
    where.status = searchParams.status;
  }

  if (searchParams.serviceType) {
    where.serviceType = searchParams.serviceType;
  }

  if (searchParams.search) {
    where.OR = [
      { user: { name: { contains: searchParams.search } } },
      { user: { email: { contains: searchParams.search } } },
      { user: { company: { contains: searchParams.search } } },
    ];
  }

  // Fetch quotes with user info
  const [quotes, totalCount, statusCounts] = await Promise.all([
    prisma.quote.findMany({
      where,
      include: {
        user: true,
        project: true,
      },
      orderBy: { createdAt: 'desc' },
    }),

    prisma.quote.count({ where }),

    prisma.quote.groupBy({
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const statusConfig: { [key: string]: { label: string; icon: any; color: string; bg: string } } = {
    DRAFT: { label: 'Draft', icon: Clock, color: 'text-gray-400', bg: 'bg-gray-500/10' },
    SUBMITTED: { label: 'Submitted', icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    IN_REVIEW: { label: 'In Review', icon: Eye, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    ACCEPTED: { label: 'Accepted', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
    REJECTED: { label: 'Rejected', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  };

  const serviceTypeConfig: { [key: string]: { label: string; icon: any; color: string } } = {
    WEBSITE_DEVELOPMENT: { label: 'Website', icon: Globe, color: 'text-blue-400' },
    SOFTWARE_DEVELOPMENT: { label: 'Software', icon: Code, color: 'text-purple-400' },
    WORKFLOW_AUTOMATION: { label: 'Automation', icon: Zap, color: 'text-orange-400' },
  };

  // Calculate stats
  const draftCount = statusCounts.find(s => s.status === 'DRAFT')?._count || 0;
  const submittedCount = statusCounts.find(s => s.status === 'SUBMITTED')?._count || 0;
  const inReviewCount = statusCounts.find(s => s.status === 'IN_REVIEW')?._count || 0;
  const acceptedCount = statusCounts.find(s => s.status === 'ACCEPTED')?._count || 0;
  const rejectedCount = statusCounts.find(s => s.status === 'REJECTED')?._count || 0;

  const totalValue = quotes.reduce((sum, q) => sum + Number(q.oneTimeTotal), 0);

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
            <h1 className="text-4xl font-bold">Quote Management</h1>
            <p className="text-gray-400 mt-2">Review and manage all client quotes</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link
            href="/admin/quotes"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <p className="text-sm text-gray-400 mb-1">All Quotes</p>
            <p className="text-2xl font-bold">{totalCount}</p>
            <p className="text-xs text-purple-400 mt-1">{formatKES(totalValue)} total</p>
          </Link>

          <Link
            href="/admin/quotes?status=DRAFT"
            className={`backdrop-blur-sm border rounded-xl p-4 hover:bg-white/10 transition-colors ${
              searchParams.status === 'DRAFT' ? 'bg-gray-500/20 border-gray-500/50' : 'bg-white/5 border-white/10'
            }`}
          >
            <p className="text-sm text-gray-400 mb-1">Draft</p>
            <p className="text-2xl font-bold">{draftCount}</p>
          </Link>

          <Link
            href="/admin/quotes?status=SUBMITTED"
            className={`backdrop-blur-sm border rounded-xl p-4 hover:bg-white/10 transition-colors ${
              searchParams.status === 'SUBMITTED' ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-white/5 border-white/10'
            }`}
          >
            <p className="text-sm text-gray-400 mb-1">Submitted</p>
            <p className="text-2xl font-bold text-yellow-400">{submittedCount}</p>
            <p className="text-xs text-yellow-400 mt-1">Needs review</p>
          </Link>

          <Link
            href="/admin/quotes?status=ACCEPTED"
            className={`backdrop-blur-sm border rounded-xl p-4 hover:bg-white/10 transition-colors ${
              searchParams.status === 'ACCEPTED' ? 'bg-green-500/20 border-green-500/50' : 'bg-white/5 border-white/10'
            }`}
          >
            <p className="text-sm text-gray-400 mb-1">Accepted</p>
            <p className="text-2xl font-bold text-green-400">{acceptedCount}</p>
          </Link>

          <Link
            href="/admin/quotes?status=REJECTED"
            className={`backdrop-blur-sm border rounded-xl p-4 hover:bg-white/10 transition-colors ${
              searchParams.status === 'REJECTED' ? 'bg-red-500/20 border-red-500/50' : 'bg-white/5 border-white/10'
            }`}
          >
            <p className="text-sm text-gray-400 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-400">{rejectedCount}</p>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[250px]">
              <form method="GET" className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchParams.search}
                  placeholder="Search by client name, email, or company..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors"
                />
              </form>
            </div>

            {/* Service Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Link
                href="/admin/quotes"
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  !searchParams.serviceType ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                All Types
              </Link>
              <Link
                href="/admin/quotes?serviceType=WEBSITE_DEVELOPMENT"
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  searchParams.serviceType === 'WEBSITE_DEVELOPMENT' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Website
              </Link>
              <Link
                href="/admin/quotes?serviceType=SOFTWARE_DEVELOPMENT"
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  searchParams.serviceType === 'SOFTWARE_DEVELOPMENT' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Software
              </Link>
              <Link
                href="/admin/quotes?serviceType=WORKFLOW_AUTOMATION"
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  searchParams.serviceType === 'WORKFLOW_AUTOMATION' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Automation
              </Link>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No quotes found</p>
              <p className="text-sm text-gray-500">
                {searchParams.status || searchParams.serviceType || searchParams.search
                  ? 'Try adjusting your filters'
                  : 'Quotes will appear here when clients request them'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Project</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {quotes.map((quote) => {
                    const statusInfo = statusConfig[quote.status];
                    const serviceInfo = serviceTypeConfig[quote.serviceType];
                    const StatusIcon = statusInfo.icon;
                    const ServiceIcon = serviceInfo.icon;

                    return (
                      <tr key={quote.id} className="hover:bg-white/5 transition-colors">
                        {/* Client */}
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{quote.user.name}</p>
                              <p className="text-sm text-gray-400 truncate flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {quote.user.email}
                              </p>
                              {quote.user.company && (
                                <p className="text-xs text-gray-500 truncate">{quote.user.company}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Service */}
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${serviceInfo.color}`}>
                            <ServiceIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{serviceInfo.label}</span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4">
                          <p className="font-bold">{formatKES(Number(quote.oneTimeTotal))}</p>
                          {quote.monthlyTotal && Number(quote.monthlyTotal) > 0 && (
                            <p className="text-xs text-gray-400">
                              +{formatKES(Number(quote.monthlyTotal))}/mo
                            </p>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(quote.createdAt)}
                          </div>
                        </td>

                        {/* Project */}
                        <td className="px-6 py-4">
                          {quote.project ? (
                            <Link
                              href={`/admin/projects/${quote.project.id}`}
                              className="text-sm text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Converted
                            </Link>
                          ) : (
                            <span className="text-sm text-gray-500">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/quotes/${quote.id}`}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            {quote.status === 'SUBMITTED' && (
                              <>
                                <button
                                  className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                                  title="Accept Quote"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                  title="Reject Quote"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Count */}
        {quotes.length > 0 && (
          <div className="text-center text-sm text-gray-400">
            Showing {quotes.length} of {totalCount} quotes
          </div>
        )}
      </div>
    </div>
  );
}
