"use client";

import { useEffect, useRef, useState } from "react";

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({
  src,
  transcript,
  label,
}: {
  src?: string;
  transcript: string;
  label: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    const onErr = () => setMissing(true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, []);

  function toggle() {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      // Pause any other playing narration on the page.
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== a) el.pause();
      });
      a.play().then(() => setPlaying(true)).catch(() => setMissing(true));
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const a = ref.current;
    if (!a || !dur) return;
    a.currentTime = (Number(e.target.value) / 100) * dur;
  }

  const pct = dur ? (cur / dur) * 100 : 0;

  return (
    <div className="rounded-xl border border-line bg-ink-2/60 p-3">
      {src && <audio ref={ref} src={src} preload="none" />}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          disabled={!src || missing}
          aria-label={playing ? `Pause narration for ${label}` : `Play narration for ${label}`}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-saffron text-ink transition hover:bg-saffron-soft disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <rect x="1" y="1" width="4" height="12" rx="1" />
              <rect x="9" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <path d="M2 1.5 12 7 2 12.5Z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-mono tabular-nums">{fmt(cur)}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={pct}
              onChange={seek}
              disabled={!src || missing}
              aria-label={`Seek narration for ${label}`}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-line accent-saffron"
            />
            <span className="font-mono tabular-nums">{fmt(dur)}</span>
          </div>
          <p className="mt-1 truncate text-xs text-muted">
            {missing || !src
              ? "Narration coming soon — read the transcript below."
              : `Voice-over · ${label}`}
          </p>
        </div>
      </div>

      <details className="group mt-2">
        <summary className="cursor-pointer list-none text-xs font-medium text-saffron-soft [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Read transcript</span>
          <span className="hidden group-open:inline">Hide transcript</span>
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-muted">{transcript}</p>
      </details>
    </div>
  );
}
