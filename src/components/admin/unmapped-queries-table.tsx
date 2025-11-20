"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, ExternalLink, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type UnmappedQuery = {
  id: string;
  sessionId: string;
  userMessage: string;
  aiResponse: string | null;
  featuresFound: number;
  wasHelpful: boolean;
  needsReview: boolean;
  reviewNotes: string | null;
  createdAt: Date;
  reviewedAt: Date | null;
};

type Props = {
  queries: UnmappedQuery[];
};

export function UnmappedQueriesTable({ queries: initialQueries }: Props) {
  const [queries, setQueries] = useState(initialQueries);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const handleMarkReviewed = async (queryId: string) => {
    const notes = reviewNotes.trim();
    if (!notes) {
      alert("Please add review notes before marking as reviewed");
      return;
    }

    try {
      const response = await fetch("/api/admin/unmapped-queries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryId, reviewNotes: notes }),
      });

      if (response.ok) {
        // Remove from list
        setQueries(queries.filter((q) => q.id !== queryId));
        setReviewingId(null);
        setReviewNotes("");
      } else {
        alert("Failed to update query");
      }
    } catch (error) {
      console.error("Error marking query as reviewed:", error);
      alert("An error occurred");
    }
  };

  const exportToFeatureTemplate = (query: UnmappedQuery) => {
    const template = {
      featureId: "CATEGORY-XXX",
      name: "[Feature Name]",
      description: query.userMessage,
      complexity: 1,
      basePrice: 0,
      tags: extractKeywords(query.userMessage),
      keywords: extractKeywords(query.userMessage),
      requiresDiscovery: false,
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feature-template-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const extractKeywords = (text: string): string[] => {
    const stopWords = ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "as", "is", "was", "are", "were", "been", "be", "have", "has", "had", "do", "does", "did", "will", "would", "should", "could", "may", "might", "must", "can", "i", "we", "you", "he", "she", "it", "they", "them", "their", "my", "our", "your"];

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.includes(word))
      .slice(0, 10);
  };

  return (
    <div className="space-y-6">
      {queries.length === 0 ? (
        <Card className="glass-card p-12 text-center border-green-500/30">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">All Caught Up!</h3>
          <p className="text-gray-400">
            No queries need review at the moment. Novy is performing well!
          </p>
        </Card>
      ) : (
        queries.map((query) => (
          <Card
            key={query.id}
            className="glass-card p-6 border-primary-500/20 hover:border-primary-500/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-400">
                    {new Date(query.createdAt).toLocaleString()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      query.featuresFound === 0
                        ? "bg-red-500/20 text-red-500"
                        : query.featuresFound <= 2
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-blue-500/20 text-blue-500"
                    }`}
                  >
                    {query.featuresFound} features found
                  </span>
                </div>

                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <p className="text-gray-200 text-lg">{query.userMessage}</p>
                </div>

                {expandedId === query.id && query.aiResponse && (
                  <div className="bg-primary-500/10 p-4 rounded-lg mb-4 border border-primary-500/30">
                    <p className="text-sm text-gray-400 mb-2 font-semibold">
                      Novy's Response:
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {query.aiResponse}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setExpandedId(expandedId === query.id ? null : query.id)
                }
              >
                {expandedId === query.id ? "Hide" : "Show"} Response
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToFeatureTemplate(query)}
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Export Template
              </Button>

              {reviewingId === query.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add review notes (e.g., 'Added keywords to WEB-001')"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleMarkReviewed(query.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReviewingId(null);
                      setReviewNotes("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewingId(query.id)}
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Reviewed
                </Button>
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
