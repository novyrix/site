"use client";

import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Shield, Zap, Database, Upload, Users, CheckCircle, Code2, Globe } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function DPWJosmPluginPage() {
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
              <Code2 className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400 font-medium">Plugin Development</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              DPW Validation Tool for{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                JOSM
              </span>
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed mb-8">
              A specialized JOSM plugin streamlining quality assurance workflows for the Digital Public Works Settlement Digitization project.
              Features OAuth 2.0 authentication, automated validation, and cloud storage integration for OpenStreetMap data quality control.
            </p>

            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient duration={4}>
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  Private Repository
                </span>
              </HoverBorderGradient>
              <Link
                href="https://github.com/SpatialCollectiveLtd/DPW-Validation-JOSM-Plugin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all group"
              >
                <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-12 border-y border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">v3.0.1</div>
              <div className="text-sm text-neutral-400">Current Version</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">10</div>
              <div className="text-sm text-neutral-400">Error Types Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">OAuth 2.0</div>
              <div className="text-sm text-neutral-400">Authentication</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
              <div className="text-sm text-neutral-400">Automated Workflow</div>
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
              Key <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Enterprise-grade quality assurance for OpenStreetMap data validation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "OAuth 2.0 Authentication",
                description: "Automatic validator detection using JOSM credentials with secure authorization checks"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Automated Work Isolation",
                description: "Isolate specific mapper's work for unbiased validation with timestamp filtering"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Quality Assurance Panel",
                description: "Track 10 error types with +/- controls and comprehensive validation comments"
              },
              {
                icon: <Upload className="w-8 h-8" />,
                title: "Cloud Backup Integration",
                description: "Automatic Google Drive upload via DPW Manager API with progress tracking"
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Automated Export",
                description: "One-click export of validated data with project-compliant naming conventions"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "User Registry Integration",
                description: "Seamless integration with DPW Manager user registry for authorization"
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

      {/* Technical Details */}
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
                  category: "Core Technologies",
                  items: ["Java 21", "JOSM API (Build 18823+)", "Apache Ant", "OAuth 2.0"]
                },
                {
                  category: "Integrations",
                  items: ["DPW Manager API", "Google Drive API", "OpenStreetMap OSM Data", "Multipart Form Upload"]
                },
                {
                  category: "Key Features",
                  items: ["WebGL Shader Integration", "Real-time Progress Tracking", "Custom JSON Parser", "Session Management"]
                },
                {
                  category: "Validation Capabilities",
                  items: ["Hanging Nodes Detection", "Overlapping Buildings Check", "Missing Tags Validation", "Geometry Error Analysis"]
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

      {/* Workflow Overview */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Validation <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Workflow</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Select Date & Mapper",
                  description: "Choose validation date and mapper from dropdown. Settlement auto-fills for context."
                },
                {
                  step: "02",
                  title: "Isolate Work",
                  description: "Plugin creates temporary validation layer with only selected mapper's work from the specified date."
                },
                {
                  step: "03",
                  title: "Review & Validate",
                  description: "Count and categorize errors using +/- buttons. Validation preview shows complete breakdown before submission."
                },
                {
                  step: "04",
                  title: "Submit Decision",
                  description: "Accept or reject with enhanced confirmation dialogs showing summary and next steps."
                },
                {
                  step: "05",
                  title: "Export Data",
                  description: "Automatic export prompt with cloud backup. File saved locally and uploaded to Google Drive."
                },
                {
                  step: "06",
                  title: "Reset Session",
                  description: "Lightweight session reset clears layers and form without JOSM restart. Ready for next validation."
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="group flex gap-6 p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl font-bold text-primary-400">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{step.description}</p>
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
              Built for <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Digital Public Works</span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-12">
              Developed for Spatial Collective Ltd as part of the 2025 Digital Public Works Settlement Digitization project.
              This tool streamlines quality assurance workflows, ensuring high-quality OpenStreetMap data for settlement mapping initiatives.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">MIT License</div>
                <div className="text-sm text-neutral-400">Open Source</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">4 Releases</div>
                <div className="text-sm text-neutral-400">Active Development</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Nov 2025</div>
                <div className="text-sm text-neutral-400">Latest Update</div>
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
              Need Custom Plugin Development?
            </h2>
            <p className="text-xl text-neutral-300 mb-12">
              We build specialized tools and integrations for your unique workflows
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
