"use client";

import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ThemeToggle } from "@/components/site/theme-toggle";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Notes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || !open) return;
    closeMenu();
    menuButtonRef.current?.focus();
  }

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="site-shell site-header__inner">
        <Link href="/" className="brand-lockup" aria-label="Novyrix home" onClick={closeMenu}>
          <Image src="/brand/novyrix-icon.svg" width={44} height={44} alt="" priority />
          <span>Novyrix</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "is-active" : undefined}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <Link href="/inquire" className="button button--primary desktop-cta">
            Start an inquiry
            <ArrowUpRight aria-hidden="true" weight="bold" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="site-shell" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              <span className="mono">{String(navItems.indexOf(item) + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav__theme">
            <span className="mono">Color theme</span>
            <ThemeToggle />
          </div>
          <Link href="/inquire" className="button button--primary" onClick={closeMenu}>
            Start an inquiry
            <ArrowUpRight aria-hidden="true" weight="bold" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
