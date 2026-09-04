"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A link whose label scrambles on hover: characters cycle through random
 * glyphs and resolve left to right. The pixel face is monospaced, so the
 * label holds its width the whole way and nothing around it shifts.
 *
 * The true text stays in the accessible name; only the visual span animates.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/\\<>*+=-";

// Spaces keep the word rhythm readable mid-scramble, and the arrows are the
// link's affordance rather than part of the label. Both stay put.
const KEEP = new Set([" ", "→", "←", "↗", "↘"]);

export default function ScrambleLink({ href, text, className = "", ...rest }) {
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);

  useEffect(() => setDisplay(text), [text]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const start = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    cancelAnimationFrame(raf.current);

    const chars = [...text];
    // Milliseconds, not frame counts: a 120Hz display would otherwise run the
    // whole thing at double speed. Each character settles a beat after the one
    // before it, so the label resolves as a wipe rather than all at once.
    const revealAt = chars.map((_, i) => 60 + i * 26);
    const total = revealAt[revealAt.length - 1] + 80;
    const SWAP_MS = 33; // glyph churn, held to ~30fps so it reads as a flicker

    const t0 = performance.now();
    let lastSwap = -SWAP_MS;

    const tick = (now) => {
      const t = now - t0;
      if (t >= total) {
        setDisplay(text);
        return;
      }
      if (t - lastSwap >= SWAP_MS) {
        lastSwap = t;
        setDisplay(
          chars
            .map((c, i) =>
              KEEP.has(c) || t >= revealAt[i]
                ? c
                : GLYPHS[(Math.random() * GLYPHS.length) | 0]
            )
            .join("")
        );
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setDisplay(text);
  }, [text]);

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      aria-label={text}
      {...rest}
    >
      <span aria-hidden="true">{display}</span>
    </Link>
  );
}
