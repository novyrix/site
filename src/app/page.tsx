"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Search, Zap, Shield, Code2, TrendingUp, CheckCircle2, Star, ChevronRight, Globe, Smartphone, Database, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlaceholderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to services or open chat (future)
    // For now, just log
    console.log("Search:", searchQuery);
  };

  const placeholders = [
    "I need a custom e-commerce platform with M-Pesa...",
    "Build a staff management system with payroll...",
    "Create a booking website for my salon business...",
    "Help me automate my KRA eTIMS compliance...",
    "I want a portfolio website with a blog section...",
  ];

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
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <Shield className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-2",
    },
    {
      title: "Fixed-Price Model",
      description: "Know the total cost upfront. We're incentivized to be efficient, not to bill hours.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <Zap className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-1",
    },
    {
      title: "Built to Scale",
      description: "Your digital asset grows with your business. Handle 10 or 10,000 users without a rewrite.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <TrendingUp className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-1",
    },
    {
      title: "Made in Kenya",
      description: "Local understanding, global standards. We build solutions that work for the Kenyan market.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700" />,
      icon: <CheckCircle2 className="h-4 w-4 text-neutral-300" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] text-white antialiased bg-grid-white/[0.02]">
      {/* Hero Section - With Spotlight Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/10 via-transparent to-purple-950/10" />

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge with Aceternity-style button */}
            <div className="inline-block">
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(251,146,60,0.6)_0%,rgba(251,146,60,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1.5 px-4 ring-1 ring-white/10">
                  <div className="w-4 h-4 flex items-center justify-center relative">
                    <Image
                      src="/novyrix-logo.png"
                      alt="Made in Kenya"
                      width={16}
                      height={16}
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Sparkles className="w-2.5 h-2.5 text-orange-400 hidden" />
                  </div>
                  <span>Made in Kenya</span>
                  <span className="px-2 py-0.5 text-[10px] bg-orange-500/20 text-orange-400 rounded-full">Beta</span>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-orange-400/0 via-orange-400/90 to-orange-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </div>

            {/* Main Headline - More compact */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="block text-white">Transform Your</span>
              <span className="block bg-gradient-to-r from-primary-400 via-primary-300 to-purple-400 bg-clip-text text-transparent">
                Business Digitally
              </span>
            </h1>

            {/* Subheadline - More concise */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Custom web applications, workflow automation, and enterprise solutions.{" "}
              <span className="text-white font-semibold">Transparent pricing. No hidden fees.</span>{" "}
              Built for Kenyan businesses.
            </p>

            {/* AI Search Bar with Vanishing Placeholder */}
            <div className="max-w-2xl mx-auto">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={handlePlaceholderSubmit}
              />
            </div>

            {/* Trust Indicators - More minimal */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Instant Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Fixed Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>30+ Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Ticker */}
      <section className="py-10 bg-black border-y border-white/5">
        <div className="container mx-auto px-4 mb-6 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest">Powered by Modern Tech Stack</p>
        </div>
        <InfiniteMovingCards
          items={techStack}
          direction="right"
          speed="slow"
        />
      </section>

      {/* Services Section - Hover Effect */}
      <section className="py-24 bg-black bg-grid-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              What We <span className="text-primary-400">Build</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              End-to-end digital solutions tailored to your business needs.
            </p>
          </div>
          <HoverEffect items={services} />
        </div>
      </section>

      {/* Why Novyrix Section - Bento Grid */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-950/5 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Why Choose <span className="text-primary-400">Novyrix</span>?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We're not just developers. We're your strategic technology partners.
            </p>
          </div>

          <BentoGrid className="max-w-4xl mx-auto">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Pricing Section - Simple Cards */}
      <section className="py-24 bg-black bg-grid-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Transparent <span className="text-primary-400">Pricing</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              No hidden fees. Choose the package that fits your stage of growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "KES 35,000",
                desc: "Perfect for small businesses establishing a digital presence.",
                features: ["Custom Website (5 Pages)", "Mobile Responsive", "Contact Form", "Basic SEO", "1 Month Support"],
                highlight: false
              },
              {
                name: "Professional",
                price: "KES 75,000",
                desc: "For growing businesses needing dynamic features and automation.",
                features: ["Dynamic Web App", "CMS Integration", "User Authentication", "Database Setup", "3 Months Support"],
                highlight: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "Full-scale digital transformation for established organizations.",
                features: ["Custom Software Dev", "API Integrations", "Cloud Infrastructure", "SLA Support", "Dedicated Team"],
                highlight: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`relative rounded-2xl p-8 border ${plan.highlight ? 'border-primary-500 bg-primary-950/10' : 'border-white/10 bg-slate-900/20'} flex flex-col`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-black mb-4">{plan.price}</div>
                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-primary-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.highlight ? 'bg-primary-600 hover:bg-primary-700' : 'bg-white/10 hover:bg-white/20'}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - More minimal */}
      <section className="relative py-24 md:py-32 border-t border-slate-800 bg-black bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/10 via-black/50 to-purple-950/10" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-black">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                Digital Asset
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get an instant, transparent quote from Novy AI. No sales calls required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-consultant">
                <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-8 ring-1 ring-white/10">
                    <Sparkles className="w-4 h-4" />
                    <span>Get Instant Quote</span>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
              </Link>
              <Link href="/services">
                <button className="group cursor-pointer relative rounded-full p-px text-sm font-semibold leading-6 text-white inline-block border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-slate-900/50 py-3 px-8">
                    <span>Explore Services</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
