"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";
import { journey } from "@/content/journey";
import JourneyMap from "./JourneyMap";
import Chapter from "./Chapter";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 75%"],
  });

  // Track the chapter nearest the viewport middle with a plain observer.
  useEffect(() => {
    const sections = journey
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.chapter);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const current = journey[active];

  return (
    <section id="journey" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
          The Journey
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-paper md:text-4xl">
        From a first computer in Guwahati to the pipelines I design today.
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Scroll through, or press play on any chapter to hear it. Nothing autoplays.
      </p>

      {/* mobile progress bar */}
      <div className="sticky top-0 z-40 -mx-5 mt-8 border-y border-line bg-ink/90 px-5 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="font-serif text-base text-paper">{current.place}</span>
          <span className="font-mono text-muted">{current.years}</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {journey.map((c, i) => (
            <span
              key={c.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= active ? "bg-saffron" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <div ref={ref} className="mt-10 md:grid md:grid-cols-[1fr_1.05fr] md:gap-12">
        {/* sticky map (desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-24 aspect-[5/6] max-h-[calc(100vh-8rem)] w-full overflow-hidden rounded-2xl border border-line bg-[#141017]">
            <JourneyMap chapters={journey} progress={scrollYProgress} activeIndex={active} />
          </div>
        </div>

        {/* chapters */}
        <div>
          {journey.map((c, i) => (
            <Chapter key={c.id} chapter={c} index={i} total={journey.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
