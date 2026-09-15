"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValueEvent, useSpring } from "motion/react";
import { geoNaturalEarth1, geoPath, geoGraticule10, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import landTopo from "world-atlas/land-110m.json";
import type { Chapter } from "@/content/journey";

const W = 1000;
const H = 1200;
const PAD = 38;

// world-atlas ships a TopoJSON topology; feature() gives us the land polygons.
const land = feature(
  landTopo as unknown as Parameters<typeof feature>[0],
  (landTopo as unknown as { objects: { land: object } }).objects.land as never,
) as unknown as FeatureCollection;

// Crop to the Ireland <-> India corridor so the journey fills the frame.
const REGION = {
  type: "Polygon" as const,
  coordinates: [[
    [-30, 72],
    [114, 72],
    [114, -10],
    [-30, -10],
    [-30, 72],
  ]],
};

const projection = geoNaturalEarth1().fitExtent(
  [
    [PAD, PAD],
    [W - PAD, H - PAD],
  ],
  REGION,
);
const pathGen = geoPath(projection);
const project = (c: [number, number]) => projection(c) ?? [0, 0];

type LabelDir = Chapter["label"];
function labelPlacement(dir: LabelDir) {
  switch (dir) {
    case "e":
      return { dx: 16, nameY: 6, yearY: 24, anchor: "start" as const };
    case "w":
      return { dx: -16, nameY: 6, yearY: 24, anchor: "end" as const };
    case "n":
      return { dx: 0, nameY: -26, yearY: -8, anchor: "middle" as const };
    case "s":
      return { dx: 0, nameY: 28, yearY: 46, anchor: "middle" as const };
  }
}

export default function JourneyMap({
  chapters,
  activeIndex,
}: {
  chapters: Chapter[];
  activeIndex: number;
}) {
  const { landD, gratD, routeD, pins, pinFractions } = useMemo(() => {
    const routePts: [number, number][] = [];
    // routePts index where each chapter's pin sits along the path.
    const pinIdx: number[] = [0];
    for (let s = 0; s < chapters.length - 1; s++) {
      const interp = geoInterpolate(chapters[s].coords, chapters[s + 1].coords);
      const steps = 56;
      for (let i = s === 0 ? 0 : 1; i <= steps; i++) {
        routePts.push(project(interp(i / steps)) as [number, number]);
      }
      pinIdx.push(routePts.length - 1);
    }

    // Cumulative arc length so each pin maps to a 0..1 fraction of the route
    // that matches pathLength / getPointAtLength (both arc-length based).
    const cum = [0];
    for (let i = 1; i < routePts.length; i++) {
      const [ax, ay] = routePts[i - 1];
      const [bx, by] = routePts[i];
      cum.push(cum[i - 1] + Math.hypot(bx - ax, by - ay));
    }
    const total = cum[cum.length - 1] || 1;

    return {
      landD: pathGen(land) ?? "",
      gratD: pathGen(geoGraticule10()) ?? "",
      routeD: routePts
        .map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
        .join(" "),
      pins: chapters.map((c) => {
        const [x, y] = project(c.coords);
        return { ...c, x, y, place: c.place, ...labelPlacement(c.label) };
      }),
      pinFractions: pinIdx.map((idx) => cum[idx] / total),
    };
  }, [chapters]);

  const guideRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);

  // Travel to the active chapter's pin and rest there — driven by which
  // chapter is in view, not by raw scroll, so the head parks on each city.
  const target = pinFractions[activeIndex] ?? 0;
  const drawn = useSpring(0, { stiffness: 80, damping: 20, mass: 0.7 });

  useEffect(() => {
    drawn.set(target);
  }, [target, drawn]);

  useMotionValueEvent(drawn, "change", (v) => {
    const path = guideRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    head.setAttribute("transform", `translate(${p.x} ${p.y})`);
  });

  useEffect(() => {
    const path = guideRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const p = path.getPointAtLength(drawn.get() * path.getTotalLength());
    head.setAttribute("transform", `translate(${p.x} ${p.y})`);
  }, [drawn]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`Map showing the route from ${chapters[0]?.place} to ${chapters.at(-1)?.place}`}
    >
      <rect width={W} height={H} fill="#141017" />
      <path d={gratD} fill="none" stroke="#2f2925" strokeWidth="0.9" opacity="0.5" />
      <path d={landD} fill="#2b2621" stroke="#4a4137" strokeWidth="0.9" />

      {/* faint full-route guide (also drives the travelling head) */}
      <path
        ref={guideRef}
        d={routeD}
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="2 8"
        opacity="0.55"
      />

      {/* route drawn with scroll progress */}
      <motion.path
        d={routeD}
        fill="none"
        stroke="var(--color-saffron)"
        strokeWidth="3.4"
        strokeLinecap="round"
        style={{ pathLength: drawn }}
      />

      {/* travelling head */}
      <g ref={headRef}>
        <circle r="9" fill="var(--color-saffron)" opacity="0.25" />
        <circle r="4.2" fill="var(--color-saffron)" />
      </g>

      {/* stops */}
      {pins.map((p, i) => {
        const active = i === activeIndex;
        const visited = i <= activeIndex;
        return (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            {active && (
              <circle r="18" fill="none" stroke="var(--color-saffron)" strokeWidth="1.6">
                <animate attributeName="r" values="11;26;11" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={active ? 8 : 5.5}
              fill={visited ? "var(--color-saffron)" : "#141017"}
              stroke="var(--color-saffron)"
              strokeWidth="2.2"
            />
            <text
              x={p.dx}
              y={p.nameY}
              textAnchor={p.anchor}
              fontSize="24"
              fontFamily="var(--font-serif)"
              fill={active ? "var(--color-paper)" : "var(--color-muted)"}
              stroke="#141017"
              strokeWidth="4.5"
              paintOrder="stroke"
            >
              {p.place}
            </text>
            <text
              x={p.dx}
              y={p.yearY}
              textAnchor={p.anchor}
              fontSize="14"
              fontFamily="var(--font-mono)"
              fill="var(--color-muted)"
              stroke="#141017"
              strokeWidth="3.5"
              paintOrder="stroke"
            >
              {p.years}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
