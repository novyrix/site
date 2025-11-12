import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QuotesList } from "@/components/quotes-list";
import { prisma } from "@/lib/prisma";

export default async function QuotesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's quotes
  const quotes = await prisma.quote.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 gradient-text">
              My Quotes
            </h1>
            <p className="text-gray-400">View and manage your quote requests</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Total Quotes</div>
              <div className="text-3xl font-display font-bold">{quotes.length}</div>
            </Card>
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Draft</div>
              <div className="text-3xl font-display font-bold text-gray-500">
                {quotes.filter((q) => q.status === "DRAFT").length}
              </div>
            </Card>
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Submitted</div>
              <div className="text-3xl font-display font-bold text-blue-500">
                {quotes.filter((q) => q.status === "SUBMITTED").length}
              </div>
            </Card>
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Accepted</div>
              <div className="text-3xl font-display font-bold text-green-500">
                {quotes.filter((q) => q.status === "ACCEPTED").length}
              </div>
            </Card>
          </div>

          {/* Quotes List */}
          <Card variant="default" className="p-8">
            <CardHeader className="mb-6">
              <CardTitle>All Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <QuotesList quotes={quotes} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
