"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PortalSignOut } from "@/components/portal/portal-sign-out";
import { ThemeToggle } from "@/components/site/theme-toggle";

const navigation = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/invoices", label: "Invoices" },
  { href: "/portal/messages", label: "Messages" },
];

export function PortalNavigation({ preview = false }: { preview?: boolean }) {
  const pathname = usePathname();
  const previewQuery = preview ? "?preview=qa" : "";

  function isActive(href: string) {
    if (href === "/portal") {
      return pathname === href || pathname.startsWith("/portal/project/");
    }
    return pathname.startsWith(href);
  }

  return (
    <div className="portal-navigation">
      <nav className="portal-nav" aria-label="Client portal navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={`${item.href}${previewQuery}`}
            className={isActive(item.href) ? "is-active" : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/" target="_blank" className="portal-public-site">
          Public site <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>

      <div className="portal-navigation__controls">
        <ThemeToggle />
        <PortalSignOut />
      </div>
    </div>
  );
}
