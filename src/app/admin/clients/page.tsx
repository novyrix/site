import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Users,
  ArrowLeft,
  Search,
  Mail,
  Phone,
  Building2,
  Calendar,
  FileText,
  Briefcase,
  Shield,
  User,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

interface AdminClientsPageProps {
  searchParams: {
    search?: string;
    role?: string;
  };
}

export default async function AdminClientsPage({ searchParams }: AdminClientsPageProps) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Build filters
  const where: any = {};
  
  if (searchParams.role) {
    where.role = searchParams.role;
  }
  
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search } },
      { email: { contains: searchParams.search } },
      { company: { contains: searchParams.search } },
    ];
  }

  // Fetch clients with their stats
  const [clients, totalCount, roleCounts] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        _count: {
          select: {
            quotes: true,
            projects: true,
          },
        },
        quotes: {
          select: {
            oneTimeTotal: true,
          },
        },
        projects: {
          select: {
            contractValue: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    
    prisma.user.count({ where }),
    
    prisma.user.groupBy({
      by: ['role'],
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
    }).format(new Date(date));
  };

  // Calculate stats
  const clientCount = roleCounts.find(r => r.role === 'CLIENT')?._count || 0;
  const adminCount = roleCounts.find(r => r.role === 'ADMIN')?._count || 0;
  
  // Calculate total client value
  const totalClientValue = clients.reduce((sum, client) => {
    const projectValue = client.projects.reduce((pSum, p) => pSum + Number(p.contractValue), 0);
    return sum + projectValue;
  }, 0);

  // Active clients (have projects)
  const activeClients = clients.filter(c => c._count.projects > 0).length;

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
            <h1 className="text-4xl font-bold">Client Management</h1>
            <p className="text-gray-400 mt-2">Manage all users and their accounts</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/admin/clients"
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Clients</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
            <p className="text-xs text-blue-400">{formatKES(totalClientValue)} total value</p>
          </Link>

          <Link
            href="/admin/clients?role=CLIENT"
            className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              searchParams.role === 'CLIENT' ? 'bg-purple-500/20 border-purple-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Clients</p>
                <p className="text-2xl font-bold">{clientCount}</p>
              </div>
            </div>
            <p className="text-xs text-purple-400">{activeClients} active</p>
          </Link>

          <Link
            href="/admin/clients?role=ADMIN"
            className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              searchParams.role === 'ADMIN' ? 'bg-orange-500/20 border-orange-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Admins</p>
                <p className="text-2xl font-bold text-orange-400">{adminCount}</p>
              </div>
            </div>
            <p className="text-xs text-orange-400">Full access</p>
          </Link>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Projects</p>
                <p className="text-2xl font-bold text-green-400">
                  {clients.reduce((sum, c) => sum + c._count.projects, 0)}
                </p>
              </div>
            </div>
            <p className="text-xs text-green-400">Across all clients</p>
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
              placeholder="Search by name, email, or company..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors text-lg"
            />
          </form>
        </div>

        {/* Clients List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.length === 0 ? (
            <div className="col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No clients found</p>
              <p className="text-sm text-gray-500">
                {searchParams.search || searchParams.role
                  ? 'Try adjusting your filters'
                  : 'Clients will appear here when they register'}
              </p>
            </div>
          ) : (
            clients.map((client) => {
              const totalProjectValue = client.projects.reduce((sum, p) => sum + Number(p.contractValue), 0);
              const totalQuoteValue = client.quotes.reduce((sum, q) => sum + Number(q.oneTimeTotal), 0);

              return (
                <div
                  key={client.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                        {client.role === 'ADMIN' ? (
                          <Shield className="w-7 h-7 text-orange-400" />
                        ) : (
                          <User className="w-7 h-7 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold truncate">{client.name || 'Unnamed User'}</h3>
                          {client.role === 'ADMIN' && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate">{client.email}</span>
                        </div>
                        {client.company && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-400">
                            <Building2 className="w-3.5 h-3.5" />
                            <span className="truncate">{client.company}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Quotes</p>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="font-bold">{client._count.quotes}</span>
                      </div>
                      {totalQuoteValue > 0 && (
                        <p className="text-xs text-gray-500 mt-0.5">{formatKES(totalQuoteValue)}</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Projects</p>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-purple-400" />
                        <span className="font-bold">{client._count.projects}</span>
                      </div>
                      {totalProjectValue > 0 && (
                        <p className="text-xs text-gray-500 mt-0.5">{formatKES(totalProjectValue)}</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Joined</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">{formatDate(client.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  {client.phone && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{client.phone}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    
                    {client.role !== 'ADMIN' && (
                      <>
                        <button
                          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-sm transition-colors"
                          title="Edit Client"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-sm transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Results Count */}
        {clients.length > 0 && (
          <div className="text-center text-sm text-gray-400">
            Showing {clients.length} of {totalCount} clients
          </div>
        )}
      </div>
    </div>
  );
}
