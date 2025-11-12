"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Globe, 
  Code, 
  Zap, 
  Calendar, 
  DollarSign,
  Eye,
  Trash2,
  Filter
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Quote {
  id: string;
  serviceType: string;
  status: string;
  oneTimeTotal: any;
  monthlyTotal: any;
  yearlyTotal: any;
  createdAt: Date;
  notes: string | null;
}

interface QuotesListProps {
  quotes: Quote[];
}

export function QuotesList({ quotes }: QuotesListProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("ALL");
  const [deleting, setDeleting] = useState<string | null>(null);

  const formatKES = (amount: any) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `KES ${num.toLocaleString()}`;
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "WEBSITE_DEVELOPMENT":
        return <Globe className="w-5 h-5" />;
      case "SOFTWARE_DEVELOPMENT":
        return <Code className="w-5 h-5" />;
      case "WORKFLOW_AUTOMATION":
        return <Zap className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
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
        return "text-gray-400 bg-gray-400/10";
      case "SUBMITTED":
        return "text-blue-400 bg-blue-400/10";
      case "IN_REVIEW":
        return "text-yellow-400 bg-yellow-400/10";
      case "ACCEPTED":
        return "text-green-400 bg-green-400/10";
      case "REJECTED":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const handleDelete = async (quoteId: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) {
      return;
    }

    setDeleting(quoteId);

    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete quote");
      }

      // Refresh the page to update the list
      router.refresh();
    } catch (error) {
      console.error("Error deleting quote:", error);
      alert("Failed to delete quote. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  // Filter quotes
  const filteredQuotes = quotes.filter((quote) => {
    if (filter === "ALL") return true;
    return quote.status === filter;
  });

  // Sort by date (newest first)
  const sortedQuotes = [...filteredQuotes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        {["ALL", "DRAFT", "SUBMITTED", "IN_REVIEW", "ACCEPTED", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-primary-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Quotes List */}
      {sortedQuotes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">No quotes found</h3>
          <p className="text-gray-400 mb-6">
            {filter === "ALL"
              ? "You haven't created any quotes yet"
              : `No quotes with status: ${filter}`}
          </p>
          <Button asChild>
            <Link href="/calculators">Create Your First Quote</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedQuotes.map((quote) => (
            <Card
              key={quote.id}
              variant="interactive"
              className="p-6 hover:border-primary-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                    {getServiceIcon(quote.serviceType)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-lg">
                        {getServiceLabel(quote.serviceType)}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          quote.status
                        )}`}
                      >
                        {quote.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(quote.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-mono">
                          {formatKES(quote.oneTimeTotal)}
                        </span>
                      </div>
                      {quote.monthlyTotal && parseFloat(quote.monthlyTotal.toString()) > 0 && (
                        <div className="text-xs">
                          + {formatKES(quote.monthlyTotal)}/month
                        </div>
                      )}
                    </div>

                    {quote.notes && (
                      <p className="text-sm text-gray-400 line-clamp-2">{quote.notes}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/quotes/${quote.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  {quote.status === "DRAFT" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(quote.id)}
                      disabled={deleting === quote.id}
                    >
                      {deleting === quote.id ? (
                        "Deleting..."
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
