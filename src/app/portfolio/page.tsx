"use client";

import React from "react";
import Link from "next/link";
import { Globe, Code2, Zap, ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

export default function PortfolioPage() {
  const categories = [
    {
      title: "Web Development",
      description: "Responsive websites, web applications, and e-commerce platforms built with modern frameworks",
      icon: Globe,
      projectCount: 4,
      link: "/portfolio/web-development",
      examples: ["Afribit Africa", "Severius Adventures", "The Ronnie Fund"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Software Development",
      description: "Custom software solutions, plugins, and desktop applications tailored to your needs",
      icon: Code2,
      projectCount: 1,
      link: "/portfolio/software-development",
      examples: ["DPW JOSM Plugin", "Custom Desktop Apps"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Workflow Automation",
      description: "API integration, process automation, and seamless system synchronization",
      icon: Zap,
      projectCount: 1,
      link: "/portfolio/automation",
      examples: ["Spatial Collective Platform", "M-Pesa Integration"],
      color: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <div className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
            Our Portfolio
          </h1>
          <p className="mt-4 font-normal text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Explore our work organized by service category. Real solutions for real businesses across Kenya and beyond.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={idx}
                href={category.link}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl p-8 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 h-full">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} border border-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 text-primary-400" />
                    </div>

                    {/* Title & Project Count */}
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {category.projectCount} {category.projectCount === 1 ? 'Project' : 'Projects'}
                      </p>
                    </div>

                    <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Example Projects */}
                    <div className="pt-4 border-t border-white/10 mb-6">
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Featured Work</p>
                      <ul className="space-y-2">
                        {category.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary-400 font-medium text-sm group-hover:gap-3 transition-all">
                      View Projects
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-white/10">
          <p className="text-neutral-400 mb-6">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-black font-medium transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
