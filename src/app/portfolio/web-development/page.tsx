"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Smartphone, Shield, ArrowRight, ExternalLink } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function WebDevelopmentPortfolioPage() {
  const webProjects = [
    {
      slug: "afribit-africa",
      title: "Afribit Africa",
      description: "Bitcoin circular economy platform empowering Kibera community with financial inclusion",
      category: "Cryptocurrency & Fintech",
      icon: <Globe className="w-8 h-8 md:w-12 lg:w-16" />,
      techStack: ["Next.js", "React", "BTCPay", "Lightning"]
    },
    {
      slug: "severius-adventures",
      title: "Severius Adventures",
      description: "Luxury safari booking platform for East African experiences with seamless booking",
      category: "Tourism & Travel",
      icon: <Smartphone className="w-8 h-8 md:w-12 lg:w-16" />,
      techStack: ["Next.js", "Framer Motion", "Node.js", "Tailwind"]
    },
    {
      href: "/portfolio/ronnie-fund",
      title: "The Ronnie Fund",
      description: "Nonprofit website with Bitcoin donation integration supporting community initiatives",
      category: "Nonprofit & Social Impact",
      icon: <Shield className="w-8 h-8 md:w-12 lg:w-16" />,
      techStack: ["React", "Bitcoin", "Blink.sv", "Impact Metrics"]
    },
    {
      href: "/portfolio/spatial-collective-learn",
      title: "Spatial Collective Learn",
      description: "Employee manual & documentation platform for internal team knowledge sharing",
      category: "Internal Tools & Documentation",
      icon: <Globe className="w-8 h-8 md:w-12 lg:w-16" />,
      techStack: ["Next.js 14", "TypeScript", "Vercel", "Tailwind"]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary-500/20 rounded-full blur-[100px] md:blur-[150px]" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm md:text-base text-neutral-400 hover:text-primary-400 transition-colors mb-6 md:mb-8 group touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4 md:mb-6">
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400" />
              <span className="text-xs md:text-sm text-primary-400 font-medium">Web Development Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              Web Development{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed mb-6 md:mb-8">
              Custom web applications built with modern technologies. From cryptocurrency platforms to nonprofit websites,
              each project showcases our expertise in full-stack development and user-centric design.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {webProjects.map((project, idx) => {
              const href = project.slug ? `/portfolio/${project.slug}` : project.href;

              return (
                <Link key={idx} href={href!} className="group block touch-manipulation">
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 active:border-primary-500/50 transition-all duration-300 h-full">
                    {/* Glow effect - only on desktop */}
                    <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                    <div className="relative">
                      {/* Icon container */}
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-primary-500/20 group-hover:text-primary-500/30 group-active:text-primary-500/40 transition-colors duration-300">
                            {project.icon}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 lg:p-8">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-500" />
                          <span className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-wider font-medium">{project.category}</span>
                        </div>

                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary-400 group-active:text-primary-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm md:text-base text-neutral-400 mb-4 md:mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* View Project Arrow - Mobile */}
                        <div className="flex items-center gap-2 text-primary-400 text-sm font-medium mt-4 md:hidden">
                          View Project
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Capabilities Section */}
          <div className="mt-12 md:mt-20 max-w-6xl mx-auto">
            <div className="rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12 border border-primary-500/30 bg-gradient-to-br from-primary-950/20 to-black/90 backdrop-blur-sm text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                What We Build
              </h2>
              <p className="text-sm md:text-lg lg:text-xl text-neutral-300 leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
                We specialize in scalable web applications, e-commerce platforms, SaaS products, and custom business tools.
                Every project is built with modern frameworks, optimized for performance, and designed for growth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
                {[
                  { title: "Full-Stack Development", desc: "Next.js, React, Node.js, PostgreSQL" },
                  { title: "API Integration", desc: "Payment gateways, third-party services, webhooks" },
                  { title: "Modern Design", desc: "Responsive, accessible, conversion-focused UX" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-lg md:rounded-xl bg-black/50 border border-white/10">
                    <h3 className="text-base md:text-lg font-bold text-primary-400 mb-1.5 md:mb-2">{item.title}</h3>
                    <p className="text-xs md:text-sm text-neutral-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 md:mt-20 text-center px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              Let's build something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
              <Link href="/#contact" className="touch-manipulation">
                <HoverBorderGradient duration={5}>
                  <span className="inline-flex items-center gap-2">
                    Get a Quote
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </HoverBorderGradient>
              </Link>
              <Link
                href="/pricing/web-development"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:py-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/30 active:border-primary-500/50 transition-all touch-manipulation text-sm md:text-base"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
