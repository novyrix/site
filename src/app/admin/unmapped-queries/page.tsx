import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UnmappedQueriesTable } from "@/components/admin/unmapped-queries-table";

export const metadata: Metadata = {
  title: "Unmapped Queries | Novy AI Training",
  description: "Review and improve Novy AI's feature matching capabilities",
};

export default async function UnmappedQueriesPage() {
  // Temporarily disabled auth for development
  // TODO: Re-enable auth check in production
  // const session = await auth();
  // if (!session || session.user.role !== "ADMIN") {
  //   redirect("/login");
  // }

  // Fetch unmapped queries that need review
  const queries = await prisma.unmappedQuery.findMany({
    where: {
      needsReview: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100, // Show last 100 unmapped queries
  });

  const stats = {
    total: await prisma.unmappedQuery.count(),
    needsReview: await prisma.unmappedQuery.count({
      where: { needsReview: true },
    }),
    reviewed: await prisma.unmappedQuery.count({
      where: { needsReview: false },
    }),
  };

  return (
    <main className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Novy AI <span className="gradient-text">Training Dashboard</span>
            </h1>
            <p className="text-xl text-gray-400">
              Review queries where Novy couldn't find good feature matches. Use this to improve the pricing matrix.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6">
              <div className="text-gray-400 text-sm mb-2">Total Queries</div>
              <div className="text-4xl font-bold">{stats.total}</div>
            </div>
            <div className="glass-card p-6 border-primary-500/30">
              <div className="text-gray-400 text-sm mb-2">Needs Review</div>
              <div className="text-4xl font-bold text-primary-500">{stats.needsReview}</div>
            </div>
            <div className="glass-card p-6 border-green-500/30">
              <div className="text-gray-400 text-sm mb-2">Reviewed</div>
              <div className="text-4xl font-bold text-green-500">{stats.reviewed}</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-card p-6 mb-8 border-yellow-500/30">
            <h2 className="text-xl font-bold mb-3 text-yellow-500">How to Use This Dashboard</h2>
            <ol className="space-y-2 text-gray-300">
              <li><strong>1. Review Query:</strong> Read what the user was looking for</li>
              <li><strong>2. Check Features Found:</strong> See how many matches Novy found (0-2 = poor, 3+ = good)</li>
              <li><strong>3. Take Action:</strong></li>
              <ul className="ml-6 mt-2 space-y-1 text-gray-400">
                <li>• If feature exists: Add missing keywords to existing feature in pricing matrix</li>
                <li>• If feature missing: Create new feature in <code className="bg-white/5 px-2 py-0.5 rounded">websiteMatrix.json</code> or <code className="bg-white/5 px-2 py-0.5 rounded">automationMatrix.json</code></li>
                <li>• If query is irrelevant: Mark as reviewed and dismiss</li>
              </ul>
              <li><strong>4. Mark as Reviewed:</strong> Add your notes and mark the query as handled</li>
            </ol>
          </div>

          {/* Queries Table */}
          <UnmappedQueriesTable queries={queries} />
        </div>
      </div>
    </main>
  );
}
