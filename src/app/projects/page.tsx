import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ProjectsList } from "@/components/projects-list";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user's projects
  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      quote: {
        select: {
          serviceType: true,
        },
      },
      invoices: {
        select: {
          id: true,
          amount: true,
          isPaid: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate stats
  const activeProjects = projects.filter(
    (p) => p.status === "IN_PROGRESS" || p.status === "PENDING"
  ).length;
  const completedProjects = projects.filter((p) => p.status === "COMPLETED").length;
  const totalRevenue = projects.reduce(
    (sum, p) => sum + parseFloat(p.contractValue.toString()),
    0
  );

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
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 gradient-text">
                  My Projects
                </h1>
                <p className="text-gray-400">Track your active and completed projects</p>
              </div>
              <Button asChild>
                <Link href="/calculators">
                  <Plus className="w-4 h-4 mr-2" />
                  New Quote
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Total Projects</div>
              <div className="text-3xl font-display font-bold">{projects.length}</div>
            </Card>
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Active</div>
              <div className="text-3xl font-display font-bold text-blue-500">
                {activeProjects}
              </div>
            </Card>
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Completed</div>
              <div className="text-3xl font-display font-bold text-green-500">
                {completedProjects}
              </div>
            </Card>
            <Card variant="default" className="p-6">
              <div className="text-sm text-gray-400 mb-1">Total Value</div>
              <div className="text-2xl font-display font-bold text-primary-500">
                KES {totalRevenue.toLocaleString()}
              </div>
            </Card>
          </div>

          {/* Projects List */}
          <Card variant="default" className="p-8">
            <CardHeader className="mb-6">
              <CardTitle>All Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectsList projects={projects} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
