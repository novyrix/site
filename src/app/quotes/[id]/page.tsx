import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function QuoteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the quote
  const quote = await prisma.quote.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          company: true,
          phone: true,
        },
      },
      project: true,
    },
  });

  if (!quote) {
    notFound();
  }

  // Check if user owns this quote
  if (quote.userId !== user.id && user.role !== "ADMIN") {
    redirect("/quotes");
  }

  const formatKES = (amount: any) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `KES ${num.toLocaleString()}`;
  };

  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case "WEBSITE_DEVELOPMENT":
        return "Website Development";
      case "SOFTWARE_DEVELOPMENT":
        return "Software Development";
      case "WORKFLOW_AUTOMATION":
        return "Workflow Automation";
      default:
        return serviceType;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
      case "SUBMITTED":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "IN_REVIEW":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "ACCEPTED":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "REJECTED":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/quotes"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quotes
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 gradient-text">
                  Quote Details
                </h1>
                <p className="text-gray-400">{getServiceLabel(quote.serviceType)}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
                  quote.status
                )}`}
              >
                {quote.status.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Quote Information */}
          <Card variant="default" className="p-8 mb-8">
            <CardHeader>
              <CardTitle>Quote Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">One-time Cost</span>
                  <span className="text-2xl font-display font-bold text-primary-500">
                    {formatKES(quote.oneTimeTotal)}
                  </span>
                </div>

                {quote.monthlyTotal && parseFloat(quote.monthlyTotal.toString()) > 0 && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Monthly Recurring</span>
                    <span className="text-xl font-display font-bold">
                      {formatKES(quote.monthlyTotal)}/month
                    </span>
                  </div>
                )}

                {quote.yearlyTotal && parseFloat(quote.yearlyTotal.toString()) > 0 && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Yearly Cost</span>
                    <span className="text-xl font-display font-bold">
                      {formatKES(quote.yearlyTotal)}/year
                    </span>
                  </div>
                )}
              </div>

              {/* Website Development Details */}
              {quote.serviceType === "WEBSITE_DEVELOPMENT" && (
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-display font-bold mb-4">Selected Features</h3>
                  <div className="space-y-3">
                    {quote.basePrice && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Base Website</div>
                          <div className="text-sm text-gray-400">
                            {formatKES(quote.basePrice)}
                          </div>
                        </div>
                      </div>
                    )}
                    {quote.hasBlog && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">Blog / CMS</div>
                      </div>
                    )}
                    {quote.hasGallery && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">Gallery / Portfolio</div>
                      </div>
                    )}
                    {quote.hasBooking && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">Booking System</div>
                      </div>
                    )}
                    {quote.hasEcommerce && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">E-commerce</div>
                      </div>
                    )}
                    {quote.hasApi && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">API Integration</div>
                      </div>
                    )}
                    {quote.hostingType && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">
                          {quote.hostingType === "basic"
                            ? "Basic Hosting"
                            : quote.hostingType === "advanced"
                            ? "Advanced Hosting"
                            : "Own Hosting"}
                        </div>
                      </div>
                    )}
                    {(quote.carePlan || quote.ecommercePlan) && (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">
                          {quote.ecommercePlan ? "E-commerce Care Plan" : "Care Plan"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Software Development Details */}
              {quote.serviceType === "SOFTWARE_DEVELOPMENT" && (
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-display font-bold mb-4">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quote.projectType && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Project Type</div>
                        <div className="font-medium capitalize">
                          {quote.projectType.replace("_", " ")}
                        </div>
                      </div>
                    )}
                    {quote.projectStage && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Project Stage</div>
                        <div className="font-medium capitalize">{quote.projectStage}</div>
                      </div>
                    )}
                    {quote.complexity && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Complexity</div>
                        <div className="font-medium capitalize">{quote.complexity}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Automation Details */}
              {quote.serviceType === "WORKFLOW_AUTOMATION" && (
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-display font-bold mb-4">Automation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quote.businessArea && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Business Area</div>
                        <div className="font-medium capitalize">
                          {quote.businessArea.replace("_", " ")}
                        </div>
                      </div>
                    )}
                    {quote.hoursPerWeek && (
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Time Investment</div>
                        <div className="font-medium">{quote.hoursPerWeek} hours/week</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {quote.notes && (
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-display font-bold mb-3">Additional Notes</h3>
                  <p className="text-gray-300 leading-relaxed">{quote.notes}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="pt-6 border-t border-white/10 space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Quote ID</span>
                  <span className="font-mono">{quote.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Created</span>
                  <span>
                    {new Date(quote.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated</span>
                  <span>
                    {new Date(quote.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {quote.status === "DRAFT" && (
              <Button size="lg" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Submit Quote
              </Button>
            )}
            <Button size="lg" variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            {quote.status === "ACCEPTED" && !quote.project && (
              <Button size="lg" variant="secondary" className="flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Convert to Project
              </Button>
            )}
          </div>

          {/* Linked Project */}
          {quote.project && (
            <Card variant="highlighted" className="p-6 mt-8">
              <h3 className="font-display font-bold mb-2">📋 Linked Project</h3>
              <p className="text-gray-400 mb-4">
                This quote has been converted to an active project
              </p>
              <Button asChild>
                <Link href={`/projects/${quote.project.id}`}>View Project</Link>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
