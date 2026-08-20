"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemePreview() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme");
    if (requestedTheme === "light" || requestedTheme === "dark") setTheme(requestedTheme);
  }, [setTheme]);

  return null;
}
