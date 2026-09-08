import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">Contact</span>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-paper md:text-4xl">
          Open to Software Engineer, DevOps and Platform roles in Ireland.
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-saffron-soft"
          >
            {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-paper transition hover:border-saffron hover:text-saffron"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-paper transition hover:border-saffron hover:text-saffron"
          >
            GitHub
          </a>
          <a
            href={profile.cvPath}
            className="rounded-full border border-line px-5 py-2.5 text-sm text-paper transition hover:border-saffron hover:text-saffron"
          >
            Download CV
          </a>
        </div>

        <p className="mt-16 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
