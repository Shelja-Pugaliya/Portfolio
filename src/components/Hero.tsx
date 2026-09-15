import Image from "next/image";
import { profile } from "@/content/profile";
import { journey } from "@/content/journey";

// Feathered oval mask so the illustration dissolves into the dark background
// on every edge — softest toward the left where it meets the text.
const blendMask =
  "radial-gradient(78% 82% at 78% 46%, #000 34%, rgba(0,0,0,0.55) 58%, transparent 76%)";

export default function Hero() {
  const places = journey.map((c) => c.place).join("  →  ");
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center overflow-hidden px-5 py-24"
    >
      {/* ambient illustration filling the empty right side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] opacity-90 md:block lg:w-[58%]"
        style={{ maskImage: blendMask, WebkitMaskImage: blendMask }}
      >
        <Image
          src="/images/hero-intro.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 60vw, 0px"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-saffron">
          {profile.location}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-paper sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-xl whitespace-pre-line text-base italic text-paper/80 md:text-lg">
          {profile.tagline}
        </p>

        <p className="mt-8 font-mono text-sm text-muted">{places}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#journey"
            className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-saffron-soft"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <path d="M2 1.5 12 7 2 12.5Z" />
            </svg>
            Start the journey
          </a>
          <a
            href="#work"
            className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-medium text-paper transition hover:border-saffron hover:text-saffron"
          >
            Skip to the work
          </a>
        </div>

        <div className="mt-10 flex gap-5 text-sm text-muted">
          <a href={profile.links.github} className="hover:text-paper" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.links.linkedin} className="hover:text-paper" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.emailHref} className="hover:text-paper">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
