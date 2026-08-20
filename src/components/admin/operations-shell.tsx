import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { WorkspaceNavigation } from "@/components/workspace/workspace-navigation";

type OperationsShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  preview?: boolean;
  children: ReactNode;
};

export function OperationsShell({
  eyebrow,
  title,
  description,
  preview = false,
  children,
}: OperationsShellProps) {
  const previewQuery = preview ? "?preview=qa" : "";

  return (
    <main id="main-content" className="ops-page workspace-page">
      <div className="workspace-frame">
        <WorkspaceNavigation mode="operations" preview={preview} />
        <div className="workspace-main">
          <header className="workspace-masthead">
            <div className="workspace-masthead__copy">
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div className="workspace-masthead__actions">
              <span className="mono">{preview ? "Local fixture" : "Private control plane"}</span>
              <Link href={`/admin/leads${previewQuery}`} className="button button--primary">
                Review inquiries <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/" target="_blank" className="workspace-public-link">
                Public site <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </header>
          <div className="workspace-content">{children}</div>
        </div>
      </div>
    </main>
  );
}
