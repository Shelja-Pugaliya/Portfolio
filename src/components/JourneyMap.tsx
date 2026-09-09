"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";
import { geoNaturalEarth1, geoPath, geoGraticule10, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import landTopo from "world-atlas/land-110m.json";
import type { Chapter } from "@/content/journey";

const W = 1000;
const H = 520;
const PAD = 26;

// world-atlas ships a TopoJSON topology; feature() gives us the land polygons.
const land = feature(
  landTopo as unknown as Parameters<typeof feature>[0],
  (landTopo as unknown as { objects: { land: object } }).objects.land as never,
) as unknown as FeatureCollection;

// Crop to the Ireland <-> India corridor so the journey fills the frame.
const REGION = {
  type: "Polygon" as const,
  coordinates: [[
    [-17, 61],
    [99, 61],
    [99, 3],
    [-17, 3],
    [-17, 61],
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
      return { dx: 13, nameY: 4, yearY: 19, anchor: "start" as const };
    case "w":
      return { dx: -13, nameY: 4, yearY: 19, anchor: "end" as const };
    case "n":
      return { dx: 0, nameY: -24, yearY: -10, anchor: "middle" as const };
    case "s":
      return { dx: 0, nameY: 24, yearY: 39, anchor: "middle" as const };
  }
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
  const { landD, gratD, routeD, pins } = useMemo(() => {
    const routePts: [number, number][] = [];
    for (let s = 0; s < chapters.length - 1; s++) {
      const interp = geoInterpolate(chapters[s].coords, chapters[s + 1].coords);
      const steps = 56;
      for (let i = s === 0 ? 0 : 1; i <= steps; i++) {
        routePts.push(project(interp(i / steps)) as [number, number]);
      }
    }
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
    };
  }, [chapters]);

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
    const path = guideRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const p = path.getPointAtLength(0);
    head.setAttribute("transform", `translate(${p.x} ${p.y})`);
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={`Map showing the route from ${chapters[0]?.place} to ${chapters.at(-1)?.place}`}
    >
      <rect width={W} height={H} fill="#141017" />
      <path d={gratD} fill="none" stroke="#2f2925" strokeWidth="0.6" opacity="0.55" />
      <path d={landD} fill="#2b2621" stroke="#4a4137" strokeWidth="0.7" />

      {/* faint full-route guide (also drives the travelling head) */}
      <path
        ref={guideRef}
        d={routeD}
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 7"
        opacity="0.55"
      />

      {/* route drawn with scroll progress */}
      <motion.path
        d={routeD}
        fill="none"
        stroke="var(--color-saffron)"
        strokeWidth="2.6"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />

      {/* travelling head */}
      <g ref={headRef}>
        <circle r="7" fill="var(--color-saffron)" opacity="0.25" />
        <circle r="3.4" fill="var(--color-saffron)" />
      </g>

      {/* stops */}
      {pins.map((p, i) => {
        const active = i === activeIndex;
        const visited = i <= activeIndex;
        return (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            {active && (
              <circle r="14" fill="none" stroke="var(--color-saffron)" strokeWidth="1.2">
                <animate attributeName="r" values="8;18;8" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={active ? 6 : 4}
              fill={visited ? "var(--color-saffron)" : "#141017"}
              stroke="var(--color-saffron)"
              strokeWidth="1.7"
            />
            <text
              x={p.dx}
              y={p.nameY}
              textAnchor={p.anchor}
              fontSize="16"
              fontFamily="var(--font-serif)"
              fill={active ? "var(--color-paper)" : "var(--color-muted)"}
              stroke="#141017"
              strokeWidth="3.5"
              paintOrder="stroke"
            >
              {p.place}
            </text>
            <text
              x={p.dx}
              y={p.yearY}
              textAnchor={p.anchor}
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              fill="var(--color-muted)"
              stroke="#141017"
              strokeWidth="3"
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
