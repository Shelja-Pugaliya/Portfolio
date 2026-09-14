"use client";

import { useEffect } from "react";

/**
 * Decorative dotted backdrop for the whole site.
 *
 * Two identical dot grids sit behind every section: a resting one that is
 * barely visible, and a warmer one revealed only inside a soft radial mask
 * that follows the pointer. All the work happens in CSS — this component
 * only publishes the pointer position as --mx / --my (throttled to one
 * write per frame). Plain grid, no spotlight, on touch or reduced motion.
 */
export default function DotField() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
      root.style.setProperty("--dot-glow", "1");
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => root.style.setProperty("--dot-glow", "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--dot-glow");
    };
  }, []);

  return <div aria-hidden className="dot-field" />;
}
