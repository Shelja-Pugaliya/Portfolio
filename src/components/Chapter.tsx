import Image from "next/image";
import type { Chapter as ChapterT } from "@/content/journey";
import AudioPlayer from "./AudioPlayer";

export default function Chapter({
  chapter,
  index,
  total,
}: {
  chapter: ChapterT;
  index: number;
  total: number;
}) {
  return (
    <section
      id={chapter.id}
      data-chapter={index}
      aria-label={`Chapter ${index + 1}: ${chapter.place}`}
      className="border-t border-line/60 py-16 first:border-t-0 first:pt-4 md:py-24"
    >
      <div className="reveal">
        <div className="flex items-baseline gap-3 font-mono text-xs text-muted">
          <span className="text-saffron">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span>{chapter.years}</span>
        </div>

        <h3 className="mt-2 font-serif text-4xl text-paper md:text-5xl">
          {chapter.place}
          <span className="ml-3 align-middle text-base text-muted">{chapter.region}</span>
        </h3>

        <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-line bg-ink-2">
          <Image
            src={chapter.image}
            alt={`${chapter.place}, ${chapter.region}`}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-paper/85 md:text-base">
          {chapter.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {chapter.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-line bg-ink-2 px-3 py-1 text-xs text-muted"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <AudioPlayer src={chapter.audioSrc} transcript={chapter.transcript} label={chapter.place} />
        </div>
      </div>
    </section>
  );
}
