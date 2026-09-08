"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";
import type { Chapter } from "@/content/journey";

function routeD(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const mx = (prev.x + cur.x) / 2;
    // lift the control point to bow the arc upward
    const my = (prev.y + cur.y) / 2 - Math.abs(cur.x - prev.x) * 0.18 - 20;
    d += ` Q ${mx} ${my} ${cur.x} ${cur.y}`;
  }
  return d;
}

export default function JourneyMap({
  chapters,
  progress,
  activeIndex,
}: {
  chapters: Chapter[];
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const pts = chapters.map((c) => c.map);
  const d = routeD(pts);
  const guideRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);

  useMotionValueEvent(progress, "change", (v) => {
    const path = guideRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    head.setAttribute("transform", `translate(${p.x} ${p.y})`);
  });

  useEffect(() => {
    // set initial head position
    const path = guideRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const p = path.getPointAtLength(0);
    head.setAttribute("transform", `translate(${p.x} ${p.y})`);
  }, []);

  return (
    <svg
      viewBox="0 0 1000 560"
      className="h-full w-full"
      role="img"
      aria-label={`Map of the journey from ${chapters[0]?.place} to ${chapters.at(-1)?.place}`}
    >
      <defs>
        <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#3a332c" />
        </pattern>
      </defs>

      <rect width="1000" height="560" fill="#17130f" />
      <rect width="1000" height="560" fill="url(#dots)" opacity="0.6" />

      {/* abstract landmasses */}
      <g fill="#2b2521" stroke="#4a3f35" strokeWidth="1.5">
        {/* Europe / Ireland */}
        <path d="M120 70 Q 220 40 320 80 Q 360 140 300 210 Q 220 250 160 210 Q 110 150 120 70 Z" />
        {/* Middle land bridge */}
        <path d="M330 150 Q 460 120 560 200 Q 600 260 520 300 Q 420 300 360 240 Q 320 200 330 150 Z" opacity="0.75" />
        {/* Indian subcontinent */}
        <path d="M600 210 Q 720 170 830 220 Q 860 300 780 420 Q 720 470 680 400 Q 610 320 600 210 Z" />
      </g>

      {/* faint full-route guide (also used for head-position math) */}
      <path
        ref={guideRef}
        d={d}
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 8"
        opacity="0.5"
      />

      {/* drawn route, tied to scroll progress */}
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-saffron)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 3"
        style={{ pathLength: progress }}
      />

      {/* travelling head */}
      <g ref={headRef}>
        <circle r="9" fill="var(--color-saffron)" opacity="0.25" />
        <circle r="4" fill="var(--color-saffron)" />
      </g>

      {/* stops */}
      {chapters.map((c, i) => {
        const active = i === activeIndex;
        const visited = i <= activeIndex;
        return (
          <g key={c.id} transform={`translate(${c.map.x} ${c.map.y})`}>
            {active && (
              <circle r="18" fill="none" stroke="var(--color-saffron)" strokeWidth="1.5">
                <animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={active ? 8 : 5.5}
              fill={visited ? "var(--color-saffron)" : "var(--color-ink)"}
              stroke="var(--color-saffron)"
              strokeWidth="2"
            />
            <text
              x={c.map.x > 500 ? 16 : -16}
              y="5"
              textAnchor={c.map.x > 500 ? "start" : "end"}
              fontSize="17"
              fontFamily="var(--font-serif)"
              fill={active ? "var(--color-paper)" : "var(--color-muted)"}
            >
              {c.place}
            </text>
            <text
              x={c.map.x > 500 ? 16 : -16}
              y="24"
              textAnchor={c.map.x > 500 ? "start" : "end"}
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="var(--color-muted)"
            >
              {c.years}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
