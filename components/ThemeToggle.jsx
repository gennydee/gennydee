"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("gd-theme", next); } catch (e) {}
    setDark(!dark);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light" : "Switch to dark"}
      title={dark ? "Switch to light" : "Switch to dark"}
      onClick={toggle}
      className="relative -m-2 inline-flex h-7 w-14 cursor-pointer items-center rounded-[14px] border px-1 transition-colors"
      style={{
        borderColor: "rgb(var(--ink-rgb) / 0.35)",
        color: "rgb(var(--ink-rgb) / 0.6)",
      }}
    >
      <span aria-hidden className="absolute left-1.5 top-1/2 -mt-1.5 opacity-55">
        <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
          <path d="M15 11.4A6.4 6.4 0 0 1 6.6 3a6.6 6.6 0 1 0 8.4 8.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
      <span aria-hidden className="absolute right-1.5 top-1/2 -mt-1.5 opacity-55">
        <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 1.6v1.6" /><path d="M9 14.8v1.6" /><path d="M1.6 9h1.6" /><path d="M14.8 9h1.6" />
            <path d="M3.8 3.8l1.1 1.1" /><path d="M13.1 13.1l1.1 1.1" /><path d="M14.2 3.8l-1.1 1.1" /><path d="M4.9 13.1l-1.1 1.1" />
          </g>
        </svg>
      </span>
      <span
        aria-hidden
        className="relative z-10 block h-5 w-5 rounded-full"
        style={{
          background: "var(--ink)",
          transform: dark ? "translateX(26px)" : "translateX(0)",
          transition: "transform 240ms cubic-bezier(0.2,0.8,0.2,1)",
        }}
      />
    </button>
  );
}
