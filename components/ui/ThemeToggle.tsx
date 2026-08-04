"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "ayava-theme";

/**
 * Labeled "Dark / Light" segmented switch — the site's sole theme control.
 * Not a sun/moon icon by deliberate decision (see
 * docs/light-theme-application-map.md, Task 1). Updates localStorage (read
 * by the blocking init script in app/layout.tsx on next load) and flips
 * `<html data-theme>` immediately for instant feedback without reload.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // Mirrors the DOM attribute set server-side / by the blocking init script,
  // so this never causes a hydration mismatch flash.
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.dataset.theme === "light");
  }, []);

  function toggleTheme() {
    const next = isLight ? "dark" : "light";
    setIsLight(next === "light");
    if (next === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    window.localStorage.setItem(THEME_KEY, next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-[88px] shrink-0 items-center rounded-full border border-hairline bg-transparent transition-colors duration-200 ease-out hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-[0.96] ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 h-[26px] w-[42px] rounded-full bg-surface-raise transition-transform duration-200 ease-out ${
          isLight ? "translate-x-[42px]" : "translate-x-0.5"
        }`}
      />
      <span
        data-active={!isLight}
        className="relative z-10 flex-1 text-center font-sans text-xs font-medium data-[active=true]:text-content data-[active=false]:text-content-muted"
      >
        Dark
      </span>
      <span
        data-active={isLight}
        className="relative z-10 flex-1 text-center font-sans text-xs font-medium data-[active=true]:text-content data-[active=false]:text-content-muted"
      >
        Light
      </span>
    </button>
  );
}
