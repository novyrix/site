"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, BookOpen, Users, Award, Globe, Layers, FileText, Code2, Database } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function SpatialCollectiveLearnPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
              <Globe className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400 font-medium">Web Application</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Spatial Collective{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Learn Platform
              </span>
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed mb-8">
              Official DPW learning platform and employee manual system for Spatial Collective Ltd.
              A comprehensive documentation and directory platform built with Next.js, featuring structured learning paths and team resources.
            </p>

            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient duration={4}>
                <Link
                  href="https://learn.spatialcollective.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </Link>
              </HoverBorderGradient>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Production v1.0
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-12 border-y border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">Next.js 14</div>
              <div className="text-sm text-neutral-400">Framework</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">Vercel</div>
              <div className="text-sm text-neutral-400">Hosting Platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">TypeScript</div>
              <div className="text-sm text-neutral-400">Type Safety</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">Live</div>
              <div className="text-sm text-neutral-400">Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Platform <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Comprehensive learning and documentation system for team knowledge management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Employee Manual",
                description: "Centralized documentation hub for company policies, procedures, and best practices"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Team Directory",
                description: "Organized directory system for team members, roles, and contact information"
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Learning Paths",
                description: "Structured learning modules for DPW projects and technical skill development"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Documentation System",
                description: "Rich text documentation with markdown support and code snippets"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Resource Library",
                description: "Curated collection of training materials, guides, and reference documentation"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Responsive Design",
                description: "Mobile-optimized interface for access on any device, anywhere"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <div className="text-primary-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-32 bg-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Technical <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Stack</span>
            </h2>

            <div className="space-y-8">
              {[
                {
                  category: "Frontend",
                  items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"]
                },
                {
                  category: "Deployment",
                  items: ["Vercel Platform", "Edge Runtime", "Automatic CI/CD", "Custom Domain"]
                },
                {
                  category: "Development Tools",
                  items: ["ESLint", "PostCSS", "Next Font Optimization", "Geist Font Family"]
                },
                {
                  category: "Features",
                  items: ["Server Components", "App Router", "Image Optimization", "Responsive Design"]
                }
              ].map((section, idx) => (
                <div key={idx} className="rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-primary-400">{section.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {section.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-4 py-2 rounded-lg bg-primary-500/10 text-primary-300 border border-primary-500/20 text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Development Approach */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Development <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Approach</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  phase: "Planning",
                  description: "Analyzed Spatial Collective's documentation needs and team structure to design an intuitive learning platform architecture"
                },
                {
                  phase: "Development",
                  description: "Built with Next.js 14 App Router for optimal performance, leveraging TypeScript for type safety and Tailwind CSS for rapid UI development"
                },
                {
                  phase: "Content Structure",
                  description: "Implemented modular content system allowing easy updates and scalability for future learning modules and documentation"
                },
                {
                  phase: "Deployment",
                  description: "Deployed to Vercel with custom domain integration, automatic CI/CD, and edge optimization for global accessibility"
                },
                {
                  phase: "Iteration",
                  description: "Version 1.0 in production with ongoing enhancements based on team feedback and evolving documentation requirements"
                }
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center">
                        <span className="text-primary-400 font-bold">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-xl font-bold">{phase.phase}</h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 bg-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Empowering Team{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Knowledge</span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-12">
              The Spatial Collective Learn Platform serves as the central knowledge hub for the Digital Public Works team,
              providing structured learning paths, comprehensive documentation, and team resources all in one accessible platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Version 1.0</div>
                <div className="text-sm text-neutral-400">Production Release</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">100%</div>
                <div className="text-sm text-neutral-400">Uptime</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Global</div>
                <div className="text-sm text-neutral-400">Edge Deployment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need a Documentation Platform?
            </h2>
            <p className="text-xl text-neutral-300 mb-12">
              We build custom learning and documentation systems tailored to your team's needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <HoverBorderGradient duration={5}>
                <Link href="/#contact">Get in Touch</Link>
              </HoverBorderGradient>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
