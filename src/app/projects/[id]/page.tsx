import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  Globe,
  Code,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
  Pause,
  XCircle,
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  Download,
  Plus,
  MessageSquare,
  Shield
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

const statusConfig = {
  PENDING: { label: 'Pending Start', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  IN_PROGRESS: { label: 'In Progress', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  COMPLETED: { label: 'Completed', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  ON_HOLD: { label: 'On Hold', icon: Pause, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  CANCELLED: { label: 'Cancelled', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
};

const serviceTypeConfig = {
  WEBSITE_DEVELOPMENT: { icon: Globe, label: 'Website Development' },
  SOFTWARE_DEVELOPMENT: { icon: Code, label: 'Custom Software' },
  WORKFLOW_AUTOMATION: { icon: Zap, label: 'Workflow Automation' },
};

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
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      quote: true,
      invoices: {
        orderBy: { dueDate: 'asc' },
      },
      supportTickets: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!project || (project.userId !== session.user.id && session.user.role !== 'ADMIN')) {
    notFound();
  }

  // Calculate progress
  const totalPaid = project.invoices.reduce((sum, inv) => sum + (inv.isPaid ? Number(inv.amount) : 0), 0);
  const totalAmount = Number(project.quote?.oneTimeTotal || 0);
  const progressPercentage = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0;

  // Invoice stats
  const paidInvoices = project.invoices.filter(inv => inv.isPaid).length;
  const pendingInvoices = project.invoices.filter(inv => !inv.isPaid).length;
  const overdueInvoices = project.invoices.filter(inv =>
    !inv.isPaid && new Date(inv.dueDate) < new Date()
  ).length;

  // Support ticket stats
  const openTickets = project.supportTickets.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length;

  const StatusIcon = statusConfig[project.status].icon;
  const ServiceIcon = serviceTypeConfig[project.quote?.serviceType || 'WEBSITE_DEVELOPMENT'].icon;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ServiceIcon className="w-8 h-8 text-purple-400" />
                <h1 className="text-3xl font-bold">{project.name}</h1>
              </div>
              {project.description && (
                <p className="text-gray-400 text-lg max-w-3xl">{project.description}</p>
              )}
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusConfig[project.status].bg}`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig[project.status].color}`} />
              <span className={`font-medium ${statusConfig[project.status].color}`}>
                {statusConfig[project.status].label}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Contract Value</span>
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold">{formatKES(totalAmount)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Paid</span>
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">{formatKES(totalPaid)}</p>
            <div className="mt-2 w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Invoices</span>
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold">{project.invoices.length}</p>
            <div className="flex gap-2 text-xs mt-2">
              <span className="text-green-400">{paidInvoices} paid</span>
              <span className="text-gray-500">•</span>
              <span className="text-yellow-400">{pendingInvoices} pending</span>
              {overdueInvoices > 0 && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-red-400">{overdueInvoices} overdue</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Support Tickets</span>
              <MessageSquare className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-2xl font-bold">{project.supportTickets.length}</p>
            {openTickets > 0 && (
              <p className="text-xs text-orange-400 mt-2">{openTickets} open tickets</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Project Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Service Type</p>
                  <div className="flex items-center gap-2">
                    <ServiceIcon className="w-4 h-4 text-purple-400" />
                    <span className="font-medium">{serviceTypeConfig[project.quote?.serviceType || 'WEBSITE_DEVELOPMENT'].label}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Start Date</p>
                  <p className="font-medium">{project.startDate ? formatDate(project.startDate) : 'Not started'}</p>
                </div>
                {project.actualEndDate && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">End Date</p>
                    <p className="font-medium">{formatDate(project.actualEndDate)}</p>
                  </div>
                )}
                {project.estimatedEndDate && !project.actualEndDate && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Estimated End Date</p>
                    <p className="font-medium">{formatDate(project.estimatedEndDate)}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-sm mb-1">Payment Progress</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Care Plan Badge */}
              {project.hasCarePlan && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-green-400">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Active Care Plan</span>
                  </div>
                  {project.carePlanExpiry && (
                    <p className="text-sm text-gray-400 mt-1">
                      Expires: {formatDate(project.carePlanExpiry)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Invoices */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Invoices</h2>
                {session.user.role === 'ADMIN' && (
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-sm transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Invoice
                  </button>
                )}
              </div>

              {project.invoices.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No invoices yet</p>
              ) : (
                <div className="space-y-3">
                  {project.invoices.map((invoice) => {
                    const isOverdue = !invoice.isPaid && new Date(invoice.dueDate) < new Date();
                    const invoiceStatus = invoice.isPaid ? 'PAID' : (isOverdue ? 'OVERDUE' : 'SENT');
                    const statusColors = {
                      DRAFT: 'text-gray-400 bg-gray-500/10',
                      SENT: 'text-blue-400 bg-blue-500/10',
                      PAID: 'text-green-400 bg-green-500/10',
                      OVERDUE: 'text-red-400 bg-red-500/10',
                      CANCELLED: 'text-gray-500 bg-gray-500/10',
                    };

                    return (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span className="font-medium">{invoice.invoiceNumber}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[invoiceStatus]}`}>
                              {invoiceStatus}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Due: {formatDate(invoice.dueDate)}</span>
                            <span>Amount: {formatKES(Number(invoice.amount))}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          {!invoice.isPaid && (
                            <button className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-sm transition-colors">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Support Tickets */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Support Tickets</h2>
                <Link
                  href={`/support?project=${project.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New Ticket
                </Link>
              </div>

              {project.supportTickets.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No support tickets</p>
              ) : (
                <div className="space-y-3">
                  {project.supportTickets.map((ticket) => {
                    const statusColors: Record<string, string> = {
                      OPEN: 'text-yellow-400 bg-yellow-500/10',
                      IN_PROGRESS: 'text-blue-400 bg-blue-500/10',
                      RESOLVED: 'text-green-400 bg-green-500/10',
                      CLOSED: 'text-gray-400 bg-gray-500/10',
                    };

                    const priorityColors: Record<string, string> = {
                      LOW: 'text-gray-400',
                      MEDIUM: 'text-yellow-400',
                      HIGH: 'text-orange-400',
                      URGENT: 'text-red-400',
                    };

                    return (
                      <div
                        key={ticket.id}
                        className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="w-4 h-4 text-purple-400" />
                              <Link
                                href={`/support/${ticket.id}`}
                                className="font-medium hover:text-purple-400 transition-colors"
                              >
                                {ticket.subject}
                              </Link>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{ticket.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[ticket.status]}`}>
                              {ticket.status}
                            </span>
                            <span className={`text-xs font-medium ${priorityColors[ticket.priority]}`}>
                              {ticket.priority}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Created {formatDate(ticket.createdAt)}
                        </p>
                      </div>
                    );
                  })}

                  {project.supportTickets.length === 5 && (
                    <Link
                      href={`/support?project=${project.id}`}
                      className="block text-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View all tickets →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Client Information</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-400 mb-0.5">Name</p>
                    <p className="font-medium truncate">{project.user.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-400 mb-0.5">Email</p>
                    <p className="font-medium truncate text-sm">{project.user.email}</p>
                  </div>
                </div>
                {project.user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 mb-0.5">Phone</p>
                      <p className="font-medium">{project.user.phone}</p>
                    </div>
                  </div>
                )}
                {project.user.company && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 mb-0.5">Company</p>
                      <p className="font-medium">{project.user.company}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Linked Quote */}
            {project.quote && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Linked Quote</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Quote Amount</p>
                    <p className="text-xl font-bold text-purple-400">{formatKES(Number(project.quote.oneTimeTotal || 0))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Created</p>
                    <p className="font-medium">{formatDate(project.quote.createdAt)}</p>
                  </div>
                  <Link
                    href={`/quotes/${project.quote.id}`}
                    className="block w-full text-center px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition-colors"
                  >
                    View Quote
                  </Link>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Contract</span>
                  <span className="font-medium">{formatKES(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="font-medium text-green-400">{formatKES(totalPaid)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="font-medium">Outstanding</span>
                  <span className="font-bold text-lg">{formatKES(totalAmount - totalPaid)}</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Payment Progress</span>
                    <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            {session.user.role === 'ADMIN' && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Admin Actions</h2>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-sm transition-colors">
                    Edit Project
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-sm transition-colors">
                    Change Status
                  </button>
                  <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-sm transition-colors">
                    Activate Care Plan
                  </button>
                  <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-sm transition-colors">
                    Cancel Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
