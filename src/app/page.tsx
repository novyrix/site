"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Search, Zap, Shield, Code2, TrendingUp, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { AIChatModal } from "@/components/ui/ai-chat-modal";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleQuoteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsChatOpen(true);
    }
  };

  const handlePlaceholderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChatOpen(true);
  };

  const placeholders = [
    "I need a custom e-commerce platform with M-Pesa...",
    "Build a staff management system with payroll...",
    "Create a booking website for my salon business...",
    "Help me automate my KRA eTIMS compliance...",
    "I want a portfolio website with a blog section...",
  ];

  const quickPrompts = [
    "I need an e-commerce website",
    "Help me automate payroll",
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
                      alt="Novy AI"
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
                  <span>Powered by Novy AI</span>
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

              {/* Quick Prompts - More subtle */}
              <div className="flex flex-wrap gap-2 justify-center mt-4 text-sm">
                <span className="text-gray-600">Try:</span>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(prompt);
                      setIsChatOpen(true);
                    }}
                    className="px-3 py-1 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-gray-400 hover:text-gray-300 transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Indicators - More minimal */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Instant AI Quotes</span>
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

      {/* Why Novyrix Section - Aceternity Card Style */}
      <section className="relative py-24 md:py-32 bg-black bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  Novyrix
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We're not a "website design" company. We're your strategic technology partner.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Radical Transparency",
                  description: "Every cost itemized. No hidden fees. Know exactly what you're paying for.",
                },
                {
                  icon: Code2,
                  title: "Custom Node.js Stack",
                  description: "Modern, scalable technology. Real engineering for real business value.",
                },
                {
                  icon: Zap,
                  title: "Fixed-Price Model",
                  description: "Know the total cost upfront. We're incentivized to be efficient.",
                },
                {
                  icon: TrendingUp,
                  title: "Built to Scale",
                  description: "Your digital asset grows with your business. Handle 10 or 10,000 users.",
                },
                {
                  icon: Sparkles,
                  title: "AI-Powered Quoting",
                  description: "Novy translates your goals into technical solutions instantly.",
                },
                {
                  icon: CheckCircle2,
                  title: "KRA eTIMS Experts",
                  description: "Compliance automation for Kenyan businesses. M-Pesa & API integrations.",
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-purple-500/0 to-primary-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                  <div className="relative space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-primary-500/20 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Minimalist */}
      <section className="relative py-24 md:py-32 bg-black bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary-500 text-primary-500" />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Trusted by Kenya's Growing Businesses
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                From funded startups to established SMEs, we've delivered 50+ custom solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "30+" },
                { label: "Code Lines", value: "500K+" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 rounded-xl bg-slate-900/30 border border-slate-800">
                  <div className="text-4xl font-black bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/ai-consultant">
                <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-8 ring-1 ring-white/10">
                    <span>Talk to Novy AI Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary-400/0 via-primary-400/90 to-primary-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
              </Link>
            </div>
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

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={searchQuery}
      />
    </main>
  );
}
