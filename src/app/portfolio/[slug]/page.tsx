import React from "react";
import { projects } from "@/lib/portfolio-data";
import { notFound } from "next/navigation";
import { DeviceMockup } from "@/components/ui/device-mockup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TracingBeam } from "@/components/ui/tracing-beam";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden pt-20 pb-20">
      <TracingBeam className="px-6">
        <div className="max-w-5xl mx-auto antialiased pt-4 relative">
          <Link href="/portfolio" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="default" className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border-neutral-700">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Button asChild className="bg-white text-black hover:bg-neutral-200">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit Live Site
                </a>
              </Button>
              {project.githubUrl && (
                <Button asChild variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Device Previews */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-end">
            <div className="lg:col-span-2">
               <h3 className="text-2xl font-bold text-white mb-4">Desktop View</h3>
               <DeviceMockup src={project.liveUrl} type="desktop" />
            </div>
            <div className="hidden lg:block">
               <h3 className="text-2xl font-bold text-white mb-4 text-center">Mobile View</h3>
               <DeviceMockup src={project.liveUrl} type="mobile" />
            </div>
          </div>

          {/* Mobile view for small screens only */}
          <div className="lg:hidden mb-20">
             <h3 className="text-2xl font-bold text-white mb-4 text-center">Mobile View</h3>
             <DeviceMockup src={project.liveUrl} type="mobile" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
              <p className="text-neutral-300 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {project.stats && (
              <div className="grid grid-cols-2 gap-4">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, idx) => (
                <div key={idx} className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-xl hover:bg-neutral-900/50 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {project.codeSnippet && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">Under the Hood</h2>
              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-neutral-800">
                <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-neutral-800">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-neutral-400 font-mono">{project.codeSnippet.filename}</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm text-neutral-300">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

        </div>
      </TracingBeam>
    </div>
  );
}
