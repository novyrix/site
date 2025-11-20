"use client";

import * as React from "react";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Sparkles, FileText, Phone, Calculator, Info } from "lucide-react";

export function Navigation() {
  const links = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-neutral-300" />,
      href: "/",
    },
    {
      title: "Services",
      icon: <FileText className="h-full w-full text-neutral-300" />,
      href: "/services",
    },
    {
      title: "Calculators",
      icon: <Calculator className="h-full w-full text-neutral-300" />,
      href: "/calculators",
    },
    {
      title: "AI Consultant",
      icon: (
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src="/novyrix-logo.png"
            alt="Novy AI"
            width={24}
            height={24}
            className="object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <Sparkles className="h-full w-full text-orange-400 hidden" />
        </div>
      ),
      href: "/ai-consultant",
    },
    {
      title: "About",
      icon: <Info className="h-full w-full text-neutral-300" />,
      href: "/about",
    },
    {
      title: "Contact",
      icon: <Phone className="h-full w-full text-neutral-300" />,
      href: "/contact",
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
}
