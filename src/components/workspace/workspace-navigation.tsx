"use client";

import {
  ArrowSquareOut,
  ChatCircle,
  FileText,
  Gauge,
  SignOut,
  Users,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/site/theme-toggle";

type WorkspaceNavigationProps = {
  mode: "operations" | "portal";
  preview?: boolean;
};

const operationsItems = [
  { href: "/admin", label: "Overview", Icon: Gauge },
  { href: "/admin/leads", label: "Inquiries", Icon: Users },
];

const portalItems = [
  { href: "/portal", label: "Dashboard", Icon: Gauge },
  { href: "/portal/invoices", label: "Invoices", Icon: FileText },
  { href: "/portal/messages", label: "Messages", Icon: ChatCircle },
];

export function WorkspaceNavigation({ mode, preview = false }: WorkspaceNavigationProps) {
  const pathname = usePathname();
  const items = mode === "operations" ? operationsItems : portalItems;
  const previewQuery = preview ? "?preview=qa" : "";

  function isActive(href: string) {
    if (href === "/admin" || href === "/portal") {
      return pathname === href || (href === "/portal" && pathname.startsWith("/portal/project/"));
    }
    return pathname.startsWith(href);
  }

  return (
    <aside className="workspace-navigation">
      <Link href={`${items[0].href}${previewQuery}`} className="workspace-navigation__brand" aria-label="Novyrix workspace home">
        <Image src="/brand/novyrix-icon.svg" width={34} height={34} alt="" priority />
        <span>Novyrix</span>
      </Link>

      <div className="workspace-navigation__context mono">
        {mode === "operations" ? "Operations" : "Client workspace"}
      </div>

      <nav className="workspace-navigation__links" aria-label={`${mode === "operations" ? "Operations" : "Client portal"} navigation`}>
        {items.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={`${href}${previewQuery}`}
            className={isActive(href) ? "is-active" : undefined}
            aria-current={isActive(href) ? "page" : undefined}
          >
            <Icon aria-hidden="true" weight={isActive(href) ? "fill" : "regular"} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="workspace-navigation__footer">
        <Link href="/" target="_blank">
          <ArrowSquareOut aria-hidden="true" />
          <span>Public site</span>
        </Link>
        <div className="workspace-navigation__theme">
          <span className="mono">Theme</span>
          <ThemeToggle />
        </div>
        <button type="button" onClick={() => void signOut({ callbackUrl: "/" })}>
          <SignOut aria-hidden="true" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
