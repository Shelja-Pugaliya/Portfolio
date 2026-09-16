import { projects, experience, skills } from "@/content/projects";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 pb-20 pt-6 md:pb-28 md:pt-8">
      <SectionLabel>Selected Work</SectionLabel>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="flex flex-col rounded-2xl border border-line bg-ink-2 p-6 transition hover:border-saffron/50"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif text-xl text-paper">{p.title}</h3>
              <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/75">{p.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <SectionLabel>Experience</SectionLabel>
        <div className="mt-8 space-y-8">
          {experience.map((e) => (
            <article key={`${e.org}-${e.title}`} className="grid gap-2 md:grid-cols-[200px_1fr] md:gap-8">
              <div>
                <p className="font-serif text-lg text-paper">{e.org}</p>
                <p className="text-sm text-muted">{e.title}</p>
                <p className="font-mono text-xs text-muted">{e.period}</p>
                <p className="font-mono text-xs text-muted">{e.location}</p>
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-paper/80">
                {e.points.map((pt, i) => (
                  <li key={i} className="relative pl-5">
                    <span className="absolute left-0 top-2 size-1.5 rounded-full bg-saffron" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionLabel>Toolbox</SectionLabel>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">{s.group}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-line bg-ink-2 px-2.5 py-0.5 text-xs text-paper/80"
                  >
                    {it}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
