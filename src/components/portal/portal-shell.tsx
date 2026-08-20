import type { ReactNode } from "react";
import { WorkspaceNavigation } from "@/components/workspace/workspace-navigation";

type PortalShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  preview?: boolean;
  children: ReactNode;
};

export function PortalShell({
  eyebrow,
  title,
  description,
  preview = false,
  children,
}: PortalShellProps) {
  return (
    <main id="main-content" className="portal-page workspace-page">
      <div className="portal-aurora" aria-hidden="true" />
      <div className="workspace-frame">
        <WorkspaceNavigation mode="portal" preview={preview} />
        <div className="workspace-main">
          <header className="workspace-masthead portal-masthead">
            <div className="workspace-masthead__copy portal-masthead__copy">
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <aside className="workspace-masthead__status" aria-label="Workspace status">
              <span className="mono">{preview ? "Local fixture" : "Private workspace"}</span>
              <strong>Project records, decisions, and payments.</strong>
              <div>
                <span className="portal-signal-dot" aria-hidden="true" />
                <small>{preview ? "Safe preview mode" : "Authenticated access"}</small>
              </div>
            </aside>
          </header>
          <div className="workspace-content">{children}</div>
        </div>
      </div>
    </main>
  );
}
