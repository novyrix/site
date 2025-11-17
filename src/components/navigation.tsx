"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/calculators", label: "Calculators" },
  { href: "/ai-consultant", label: "AI Consultant" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "navbar-blur border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-2xl font-display font-bold gradient-text">
                Novyrix
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    isActive
                      ? "text-primary-500 bg-primary-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/calculators">Get Quote</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/calculators">Get Quote</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden navbar-blur border-t border-white/10">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg font-medium transition-all duration-200",
                    isActive
                      ? "text-primary-500 bg-primary-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 space-y-3 border-t border-white/10">
              {session?.user ? (
                <>
                  <Button variant="ghost" size="md" className="w-full" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button size="md" className="w-full" asChild>
                    <Link href="/calculators">Get Quote</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="md" className="w-full" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="md" className="w-full" asChild>
                    <Link href="/calculators">Get Quote</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
