/* An illustrated city for the courier tile, drawn like a delivery app's map. It
 * is not a real place. Streets sit on a grid that is tilted a few degrees; the
 * parcel's route is written in the same grid, so it always follows a road.
 * Colours are CSS variables, which is what gives it a night version. */

const TILT = (-14 * Math.PI) / 180;
const CX = 198;
const CY = 172;

const US = [-308, -252, -196, -140, -82, -20, 44, 104, 168, 226, 282, 340];
const VS = [-296, -238, -184, -128, -70, -14, 46, 104, 160, 220, 276, 334];

/** Grid position to board position. */
function at(u: number, v: number) {
  const c = Math.cos(TILT);
  const s = Math.sin(TILT);
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(CX + u * c - v * s), y: round(CY + u * s + v * c) };
}

/** A line through grid points with every corner rounded off, in board space. */
function roundedRoute(points: [number, number][], radius: number) {
  const p = points.map(([u, v]) => at(u, v));
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 1; i < p.length - 1; i++) {
    const toward = (a: { x: number; y: number }) => {
      const length = Math.hypot(a.x - p[i].x, a.y - p[i].y);
      const t = Math.min(radius, length / 2) / length;
      return `${(p[i].x + (a.x - p[i].x) * t).toFixed(2)} ${(p[i].y + (a.y - p[i].y) * t).toFixed(2)}`;
    };
    d += ` L ${toward(p[i - 1])} Q ${p[i].x} ${p[i].y} ${toward(p[i + 1])}`;
  }
  const end = p[p.length - 1];
  return `${d} L ${end.x} ${end.y}`;
}

const STOPS: [number, number][] = [
  [-140, 46],
  [-82, 46],
  [-82, -14],
  [44, -14],
  [44, -70],
  [128, -70],
];

export const ROUTE = roundedRoute(STOPS, 14);
export const SHOP = at(...STOPS[0]);
export const HOME = at(...STOPS[STOPS.length - 1]);

// Parks, as grid rectangles: no buildings are drawn inside them.
const PARKS = [
  { u: 104, v: -14, w: 122, h: 118 },
  { u: -252, v: -184, w: 112, h: 114 },
  { u: -82, v: 104, w: 62, h: 56 },
];

// The customer's building, just above the end of the route.
const TARGET = { u: 112, v: -118, w: 40, h: 40 };

/** The same small pseudo-random sequence every render, server and browser. */
function sequence(seed: number) {
  let state = seed;
  return () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
}

type Rect = { x: number; y: number; w: number; h: number; tall: boolean };

function buildings(): Rect[] {
  const next = sequence(20261126);
  const out: Rect[] = [];
  for (let i = 0; i < US.length - 1; i++) {
    for (let j = 0; j < VS.length - 1; j++) {
      const x = US[i] + 6;
      const y = VS[j] + 6;
      const w = US[i + 1] - US[i] - 12;
      const h = VS[j + 1] - VS[j] - 12;
      const parked = PARKS.some((p) => x < p.u + p.w && x + w > p.u && y < p.v + p.h && y + h > p.v);
      if (parked) continue;
      // Split each city block into a few buildings of uneven size.
      const cut = 0.38 + next() * 0.24;
      const wide = next() > 0.5;
      const halves = wide
        ? [
            { x, y, w: w * cut - 2, h },
            { x: x + w * cut + 2, y, w: w * (1 - cut) - 2, h },
          ]
        : [
            { x, y, w, h: h * cut - 2 },
            { x, y: y + h * cut + 2, w, h: h * (1 - cut) - 2 },
          ];
      for (const half of halves) {
        if (next() > 0.55) {
          const split = 0.4 + next() * 0.2;
          const sideways = half.w > half.h;
          out.push(
            sideways
              ? { ...half, w: half.w * split - 1.5, tall: next() > 0.72 }
              : { ...half, h: half.h * split - 1.5, tall: next() > 0.72 },
            sideways
              ? { x: half.x + half.w * split + 1.5, y: half.y, w: half.w * (1 - split) - 1.5, h: half.h, tall: false }
              : { x: half.x, y: half.y + half.h * split + 1.5, w: half.w, h: half.h * (1 - split) - 1.5, tall: false },
          );
        } else {
          out.push({ ...half, tall: next() > 0.72 });
        }
      }
    }
  }
  return out.map((r) => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.w.toFixed(1), h: +r.h.toFixed(1), tall: r.tall }));
}

function trees() {
  const next = sequence(7771);
  return PARKS.flatMap((p) =>
    Array.from({ length: Math.round((p.w * p.h) / 520) }, () => ({
      x: +(p.u + 12 + next() * (p.w - 24)).toFixed(1),
      y: +(p.v + 12 + next() * (p.h - 24)).toFixed(1),
      r: +(2.6 + next() * 2.4).toFixed(1),
    })),
  );
}

const BUILDINGS = buildings();
const TREES = trees();

