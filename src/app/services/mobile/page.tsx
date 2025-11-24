"use client";

import Link from "next/link";
import { ArrowLeft, Smartphone, Globe, Zap, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Native-Feeling <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">Mobile Apps</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8">
            Cross-platform mobile apps with React Native. One codebase for iOS and Android. Native performance, native feel.
          </p>
          <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
            Start Your Mobile App
          </Button>
        </div>
      </section>
    </div>
  );
}
