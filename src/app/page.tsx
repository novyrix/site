"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Shield, Code2, TrendingUp, CheckCircle2, ChevronRight, Globe, Smartphone, Database, Lock, Gauge, Server, ShieldCheck, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import RippleGrid from "@/components/ui/ripple-grid";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Lightning } from "@/components/ui/lightning";
import { KRALogo, NovyrixLogo, MPesaLogo, SMSLogo, APILogo, DatabaseLogo, SecurityLogo, MobileLogo } from "@/components/ui/integration-logos";
import { UnifiedServiceCard, Container } from "@/components/ui/unified-service-card";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import FloatingLines from "@/components/ui/FloatingLines";
import { AnimatedIconCard } from "@/components/ui/animated-icon";

export default function Home() {
  const techStack = [
    { quote: "Next.js 14", name: "The React Framework", title: "Frontend" },
    { quote: "Node.js", name: "JavaScript Runtime", title: "Backend" },
    { quote: "TypeScript", name: "Type Safety", title: "Language" },
    { quote: "Prisma ORM", name: "Database Tooling", title: "Data" },
    { quote: "Tailwind CSS", name: "Utility-first CSS", title: "Styling" },
    { quote: "PostgreSQL", name: "Relational Database", title: "Storage" },
    { quote: "Docker", name: "Containerization", title: "DevOps" },
    { quote: "AWS", name: "Cloud Infrastructure", title: "Hosting" },
  ];

  const services = [
    {
      title: "Custom Web Applications",
      description: "Scalable, high-performance web apps built with Next.js. From SaaS platforms to internal tools.",
      link: "/services/web-development",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: "Workflow Automation",
      description: "Eliminate manual tasks. We connect your apps (CRM, Email, Sheets) to work together automatically.",
      link: "/services/automation",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Mobile App Development",
      description: "Native-feeling cross-platform mobile apps using React Native. iOS and Android from one codebase.",
      link: "/services/mobile",
      icon: <Smartphone className="w-8 h-8" />,
    },
    {
      title: "API Integration",
      description: "Connect M-Pesa, KRA eTIMS, SMS gateways, and 3rd party APIs seamlessly into your systems.",
      link: "/services/api-integration",
      icon: <Code2 className="w-8 h-8" />,
    },
    {
      title: "Database Design",
      description: "Secure, optimized database architecture. We ensure your data is safe, fast, and scalable.",
      link: "/services/database",
      icon: <Database className="w-8 h-8" />,
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security implementation. Auth, encryption, and compliance built-in from day one.",
      link: "/services/security",
      icon: <Lock className="w-8 h-8" />,
    },
  ];

  const bentoItems = [
    {
      title: "Radical Transparency",
      description: "Every cost itemized. No hidden fees. Know exactly what you're paying for before we start.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary-950/20 via-primary-900/10 to-neutral-900 border border-primary-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-2 right-2">
            <Shield className="w-12 h-12 text-primary-500/20 group-hover:text-primary-500/30 transition-colors duration-500" />
          </div>
        </div>
      ),
      icon: <Shield className="h-5 w-5 text-primary-400" />,
      className: "md:col-span-2",
    },
    {
      title: "Fixed-Price Model",
      description: "Know the total cost upfront. We're incentivized to be efficient, not to bill hours.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary-950/20 via-primary-900/10 to-neutral-900 border border-primary-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-2 right-2">
            <Zap className="w-12 h-12 text-primary-500/20 group-hover:text-primary-500/30 transition-colors duration-500" />
          </div>
        </div>
      ),
      icon: <Zap className="h-5 w-5 text-primary-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Built to Scale",
      description: "Your digital asset grows with your business. Handle 10 or 10,000 users without a rewrite.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary-950/20 via-primary-900/10 to-neutral-900 border border-primary-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-2 right-2">
            <TrendingUp className="w-12 h-12 text-primary-500/20 group-hover:text-primary-500/30 transition-colors duration-500" />
          </div>
        </div>
      ),
      icon: <TrendingUp className="h-5 w-5 text-primary-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Made in Kenya",
      description: "Local understanding, global standards. We build solutions that work for the Kenyan market.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary-950/20 via-primary-900/10 to-neutral-900 border border-primary-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-2 right-2">
            <CheckCircle2 className="w-12 h-12 text-primary-500/20 group-hover:text-primary-500/30 transition-colors duration-500" />
          </div>
        </div>
      ),
      icon: <CheckCircle2 className="h-5 w-5 text-primary-400" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* Hero Section - With RippleGrid Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* RippleGrid Animation Background */}
        <RippleGrid
          enableRainbow={false}
          gridColor="#d84315"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.6}
        />

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20 z-[1] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 pointer-events-none">
          <div className="pointer-events-auto">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-block animate-fade-in">
              <div className="bg-neutral-900/80 backdrop-blur-sm border border-primary-500/20 rounded-full px-3 py-1.5 inline-flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                <span className="text-neutral-300">Made in Kenya</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-primary-500/20 text-primary-400 rounded-full">Live</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight animate-fade-in">
              <span className="block text-white mb-2">Transform Your</span>
              <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,87,34,0.3)]">
                Business Ideas
              </span>
              <span className="block text-white mt-2">into Digital Reality</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.1s'}}>
              Custom web apps & automation that actually work for{" "}
              <span className="text-white font-semibold">Kenyan businesses</span>.{" "}
              Transparent pricing. No hourly rates.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/calculators">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  duration={5}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Get Instant Quote</span>
                </HoverBorderGradient>
              </Link>
              <Link href="/portfolio">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  duration={5}
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>View Our Work</span>
                </HoverBorderGradient>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs">
              <div className="flex items-center gap-2 text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>Fixed Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>No Hourly Rates</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>Transparent Process</span>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-neutral-600 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Tech Stack Section - With Official Logos */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Full-width fade overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="mb-12 text-center">
          <p className="text-sm text-neutral-500 uppercase tracking-widest">Powered by Modern Tech Stack</p>
        </div>

        <div className="relative">
          <div className="flex items-center gap-16 animate-scroll">
            {/* Next.js */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
                  alt="Next.js"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Next.js</span>
            </div>

            {/* Node.js */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                  alt="Node.js"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Node.js</span>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                  alt="TypeScript"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">TypeScript</span>
            </div>

            {/* Prisma */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"
                  alt="Prisma"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Prisma</span>
            </div>

            {/* Tailwind CSS */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                  alt="Tailwind CSS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Tailwind CSS</span>
            </div>

            {/* PostgreSQL */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                  alt="PostgreSQL"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">PostgreSQL</span>
            </div>

            {/* Docker */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
                  alt="Docker"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Docker</span>
            </div>

            {/* AWS */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                  alt="AWS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">AWS</span>
            </div>

            {/* PostgreSQL */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                  alt="PostgreSQL"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">PostgreSQL</span>
            </div>

            {/* Docker */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
                  alt="Docker"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Docker</span>
            </div>

            {/* AWS */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                  alt="AWS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">AWS</span>
            </div>

            {/* Duplicate set for seamless infinite scroll */}
            {/* Next.js */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
                  alt="Next.js"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Next.js</span>
            </div>

            {/* Node.js */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                  alt="Node.js"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Node.js</span>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                  alt="TypeScript"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">TypeScript</span>
            </div>

            {/* Prisma */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"
                  alt="Prisma"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Prisma</span>
            </div>

            {/* Tailwind CSS */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                  alt="Tailwind CSS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Tailwind CSS</span>
            </div>

            {/* PostgreSQL */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                  alt="PostgreSQL"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">PostgreSQL</span>
            </div>

            {/* Docker */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
                  alt="Docker"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">Docker</span>
            </div>

            {/* AWS */}
            <div className="flex flex-col items-center gap-3 min-w-[140px] group cursor-pointer">
              <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                  alt="AWS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-white font-medium transition-colors duration-300">AWS</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}</style>
      </section>

      {/* Services Section - Enhanced with Animated Cards */}
      <section className="py-32 bg-black bg-grid-white/[0.02] relative overflow-hidden">
        {/* Ambient glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Our Services</p>
            <h2 className="text-5xl md:text-7xl font-bold">
              What We <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Build</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              End-to-end digital solutions tailored to your business needs. From concept to deployment, we've got you covered.
            </p>
          </div>

          {/* Animated Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Web Applications */}
            <UnifiedServiceCard
              title="Custom Web Applications"
              description="Scalable, high-performance web apps built with Next.js. From SaaS platforms to internal tools."
              gifUrl="/gifs/web-development.gif"
              link="/services/web-development"
            >
              <Container className="h-8 w-8 circle-1">
                <NovyrixLogo className="h-4 w-4" />
              </Container>
              <Container className="h-12 w-12 circle-2">
                <Globe className="h-6 w-6 text-white" />
              </Container>
              <Container className="circle-3">
                <NovyrixLogo className="h-8 w-8" />
              </Container>
              <Container className="h-12 w-12 circle-4">
                <Code2 className="h-6 w-6 text-white" />
              </Container>
              <Container className="h-8 w-8 circle-5">
                <Sparkles className="h-4 w-4 text-white" />
              </Container>
            </UnifiedServiceCard>

            {/* Workflow Automation */}
            <UnifiedServiceCard
              title="Workflow Automation"
              description="Eliminate manual tasks. We connect your apps (CRM, Email, Sheets) to work together automatically."
              gifUrl="/gifs/automation.gif"
              link="/services/automation"
            >
              <Container className="h-8 w-8 circle-1">
                <Zap className="h-4 w-4 text-white" />
              </Container>
              <Container className="h-12 w-12 circle-2">
                <APILogo className="h-6 w-6" />
              </Container>
              <Container className="circle-3">
                <Zap className="h-8 w-8 text-white" />
              </Container>
              <Container className="h-12 w-12 circle-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </Container>
              <Container className="h-8 w-8 circle-5">
                <Code2 className="h-4 w-4 text-white" />
              </Container>
            </UnifiedServiceCard>

            {/* Mobile App Development */}
            <UnifiedServiceCard
              title="Mobile App Development"
              description="Native-feeling cross-platform mobile apps using React Native. iOS and Android from one codebase."
              gifUrl="/gifs/mobile-app.gif"
              link="/services/mobile"
            >
              <Container className="h-8 w-8 circle-1">
                <MobileLogo className="h-4 w-4" />
              </Container>
              <Container className="h-12 w-12 circle-2">
                <Smartphone className="h-6 w-6 text-white" />
              </Container>
              <Container className="circle-3">
                <MobileLogo className="h-8 w-8" />
              </Container>
              <Container className="h-12 w-12 circle-4">
                <Code2 className="h-6 w-6 text-white" />
              </Container>
              <Container className="h-8 w-8 circle-5">
                <Globe className="h-4 w-4 text-white" />
              </Container>
            </UnifiedServiceCard>

            {/* API Integration */}
            <UnifiedServiceCard
              title="API Integration"
              description="Connect M-Pesa, KRA eTIMS, SMS gateways, and 3rd party APIs seamlessly into your systems."
              gifUrl="/gifs/api-integration.gif"
              link="/services/api-integration"
            >
              <Container className="h-8 w-8 circle-1">
                <MPesaLogo className="h-4 w-4" />
              </Container>
              <Container className="h-12 w-12 circle-2">
                <KRALogo className="h-6 w-6" />
              </Container>
              <Container className="circle-3">
                <APILogo className="h-8 w-8" />
              </Container>
              <Container className="h-12 w-12 circle-4">
                <SMSLogo className="h-6 w-6" />
              </Container>
              <Container className="h-8 w-8 circle-5">
                <Code2 className="h-4 w-4 text-white" />
              </Container>
            </UnifiedServiceCard>

            {/* Database Design */}
            <UnifiedServiceCard
              title="Database Design"
              description="Secure, optimized database architecture. We ensure your data is safe, fast, and scalable."
              gifUrl="/gifs/database.gif"
              link="/services/database"
            >
              <Container className="h-8 w-8 circle-1">
                <DatabaseLogo className="h-4 w-4" />
              </Container>
              <Container className="h-12 w-12 circle-2">
                <Database className="h-6 w-6 text-white" />
              </Container>
              <Container className="circle-3">
                <DatabaseLogo className="h-8 w-8" />
              </Container>
              <Container className="h-12 w-12 circle-4">
                <Server className="h-6 w-6 text-white" />
              </Container>
              <Container className="h-8 w-8 circle-5">
                <Shield className="h-4 w-4 text-white" />
              </Container>
            </UnifiedServiceCard>

            {/* Enterprise Security */}
            <UnifiedServiceCard
              title="Enterprise Security"
              description="Bank-grade security implementation. Auth, encryption, and compliance built-in from day one."
              gifUrl="/gifs/security.gif"
              link="/services/security"
            >
              <Container className="h-8 w-8 circle-1">
                <SecurityLogo className="h-4 w-4" />
              </Container>
              <Container className="h-12 w-12 circle-2">
                <ShieldCheck className="h-6 w-6 text-white" />
              </Container>
              <Container className="circle-3">
                <SecurityLogo className="h-8 w-8" />
              </Container>
              <Container className="h-12 w-12 circle-4">
                <Lock className="h-6 w-6 text-white" />
              </Container>
              <Container className="h-8 w-8 circle-5">
                <Shield className="h-4 w-4 text-white" />
              </Container>
            </UnifiedServiceCard>
          </div>
        </div>
      </section>

      {/* Lightning Performance Section - Evervault Cards */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* FloatingLines background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <FloatingLines
            enabledWaves={['middle', 'bottom']}
            lineCount={[3, 5]}
            lineDistance={[15, 12]}
            bendRadius={8.0}
            bendStrength={-0.3}
            interactive={true}
            parallax={false}
            linesGradient={['#ff5722', '#ff7043', '#ff8a65']}
            animationSpeed={0.3}
            mixBlendMode="screen"
          />
        </div>

        {/* Black overlay to darken background */}
        <div className="absolute inset-0 bg-black/70 z-[1] pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[2]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-6">
            <p className="text-sm text-blue-400 uppercase tracking-widest font-medium">Performance Metrics</p>
            <h2 className="text-5xl md:text-7xl font-bold">
              Built for <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Speed</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Lightning-fast performance meets enterprise-grade reliability. Your users deserve the best.
            </p>
          </div>

          {/* Evervault Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Page Load Time */}
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm w-full mx-auto p-6 relative h-[30rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <div className="w-full">
                <EvervaultCard text="<1.5s" />
              </div>

              <div className="mt-4 w-full">
                <h2 className="dark:text-white text-white text-base font-bold mb-1.5">
                  Average Load Time
                </h2>
                <p className="text-[10px] border font-light dark:border-white/[0.2] border-white/[0.2] rounded-full text-white px-2 py-0.5 inline-block">
                  Optimized for instant engagement
                </p>
              </div>
            </div>

            {/* Uptime */}
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm w-full mx-auto p-6 relative h-[30rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <div className="w-full">
                <EvervaultCard text="99.9%" />
              </div>

              <div className="mt-4 w-full">
                <h2 className="dark:text-white text-white text-base font-bold mb-1.5">
                  Uptime Guarantee
                </h2>
                <p className="text-[10px] border font-light dark:border-white/[0.2] border-white/[0.2] rounded-full text-white px-2 py-0.5 inline-block">
                  Always available when you need it
                </p>
              </div>
            </div>

            {/* Security Score */}
            <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm w-full mx-auto p-6 relative h-[30rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <div className="w-full">
                <EvervaultCard text="A+" />
              </div>

              <div className="mt-4 w-full">
                <h2 className="dark:text-white text-white text-base font-bold mb-1.5">
                  Security Rating
                </h2>
                <p className="text-[10px] border font-light dark:border-white/[0.2] border-white/[0.2] rounded-full text-white px-2 py-0.5 inline-block">
                  Bank-grade encryption & protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Novyrix Section - Animated Icon Cards */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Ambient orange glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <p className="text-sm text-primary-400 uppercase tracking-widest font-medium">Why Choose Us</p>
            <h2 className="text-5xl md:text-7xl font-bold">
              Why Choose <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Novyrix</span>?
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              We're not just developers. We're your strategic technology partners committed to your success.
            </p>
          </div>

          {/* Animated Icon Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <AnimatedIconCard
              icon={Shield}
              title="Radical Transparency"
              description="Every cost itemized. No hidden fees. Know exactly what you're paying for before we start."
              variant="bounce"
            />
            <AnimatedIconCard
              icon={Zap}
              title="Fixed-Price Model"
              description="Know the total cost upfront. We're incentivized to be efficient, not to bill hours."
              variant="pulse"
            />
            <AnimatedIconCard
              icon={TrendingUp}
              title="Built to Scale"
              description="Your digital asset grows with your business. Handle 10 or 10,000 users without a rewrite."
              variant="rotate"
            />
            <AnimatedIconCard
              icon={Globe}
              title="Made in Kenya"
              description="Local understanding, global standards. We build solutions that work for the Kenyan market."
              variant="scale"
            />
          </div>
        </div>
      </section>

      {/* Portfolio CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Portfolio</p>
            <h2 className="text-5xl md:text-7xl font-bold">
              Our <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Explore our projects by service category. Real solutions for real businesses.
            </p>
          </div>

          {/* Service Categories Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Web Development */}
            <Link href="/portfolio/web-development" className="group cursor-target">
              <div className="relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 h-full">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Globe className="w-8 h-8 text-primary-400" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">Web Development</h3>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                    Responsive websites, web applications, and e-commerce platforms
                  </p>

                  {/* Example Project */}
                  <div className="pt-4 border-t border-white/10 mb-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Featured Project</p>
                    <p className="text-sm text-neutral-300 font-medium">Afribit Africa</p>
                    <p className="text-xs text-neutral-400 mt-1">Crypto trading platform with real-time data</p>
                  </div>

                  <div className="flex items-center gap-2 text-primary-400 font-medium text-sm group-hover:gap-3 transition-all">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Software Development */}
            <Link href="/portfolio/software-development" className="group cursor-target">
              <div className="relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 h-full">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Code2 className="w-8 h-8 text-primary-400" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">Software Development</h3>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                    Custom software, plugins, and desktop applications
                  </p>

                  {/* Example Project */}
                  <div className="pt-4 border-t border-white/10 mb-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Featured Project</p>
                    <p className="text-sm text-neutral-300 font-medium">DPW JOSM Plugin</p>
                    <p className="text-xs text-neutral-400 mt-1">OpenStreetMap validation with OAuth 2.0</p>
                  </div>

                  <div className="flex items-center gap-2 text-primary-400 font-medium text-sm group-hover:gap-3 transition-all">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Workflow Automation */}
            <Link href="/portfolio/automation" className="group cursor-target">
              <div className="relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 h-full">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Zap className="w-8 h-8 text-primary-400" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">Workflow Automation</h3>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                    API integration, process automation, and system synchronization
                  </p>

                  {/* Example Project */}
                  <div className="pt-4 border-t border-white/10 mb-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Featured Project</p>
                    <p className="text-sm text-neutral-300 font-medium">SC Platform</p>
                    <p className="text-xs text-neutral-400 mt-1">Multi-API integration with real-time sync</p>
                  </div>

                  <div className="flex items-center gap-2 text-primary-400 font-medium text-sm group-hover:gap-3 transition-all">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* CTA to View All */}
          <div className="text-center">
            <Link href="/portfolio">
              <HoverBorderGradient>
                <span className="flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </span>
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section - 3 Main Services */}
      <section className="py-32 bg-black bg-grid-white/[0.02] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <p className="text-sm text-neutral-400 uppercase tracking-widest font-medium">Service Pricing</p>
            <h2 className="text-5xl md:text-7xl font-bold">
              Transparent <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Clear pricing for our three core services. View detailed pricing documentation for each.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Custom Web Development",
                icon: <Globe className="w-8 h-8" />,
                startingPrice: "35,000",
                desc: "Professional websites, web applications, and digital experiences tailored to your brand",
                features: ["Responsive Design", "Modern Frameworks", "SEO Optimized", "CMS Integration", "E-commerce Solutions", "Progressive Web Apps"],
                link: "/pricing/web-development"
              },
              {
                name: "Software Development",
                icon: <Code2 className="w-8 h-8" />,
                startingPrice: "50,000",
                desc: "Custom software solutions, plugins, integrations, and enterprise applications",
                features: ["Mobile Apps", "Desktop Software", "Custom Plugins", "System Integration", "API Development", "Enterprise Solutions"],
                link: "/pricing/software-development"
              },
              {
                name: "Workflow Automation",
                icon: <Zap className="w-8 h-8" />,
                startingPrice: "20,000",
                desc: "Streamline operations with intelligent automation and seamless system integration",
                features: ["Process Automation", "API Integration", "M-Pesa & KRA eTIMS", "Data Synchronization", "Email Workflows", "Custom Scripts"],
                link: "/pricing/automation"
              }
            ].map((service, idx) => (
              <Link
                key={idx}
                href={service.link}
                className="group relative cursor-target"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Card */}
                <div className="relative rounded-2xl p-8 border border-white/10 bg-black/90 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="text-primary-400">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">{service.name}</h3>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-neutral-400">Starting from</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">KES {service.startingPrice}</span>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{service.desc}</p>

                  <ul className="space-y-3 mb-6 flex-1">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-primary-400 font-medium text-sm group-hover:gap-3 transition-all">
                    View Detailed Pricing <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-neutral-400 mb-4">Need a custom solution or have questions about pricing?</p>
            <Link href="/#contact" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-32 border-t border-slate-800 bg-black bg-grid-white/[0.02] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/10 via-black/50 to-black" />

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Digital Asset
              </span>
              ?
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Get an instant, transparent quote from Novy AI. No sales calls required.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/ai-consultant">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  duration={5}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Get Instant Quote</span>
                </HoverBorderGradient>
              </Link>

              <Link href="/services">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  duration={5}
                >
                  <span>Explore Services</span>
                  <ChevronRight className="h-4 w-4" />
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
