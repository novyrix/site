"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Folder,
  Globe,
  Code,
  Zap,
  Calendar,
  DollarSign,
  Eye,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: string;
  contractValue: any;
  paidAmount: any;
  startDate: Date | null;
  estimatedEndDate: Date | null;
  createdAt: Date;
  quote: {
    serviceType: string;
  };
  invoices: {
    id: string;
    amount: any;
    isPaid: boolean;
  }[];
}

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [filter, setFilter] = useState<string>("ALL");

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
        return <Folder className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-5 h-5" />;
      case "IN_PROGRESS":
        return <AlertCircle className="w-5 h-5" />;
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5" />;
      case "ON_HOLD":
        return <Pause className="w-5 h-5" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Folder className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-400 bg-yellow-400/10";
      case "IN_PROGRESS":
        return "text-blue-400 bg-blue-400/10";
      case "COMPLETED":
        return "text-green-400 bg-green-400/10";
      case "ON_HOLD":
        return "text-orange-400 bg-orange-400/10";
      case "CANCELLED":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const calculateProgress = (project: Project) => {
    const paid = parseFloat(project.paidAmount.toString());
    const total = parseFloat(project.contractValue.toString());
    return ((paid / total) * 100).toFixed(0);
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (filter === "ALL") return true;
    return project.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"].map(
          (status) => (
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
          )
        )}
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">No projects found</h3>
          <p className="text-gray-400 mb-6">
            {filter === "ALL"
              ? "You don't have any projects yet. Get a quote to start!"
              : `No projects with status: ${filter}`}
          </p>
          <Button asChild>
            <Link href="/calculators">Get a Quote</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              variant="interactive"
              className="p-6 hover:border-primary-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                    {getServiceIcon(project.quote.serviceType)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display font-bold text-lg">{project.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {project.startDate
                            ? new Date(project.startDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Not started"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-mono">
                          {formatKES(project.contractValue)}
                        </span>
                      </div>
                      {project.invoices.length > 0 && (
                        <div className="text-xs">
                          {project.invoices.filter((inv) => inv.isPaid).length}/
                          {project.invoices.length} invoices paid
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {project.status === "IN_PROGRESS" && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Payment Progress</span>
                          <span className="font-medium">{calculateProgress(project)}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all"
                            style={{ width: `${calculateProgress(project)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/projects/${project.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
