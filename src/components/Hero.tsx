import { profile } from "@/content/profile";
import { journey } from "@/content/journey";

export default function Hero() {
  const places = journey.map((c) => c.place).join("  →  ");
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 py-24"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-saffron">
        {profile.location}
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-paper sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-5 max-w-2xl whitespace-pre-line text-base italic text-paper/80 md:text-lg">
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
    </section>
  );
}
