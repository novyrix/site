"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <Sun aria-hidden="true" weight="regular" />
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <Moon aria-hidden="true" weight="regular" />
    </button>
  );
}