const LAKE =
  "M -58 -330 C -22 -270 -66 -222 -48 -168 C -32 -122 -2 -112 -6 -66 C -10 -26 -62 -8 -58 40 C -54 90 -8 108 -12 160 C -16 214 -60 250 -40 340 L 6 340 C -4 262 30 230 28 164 C 26 108 -18 84 -16 42 C -14 4 30 -20 28 -68 C 26 -122 -8 -134 -14 -172 C -26 -226 16 -272 -18 -330 Z";

const MAJOR = [
  { d: "M -330 -14 L 360 -14", main: true },
  { d: "M 168 -320 L 168 350", main: true },
  { d: "M -330 160 L 360 160", main: false },
  { d: "M -196 -320 L -196 350", main: false },
];

const NAMES = {
  en: { lake: "Willow Lake", park: "Lake Park", avenue: "Central Avenue" },
  bn: { lake: "উইলো লেক", park: "লেক পার্ক", avenue: "সেন্ট্রাল অ্যাভিনিউ" },
};

/** Colours for day, with a night set under `.dark`. */
export const MAP_COLORS = [
  "[--land:#f1eee8] [--block:#e5e1da] [--tall:#dad5cc] [--street:#ffffff] [--casing:#d9d4cb]",
  "[--major:#ffffff] [--main:#ffe39a] [--main-edge:#e9c262] [--water:#a9d5f5] [--water-edge:#8fc4ec]",
  "[--park:#c8e9b4] [--tree:#a3d38d] [--name:#77716a] [--water-name:#3b7fae] [--park-name:#4e8a3a] [--halo:#f1eee8]",
  "dark:[--land:#1a1e25] dark:[--block:#232833] dark:[--tall:#2b3140] dark:[--street:#333a48] dark:[--casing:#12151a]",
  "dark:[--major:#444c5c] dark:[--main:#5d5846] dark:[--main-edge:#2c2a22] dark:[--water:#12354f] dark:[--water-edge:#1a4666]",
  "dark:[--park:#17352a] dark:[--tree:#214a38] dark:[--name:#98a0ae] dark:[--water-name:#6ba8d4] dark:[--park-name:#6fae86] dark:[--halo:#1a1e25]",
].join(" ");

export function CityMap({ bn }: { bn: boolean }) {
  const n = bn ? NAMES.bn : NAMES.en;
  const label = { fontSize: 9.5, fontWeight: 600, paintOrder: "stroke", strokeWidth: 3, strokeLinejoin: "round" } as const;

  return (
    <g>
      <rect x={-200} y={-120} width={800} height={640} fill="var(--land)" />
      <g transform={`translate(${CX} ${CY}) rotate(-14)`}>
        {BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={2.5} fill={b.tall ? "var(--tall)" : "var(--block)"} />
        ))}

        <g stroke="var(--street)" strokeWidth={6} strokeLinecap="round">
          {US.map((u) => (
            <path key={`u${u}`} d={`M ${u} -320 L ${u} 350`} />
          ))}
          {VS.map((v) => (
            <path key={`v${v}`} d={`M -330 ${v} L 360 ${v}`} />
          ))}
        </g>

        {PARKS.map((p) => (
          <rect key={p.u} x={p.u + 4} y={p.v + 4} width={p.w - 8} height={p.h - 8} rx={14} fill="var(--park)" />
        ))}
        {TREES.map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={t.r} fill="var(--tree)" />
        ))}
        <path d="M 112 78 C 140 40 162 96 196 62 S 214 18 222 6" stroke="var(--street)" strokeWidth={2.5} strokeDasharray="5 4" fill="none" />

        {/* Water cuts the side streets; the bigger roads cross it as bridges. */}
        <path d={LAKE} fill="var(--water)" stroke="var(--water-edge)" strokeWidth={1.5} />

        {MAJOR.map((road) => (
          <path key={`c${road.d}`} d={road.d} stroke={road.main ? "var(--main-edge)" : "var(--casing)"} strokeWidth={road.main ? 14 : 12} />
        ))}
        {MAJOR.map((road) => (
          <path key={road.d} d={road.d} stroke={road.main ? "var(--main)" : "var(--major)"} strokeWidth={road.main ? 11 : 9.5} />
        ))}

        {/* The streets the parcel takes over the water */}
        <path d="M -140 46 L 44 46 M -82 -70 L 168 -70" stroke="var(--casing)" strokeWidth={9} />
        <path d="M -140 46 L 44 46 M -82 -70 L 168 -70" stroke="var(--street)" strokeWidth={7} />

        <rect x={TARGET.u} y={TARGET.v} width={TARGET.w} height={TARGET.h} rx={5} fill="#ff5a36" fillOpacity={0.32} stroke="#ff5a36" strokeWidth={2} />

        <g stroke="var(--halo)" style={label}>
          <text transform="translate(-36 17) rotate(80)" textAnchor="middle" fill="var(--water-name)" stroke="var(--water)">
            {n.lake}
          </text>
          <text x={164} y={36} textAnchor="middle" fill="var(--park-name)" stroke="var(--park)">
            {n.park}
          </text>
          <text x={-126} y={-18} textAnchor="middle" fill="var(--name)" dy={-6}>
            {n.avenue}
          </text>
        </g>
      </g>
    </g>
  );
}
