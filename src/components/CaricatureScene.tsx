import type { Chapter } from "@/content/journey";

const ink2 = "var(--color-ink-2)";
const ink3 = "var(--color-ink-3)";
const line = "var(--color-line)";
const saffron = "var(--color-saffron)";
const saffronSoft = "var(--color-saffron-soft)";
const terracotta = "var(--color-terracotta)";
const muted = "var(--color-muted)";

function Guwahati() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Illustration: hills above a river, with an early home computer in the foreground">
      <rect width="400" height="300" fill={ink2} />
      <circle cx="312" cy="66" r="30" fill={saffron} opacity="0.9" />
      {/* hills */}
      <path d="M0 168 Q 70 120 150 156 T 400 140 V300 H0 Z" fill={ink3} />
      <path d="M0 196 Q 110 150 220 190 T 400 178 V300 H0 Z" fill={line} opacity="0.7" />
      {/* river */}
      <path d="M0 232 Q 120 214 200 236 T 400 226 V262 Q 260 250 190 268 T 0 262 Z" fill={terracotta} opacity="0.55" />
      {/* desk */}
      <rect x="60" y="250" width="280" height="10" fill={line} />
      {/* CRT computer */}
      <rect x="150" y="196" width="100" height="72" rx="6" fill={ink3} stroke={line} strokeWidth="2" />
      <rect x="162" y="206" width="76" height="46" rx="3" fill={saffronSoft} opacity="0.85" />
      <rect x="170" y="214" width="40" height="4" rx="2" fill={ink2} />
      <rect x="170" y="224" width="52" height="4" rx="2" fill={ink2} />
      <rect x="170" y="234" width="30" height="4" rx="2" fill={ink2} />
      <rect x="182" y="268" width="36" height="8" fill={line} />
    </svg>
  );
}

function Bangalore() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Illustration: a city skyline with a quadcopter drone and a badminton shuttle in flight">
      <rect width="400" height="300" fill={ink2} />
      {/* skyline */}
      <g fill={ink3}>
        <rect x="20" y="150" width="44" height="150" />
        <rect x="76" y="110" width="38" height="190" />
        <rect x="126" y="170" width="50" height="130" />
        <rect x="252" y="132" width="40" height="168" />
        <rect x="300" y="98" width="46" height="202" />
        <rect x="356" y="160" width="30" height="140" />
      </g>
      <g fill={saffronSoft} opacity="0.8">
        <rect x="86" y="126" width="6" height="6" />
        <rect x="98" y="126" width="6" height="6" />
        <rect x="86" y="142" width="6" height="6" />
        <rect x="312" y="116" width="6" height="6" />
        <rect x="324" y="116" width="6" height="6" />
        <rect x="312" y="134" width="6" height="6" />
      </g>
      {/* shuttlecock arc */}
      <path d="M40 250 Q 150 60 250 150" fill="none" stroke={muted} strokeWidth="2" strokeDasharray="3 7" opacity="0.6" />
      <g transform="translate(250 150) rotate(35)">
        <path d="M0 0 L-10 -22 L10 -22 Z" fill={saffronSoft} />
        <circle cx="0" cy="2" r="7" fill={saffron} />
      </g>
      {/* drone */}
      <g transform="translate(150 96)" stroke={saffron} strokeWidth="3" fill="none">
        <line x1="-26" y1="-14" x2="26" y2="14" />
        <line x1="-26" y1="14" x2="26" y2="-14" />
        <ellipse cx="-26" cy="-14" rx="12" ry="4" />
        <ellipse cx="26" cy="-14" rx="12" ry="4" />
        <ellipse cx="-26" cy="14" rx="12" ry="4" />
        <ellipse cx="26" cy="14" rx="12" ry="4" />
        <rect x="-9" y="-7" width="18" height="14" rx="3" fill={ink3} />
      </g>
    </svg>
  );
}

function Ireland() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Illustration: a coastal cliff and sea with a surfboard in the sand and a golf flag">
      <rect width="400" height="300" fill={ink2} />
      {/* drizzle */}
      <g stroke={line} strokeWidth="2" opacity="0.5">
        <line x1="60" y1="20" x2="52" y2="44" />
        <line x1="120" y1="10" x2="112" y2="34" />
        <line x1="300" y1="16" x2="292" y2="40" />
        <line x1="350" y1="30" x2="342" y2="54" />
      </g>
      {/* sea */}
      <rect x="0" y="150" width="400" height="150" fill={ink3} />
      <g stroke={terracotta} strokeWidth="3" fill="none" opacity="0.5">
        <path d="M0 172 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" />
        <path d="M0 196 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" opacity="0.6" />
      </g>
      {/* cliff */}
      <path d="M0 150 L120 150 L150 200 L120 300 L0 300 Z" fill={line} />
      <path d="M0 150 L120 150 L128 170 L0 190 Z" fill={saffron} opacity="0.35" />
      {/* golf flag on the cliff */}
      <line x1="60" y1="150" x2="60" y2="104" stroke={muted} strokeWidth="3" />
      <path d="M60 104 L92 114 L60 124 Z" fill={saffron} />
      <ellipse cx="60" cy="150" rx="10" ry="4" fill={ink2} />
      {/* surfboard in the sand */}
      <rect x="250" y="150" width="150" height="16" fill="#b9a288" opacity="0.5" />
      <g transform="translate(300 150) rotate(-18)">
        <path d="M0 0 C -14 -6 -14 -74 0 -92 C 14 -74 14 -6 0 0 Z" fill={saffronSoft} />
        <line x1="0" y1="-84" x2="0" y2="-8" stroke={terracotta} strokeWidth="2" />
      </g>
    </svg>
  );
}

const scenes: Record<Chapter["scene"], () => React.ReactElement> = {
  guwahati: Guwahati,
  bangalore: Bangalore,
  ireland: Ireland,
};

export default function CaricatureScene({ scene }: { scene: Chapter["scene"] }) {
  const Scene = scenes[scene];
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-2">
      <Scene />
    </div>
  );
}
