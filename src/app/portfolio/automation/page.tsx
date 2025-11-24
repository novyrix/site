import Link from 'next/link';
import { ArrowRight, Zap, Database, CheckCircle2, ExternalLink, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Workflow Automation Portfolio | Novyrix',
  description: 'API integration and automation solutions we\'ve built for businesses.',
};

export default function AutomationPortfolioPage() {
  const projects = [
    {
      slug: "spatial-collective-platform",
      title: "Spatial Collective Platform",
      description: "Internal automation tool integrating ODK Collect, Google Drive, OpenStreetMap APIs, and real-time data visualization",
      category: "Platform Integration",
      tech: ["Node.js", "Express", "PostgreSQL", "Redis", "WebSocket", "OAuth 2.0"],
      features: [
        "ODK Collect data synchronization",
        "Google Drive automated backups",
        "OpenStreetMap API integration",
        "Real-time monitoring dashboard",
        "Multi-region data processing",
        "Automated quality checks"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 bg-black bg-grid-white/[0.02] border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary-500/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm md:text-base text-neutral-400 hover:text-primary-400 transition-colors mb-6 md:mb-8 group touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>

            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs md:text-sm">
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Workflow Automation</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Automation <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Solutions</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed">
                API integration, process automation, and seamless system synchronization that saves time and reduces errors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {projects.map((project, idx) => (
              <Link
                key={idx}
                href={`/portfolio/${project.slug}`}
                className="group block touch-manipulation"
              >
                <div className="relative rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 active:border-primary-500/50 transition-all duration-300">
                  {/* Glow effect - only on desktop */}
                  <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      {/* Left: Project Info */}
                      <div>
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">\n                            <Database className="w-5 h-5 md:w-6 md:h-6 text-primary-400" />
                          </div>
                          <span className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-wider font-medium">
                            {project.category}
                          </span>
                        </div>

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 group-hover:text-primary-400 group-active:text-primary-400 transition-colors">
                          {project.title}
                        </h2>

                        <p className="text-sm md:text-base text-neutral-300 mb-4 md:mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-4 md:mb-6">
                          <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 font-semibold">
                            Technology Stack
                          </p>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {project.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white/5 text-neutral-300 text-[10px] md:text-xs border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-primary-400 font-medium text-sm md:text-base group-hover:gap-3 transition-all">
                          View Project Details
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Right: Features */}
                      <div>
                        <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider mb-3 md:mb-4 font-semibold">
                          Key Features
                        </p>
                        <ul className="space-y-2 md:space-y-3">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-neutral-300">
                              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Automation Examples */}
          <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Other Automation Work</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="rounded-lg md:rounded-xl p-5 md:p-6 border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">M-Pesa Integration</h4>
                <p className="text-neutral-400 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                  Integrated M-Pesa STK Push for Severius Adventures, automating payment notifications and reconciliation.
                </p>
                <ul className="space-y-1.5 md:space-y-2">
                  <li className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Real-time payment webhooks</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Automatic transaction matching</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Error handling & retry logic</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg md:rounded-xl p-5 md:p-6 border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0">
                  <Database className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Data Synchronization</h4>
                <p className="text-neutral-400 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                  Built automated data pipelines for multiple clients, syncing data between ERPs, CRMs, and custom systems.
                </p>
                <ul className="space-y-1.5 md:space-y-2">
                  <li className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Bidirectional data sync</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Conflict resolution logic</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Real-time monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-12 md:mt-16 text-center py-12 md:py-16 border-t border-white/10">
            <div className="max-w-xl mx-auto px-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">More Case Studies Coming</h3>
              <p className="text-neutral-400 text-sm md:text-base mb-4 md:mb-6">
                We're documenting more automation projects. Many of our integrations are under NDA, but we'll share what we can.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-black font-medium transition-all duration-300 touch-manipulation text-sm md:text-base"
              >
                Discuss Your Automation Needs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-black bg-grid-white/[0.02] border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
              Ready to <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Automate</span>?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed">
              Save time and reduce errors with intelligent automation. Let's discuss how we can streamline your workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-black font-medium transition-all duration-300 touch-manipulation text-sm md:text-base"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing/automation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl border border-white/10 hover:border-primary-500/30 active:border-primary-500/50 transition-all duration-300 touch-manipulation text-sm md:text-base"
              >
                View Pricing
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
