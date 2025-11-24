"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Code2, Gauge, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WebDevelopmentPage() {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Modern Tech Stack",
      description: "Built with Next.js 14, TypeScript, and Tailwind CSS for cutting-edge performance and developer experience."
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Server-side rendering, static generation, and edge caching deliver sub-second page loads globally."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "HTTPS, CSP headers, XSS protection, and secure authentication built-in from day one."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Built to Scale",
      description: "Serverless architecture that automatically scales from 10 to 10,000+ concurrent users."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Centric Design",
      description: "Intuitive interfaces designed with real user research and accessibility standards."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Features",
      description: "WebSockets and real-time updates for collaborative features and live data."
    }
  ];

  const projects = [
    {
      name: "Afribit Africa",
      description: "Cryptocurrency exchange platform with real-time trading, wallet management, and KYC verification.",
      tech: ["Next.js", "Node.js", "PostgreSQL", "WebSocket"],
      metrics: {
        users: "10,000+",
        uptime: "99.9%",
        loadTime: "<1.2s"
      }
    },
    {
      name: "Severius Adventures",
      description: "Travel booking platform with interactive maps, real-time availability, and payment processing.",
      tech: ["Next.js", "Prisma", "Stripe", "AWS S3"],
      metrics: {
        users: "5,000+",
        uptime: "99.8%",
        loadTime: "<1.5s"
      }
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target users, and technical requirements. We create detailed project specifications and wireframes."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Our designers create pixel-perfect mockups and interactive prototypes. You'll see exactly what you're getting before we write a single line of code."
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development with weekly updates. We build feature-by-feature, ensuring quality at every step with automated testing and code reviews."
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Comprehensive QA testing across devices and browsers. We handle deployment, monitoring setup, and provide post-launch support."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="text-primary-400 text-sm font-medium">Custom Web Applications</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Scalable Web Apps Built for <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Growth</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            From SaaS platforms to internal tools, we build high-performance web applications that scale with your business. Modern tech stack, enterprise security, and lightning-fast performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-700 hover:border-primary-500">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            Real applications we've built for real businesses. These aren't just pretty designs – they're production systems handling thousands of users.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-all hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                <p className="text-neutral-400 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm border border-primary-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
                  <div>
                    <div className="text-2xl font-bold text-primary-400">{project.metrics.users}</div>
                    <div className="text-xs text-neutral-500">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-400">{project.metrics.uptime}</div>
                    <div className="text-xs text-neutral-500">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-400">{project.metrics.loadTime}</div>
                    <div className="text-xs text-neutral-500">Load Time</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-neutral-950/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 border-2 border-primary-500/50 flex items-center justify-center text-primary-400 font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-neutral-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Build Your Web Application?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Let's discuss your project. Get a detailed proposal with timeline and fixed pricing.
          </p>
          <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
