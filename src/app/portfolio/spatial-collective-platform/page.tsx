"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, BarChart3, Map, Database, Upload, Workflow, Shield, Code2, Globe, Zap, Users } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function SpatialCollectivePlatformPage() {
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
              <Workflow className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400 font-medium">API Integration & Automation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Spatial Collective{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed mb-8">
              Internal project management platform integrating ODK Collect, Google Drive sync, OSM APIs, and advanced data visualization.
              Centralizes monitoring across multiple regions with OAuth 2.0 authentication and real-time data processing.
            </p>

            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient duration={4}>
                <Link
                  href="https://app.spatialcollective.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Platform
                </Link>
              </HoverBorderGradient>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <Shield className="w-4 h-4 text-primary-400" />
                <span className="text-sm">Internal Access Only</span>
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
              <div className="text-4xl font-bold text-primary-400 mb-2">10+</div>
              <div className="text-sm text-neutral-400">API Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">Real-time</div>
              <div className="text-sm text-neutral-400">Data Sync</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">Multi-Region</div>
              <div className="text-sm text-neutral-400">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">OAuth 2.0</div>
              <div className="text-sm text-neutral-400">Security</div>
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
              Platform <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Enterprise-grade project management with seamless third-party integrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Database className="w-8 h-8" />,
                title: "ODK Collect Integration",
                description: "Direct integration with ODK Collect for field data collection and automated data pipeline processing"
              },
              {
                icon: <Upload className="w-8 h-8" />,
                title: "Google Drive Sync",
                description: "Automated synchronization with Google Drive for file management and cloud backup"
              },
              {
                icon: <Map className="w-8 h-8" />,
                title: "OSM API Integration",
                description: "OpenStreetMap API integration for geospatial data validation and mapping workflows"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Advanced Data Visualization",
                description: "Interactive dashboards with real-time analytics and project performance metrics"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "OAuth 2.0 Authentication",
                description: "Secure authentication system integrated with JOSM Plugin and other internal tools"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Multi-Region Management",
                description: "Centralized monitoring and control for projects across different geographical regions"
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
              Technical <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Architecture</span>
            </h2>

            <div className="space-y-8">
              {[
                {
                  category: "Backend & APIs",
                  items: ["Node.js", "Express", "RESTful APIs", "WebSocket", "OAuth 2.0"]
                },
                {
                  category: "External Integrations",
                  items: ["ODK Collect API", "Google Drive API", "OpenStreetMap API", "JOSM Plugin Auth", "Cloud Storage"]
                },
                {
                  category: "Frontend",
                  items: ["Next.js", "React", "TypeScript", "Real-time Updates", "Data Visualization"]
                },
                {
                  category: "Data & Infrastructure",
                  items: ["PostgreSQL", "Redis Cache", "Automated Backups", "Multi-region Support", "Secure Hosting"]
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

      {/* Integration Highlights */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Key <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Integrations</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "DPW JOSM Plugin Authentication",
                  description: "Direct OAuth 2.0 authentication endpoint for JOSM Plugin, enabling seamless validation workflows and automated data submission"
                },
                {
                  title: "ODK Collect Data Pipeline",
                  description: "Automated data collection from field devices, real-time synchronization, and processing pipeline for survey data"
                },
                {
                  title: "Google Drive Document Management",
                  description: "Bidirectional sync with Google Drive for file uploads, automated backups, and collaborative document management"
                },
                {
                  title: "OpenStreetMap API Bridge",
                  description: "Integration with OSM APIs for geospatial data validation, changesets monitoring, and quality assurance workflows"
                },
                {
                  title: "Multi-Region Data Aggregation",
                  description: "Centralized dashboard aggregating project data across multiple geographical regions with real-time updates"
                },
                {
                  title: "Internal Tools Ecosystem",
                  description: "Hub for various internal tools and services, providing unified authentication and data sharing capabilities"
                }
              ].map((integration, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-primary-400 font-bold">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{integration.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">{integration.description}</p>
                    </div>
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
              Streamlining{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Operations
              </span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-12">
              Built as the central nervous system for Spatial Collective Ltd's Digital Public Works initiatives.
              This platform integrates multiple data sources, automates workflows, and provides real-time visibility
              into project operations across diverse geographical locations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Internal Tool</div>
                <div className="text-sm text-neutral-400">Spatial Collective Ltd</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Production</div>
                <div className="text-sm text-neutral-400">Active Development</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Enterprise</div>
                <div className="text-sm text-neutral-400">Security</div>
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
              Need Custom API Integration?
            </h2>
            <p className="text-xl text-neutral-300 mb-12">
              We build comprehensive platforms that connect your tools and automate your workflows
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
