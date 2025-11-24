"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Heart, Users, Lightbulb, GraduationCap, Hospital, TrendingUp, Bitcoin, Globe, Zap } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function RonnieFundPage() {
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
              <Heart className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400 font-medium">Nonprofit Website</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Ronnie Fund{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Website
              </span>
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed mb-8">
              A comprehensive nonprofit website empowering Kenyan communities through education, healthcare, and sustainable financial inclusion.
              Features Bitcoin donation integration, project showcase, and impact tracking for nearly two decades of grassroots partnership.
            </p>

            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient duration={4}>
                <Link
                  href="https://theronniefund.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </Link>
              </HoverBorderGradient>
              <Link
                href="https://pay.blink.sv/theronniefund"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all group"
              >
                <Bitcoin className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Donate Now
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
              <div className="text-4xl font-bold text-primary-400 mb-2">2,200+</div>
              <div className="text-sm text-neutral-400">Lives Touched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">145+</div>
              <div className="text-sm text-neutral-400">Scholarships Awarded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">5+</div>
              <div className="text-sm text-neutral-400">Women & Youth Groups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">20 Years</div>
              <div className="text-sm text-neutral-400">Since 2005</div>
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
              Impact-driven design connecting donors with grassroots community initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Bitcoin className="w-8 h-8" />,
                title: "Bitcoin Donation Integration",
                description: "Seamless Blink.sv payment integration for one-time, monthly, and project-specific Bitcoin donations"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Project Showcase",
                description: "Featured projects including Afribit Kibera, Wongonyi Library, and rural healthcare initiatives"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Impact Tracking",
                description: "Real-time statistics showing lives touched, scholarships awarded, and community impact metrics"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Partnership Models",
                description: "Three giving options: one-time, monthly partnership, and full project sponsorship"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Responsive Design",
                description: "Mobile-optimized interface ensuring accessibility for donors worldwide"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Newsletter System",
                description: "Email subscription for impact stories and progress updates from Kenya"
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

      {/* Featured Projects */}
      <section className="py-32 bg-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Supported <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Initiatives</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Bitcoin className="w-12 h-12" />,
                  title: "Afribit Kibera",
                  category: "Financial Innovation",
                  description: "Bitcoin education and opportunities in one of Africa's largest urban settlements, teaching programming & blockchain fundamentals"
                },
                {
                  icon: <Hospital className="w-12 h-12" />,
                  title: "Wongonyi Dispensary",
                  category: "Healthcare",
                  description: "Sustaining rural healthcare facilities providing essential medical services to underserved communities"
                },
                {
                  icon: <GraduationCap className="w-12 h-12" />,
                  title: "Education Programs",
                  category: "Scholarships & Libraries",
                  description: "Expanding libraries, scholarship programs, and the Eco Leadership Centre with 2 completed classes"
                },
                {
                  icon: <TrendingUp className="w-12 h-12" />,
                  title: "Women-Led Co-ops",
                  category: "Agriculture & Enterprise",
                  description: "Supporting women-led agricultural cooperatives for food security and financial independence"
                },
                {
                  icon: <Zap className="w-12 h-12" />,
                  title: "Youth Enterprise",
                  category: "Digital Empowerment",
                  description: "Reform You, DuDu Bay, Big Brother, Bones Artists, and Kevin Kibera Tours initiatives"
                },
                {
                  icon: <Globe className="w-12 h-12" />,
                  title: "Yogi Golle ICT Project",
                  category: "Tech Skills",
                  description: "Digital empowerment with 20+ youth trained in software development"
                }
              ].map((project, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <div className="text-primary-400">
                          {project.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-primary-400 uppercase tracking-wider mb-2">{project.category}</div>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      </div>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Technical <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Implementation</span>
            </h2>

            <div className="space-y-8">
              {[
                {
                  category: "Frontend",
                  items: ["React", "Responsive Design", "Modern CSS", "Optimized Images"]
                },
                {
                  category: "Integrations",
                  items: ["Blink.sv Bitcoin Payments", "Newsletter Subscription", "Contact Forms", "Social Media Links"]
                },
                {
                  category: "Features",
                  items: ["One-Time Donations", "Monthly Partnerships", "Project Sponsorship", "Impact Dashboard"]
                },
                {
                  category: "Infrastructure",
                  items: ["Secure Hosting", "SSL Encryption", "CDN Delivery", "Performance Optimization"]
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

      {/* Impact Section */}
      <section className="py-32 bg-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Building Bridges,{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                One Partnership at a Time
              </span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-12">
              For nearly two decades, The Ronnie Fund has stood as a bridge between hope and possibility in Kenya.
              The website serves as a digital gateway connecting global donors with local initiatives,
              featuring innovative Bitcoin payment integration and comprehensive project tracking.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">100%</div>
                <div className="text-sm text-neutral-400">Direct Project Support</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">3 Models</div>
                <div className="text-sm text-neutral-400">Giving Options</div>
              </div>
              <div className="px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <div className="text-2xl font-bold text-primary-400 mb-1">Live</div>
                <div className="text-sm text-neutral-400">Production Status</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl p-12 border border-primary-500/30 bg-gradient-to-br from-primary-950/20 to-black/90 backdrop-blur-sm text-center">
              <Heart className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-light text-neutral-200 leading-relaxed mb-8">
                "We don't bring solutions; we unlock the powerful potential already within communities."
              </blockquote>
              <div className="space-y-2">
                <p className="text-primary-400 font-semibold text-lg">Ronnie Mdawida & Peter and Kathy Wood</p>
                <p className="text-neutral-400">Founders, The Ronnie Fund</p>
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
              Need a Nonprofit Website?
            </h2>
            <p className="text-xl text-neutral-300 mb-12">
              We build impactful websites that connect donors with causes and drive real change
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
