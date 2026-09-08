import { profile } from "@/content/profile";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-serif text-lg text-paper">
          {profile.name}
        </a>
        <div className="flex items-center gap-5 text-sm text-muted">
          <a href="#journey" className="hidden hover:text-paper sm:inline">
            Journey
          </a>
          <a href="#work" className="hidden hover:text-paper sm:inline">
            Work
          </a>
          <a href="#contact" className="hover:text-paper">
            Contact
          </a>
          <a
            href={profile.cvPath}
            className="rounded-full border border-line px-3 py-1 text-paper hover:border-saffron hover:text-saffron"
          >
            CV
          </a>
        </div>
      </nav>
    </header>
  );
}
