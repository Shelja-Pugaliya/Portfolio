"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Chapter photo that cross-slides through a set of images every 3 seconds.
 * Falls back to a single static image when only one source is given.
 */
export default function ChapterSlideshow({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 3000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-line bg-ink-2">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src) => (
          <div key={src} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`size-1.5 rounded-full transition ${
                i === index ? "bg-saffron" : "bg-paper/40 hover:bg-paper/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
