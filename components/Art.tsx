/* Technical line illustrations. Drawn in code so the app has no image downloads.
   Colours are literal hex values from the monochrome palette. */

const INK = '#12161b';
const SLATE = '#555d67';
const LINE = '#aab1b9';
const MIST = '#eaedef';
const FOG = '#f5f6f7';
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

type Pt = { x: number; y: number };

function orbitPoint(cx: number, cy: number, rx: number, ry: number, rotDeg: number, t: number): Pt {
  const r = (rotDeg * Math.PI) / 180;
  return {
    x: cx + rx * Math.cos(t) * Math.cos(r) - ry * Math.sin(t) * Math.sin(r),
    y: cy + rx * Math.cos(t) * Math.sin(r) + ry * Math.sin(t) * Math.cos(r),
  };
}

function Sat({ p, label, dx = 14, dy = -12, anchor = 'start' }: { p: Pt; label: string; dx?: number; dy?: number; anchor?: 'start' | 'end' }) {
  return (
    <g>
      <rect x={p.x - 5} y={p.y - 5} width="10" height="10" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <line x1={p.x} y1={p.y} x2={p.x + dx * 0.7} y2={p.y + dy * 0.7} stroke={INK} strokeWidth="1" />
      <text x={p.x + dx} y={p.y + dy} fontFamily={MONO} fontSize="11" fill={INK} textAnchor={anchor}>{label}</text>
    </g>
  );
}

/** Hero illustration: the Φ as a planet with its axis, and three orbits around it. */
export function OrbitHero() {
  const cx = 280;
  const cy = 280;
  const a = orbitPoint(cx, cy, 150, 62, -24, 0.9);
  const b = orbitPoint(cx, cy, 205, 96, 28, 3.6);
  const c = orbitPoint(cx, cy, 246, 150, -72, 5.3);
  return (
    <svg viewBox="0 0 560 560" role="img" aria-label="Diagram of three orbits around a planet drawn as the phi symbol">
      {/* degree ticks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const ang = (i * 10 * Math.PI) / 180;
        const major = i % 9 === 0;
        const r1 = 268;
        const r2 = major ? 256 : 262;
        return <line key={i} x1={cx + r1 * Math.cos(ang)} y1={cy + r1 * Math.sin(ang)} x2={cx + r2 * Math.cos(ang)} y2={cy + r2 * Math.sin(ang)} stroke={major ? INK : LINE} strokeWidth={major ? 1.4 : 1} />;
      })}
      <text x={cx} y="14" fontFamily={MONO} fontSize="10" fill={SLATE} textAnchor="middle">0°</text>
      <text x="548" y={cy + 4} fontFamily={MONO} fontSize="10" fill={SLATE} textAnchor="end">90°</text>
      <text x={cx} y="556" fontFamily={MONO} fontSize="10" fill={SLATE} textAnchor="middle">180°</text>
      <text x="12" y={cy + 4} fontFamily={MONO} fontSize="10" fill={SLATE}>270°</text>

      {/* orbits */}
      <ellipse cx={cx} cy={cy} rx="150" ry="62" transform={`rotate(-24 ${cx} ${cy})`} fill="none" stroke={INK} strokeWidth="1.2" />
      <ellipse cx={cx} cy={cy} rx="205" ry="96" transform={`rotate(28 ${cx} ${cy})`} fill="none" stroke={LINE} strokeWidth="1.2" />
      <ellipse cx={cx} cy={cy} rx="246" ry="150" transform={`rotate(-72 ${cx} ${cy})`} fill="none" stroke={LINE} strokeWidth="1.2" strokeDasharray="5 5" />

      {/* the Φ: planet and axis */}
      <circle cx={cx} cy={cy} r="64" fill="#ffffff" stroke={INK} strokeWidth="4" />
      <ellipse cx={cx} cy={cy} rx="64" ry="16" fill="none" stroke={LINE} strokeWidth="1" />
      <ellipse cx={cx} cy={cy} rx="30" ry="64" fill="none" stroke={LINE} strokeWidth="1" />
      <line x1={cx} y1={cy - 118} x2={cx} y2={cy + 118} stroke={INK} strokeWidth="4" />

      <Sat p={a} label="CubeSat, 550 km" dx={16} dy={-14} />
      <Sat p={b} label="Sun-synchronous, 97.6°" dx={-16} dy={22} anchor="end" />
      <Sat p={c} label="Ground station pass" dx={16} dy={20} />
    </svg>
  );
}

/** 1U CubeSat in isometric view. */
export function CubeSatDiagram() {
  const L = 70;
  const dx = L * 0.866;
  const dy = L * 0.5;
  const F = { x: 150, y: 176 };
  const R = { x: F.x + dx, y: F.y - dy };
  const Lb = { x: F.x - dx, y: F.y - dy };
  const Ft = { x: F.x, y: F.y - L };
  const Rt = { x: R.x, y: R.y - L };
  const Lt = { x: Lb.x, y: Lb.y - L };
  const Bt = { x: F.x, y: F.y - L - 2 * dy };
  const pts = (...p: Pt[]) => p.map((q) => `${q.x},${q.y}`).join(' ');
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label="Isometric drawing of a one-unit CubeSat">
      <polygon points={pts(Ft, Rt, Bt, Lt)} fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <polygon points={pts(Lb, F, Ft, Lt)} fill={FOG} stroke={INK} strokeWidth="1.8" />
      <polygon points={pts(F, R, Rt, Ft)} fill={MIST} stroke={INK} strokeWidth="1.8" />
      {/* solar cell grid on right face */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={F.x + dx * t} y1={F.y - dy * t} x2={F.x + dx * t} y2={F.y - dy * t - L} stroke={LINE} strokeWidth="1" />
      ))}
      {[0.33, 0.66].map((t) => (
        <line key={t} x1={F.x} y1={F.y - L * t} x2={R.x} y2={R.y - L * t} stroke={LINE} strokeWidth="1" />
      ))}
      {/* antenna */}
      <line x1={(Ft.x + Bt.x) / 2} y1={(Ft.y + Bt.y) / 2} x2={(Ft.x + Bt.x) / 2} y2="14" stroke={INK} strokeWidth="1.8" />
      <circle cx={(Ft.x + Bt.x) / 2} cy="14" r="3" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      {/* dimension */}
      <line x1={R.x + 14} y1={R.y} x2={R.x + 14} y2={Rt.y} stroke={SLATE} strokeWidth="1" />
      <line x1={R.x + 10} y1={R.y} x2={R.x + 18} y2={R.y} stroke={SLATE} strokeWidth="1" />
      <line x1={R.x + 10} y1={Rt.y} x2={R.x + 18} y2={Rt.y} stroke={SLATE} strokeWidth="1" />
      <text x={R.x + 24} y={(R.y + Rt.y) / 2 + 4} fontFamily={MONO} fontSize="11" fill={SLATE}>10 cm</text>
      <text x="14" y="30" fontFamily={MONO} fontSize="11" fill={INK}>Antenna</text>
      <line x1="62" y1="26" x2={(Ft.x + Bt.x) / 2 - 4} y2="16" stroke={LINE} strokeWidth="1" />
      <text x="14" y="206" fontFamily={MONO} fontSize="11" fill={SLATE}>Solar cells on +X face</text>
    </svg>
  );
}

/** CanSat envelope, side view with internal stack. */
export function CanSatDiagram() {
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label="Side view of a CanSat inside its standard envelope">
      <ellipse cx="160" cy="34" rx="46" ry="9" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <path d="M114 34v142c0 5 20.6 9 46 9s46-4 46-9V34" fill={FOG} stroke={INK} strokeWidth="1.8" />
      <path d="M114 34c0 5 20.6 9 46 9s46-4 46-9" fill="none" stroke={INK} strokeWidth="1.8" />
      {/* internal boards */}
      {[66, 104, 142].map((y) => (
        <rect key={y} x="126" y={y} width="68" height="14" fill="#ffffff" stroke={SLATE} strokeWidth="1.2" />
      ))}
      <text x="214" y="77" fontFamily={MONO} fontSize="11" fill={INK}>Radio</text>
      <text x="214" y="115" fontFamily={MONO} fontSize="11" fill={INK}>Sensors</text>
      <text x="214" y="153" fontFamily={MONO} fontSize="11" fill={INK}>Battery</text>
      <line x1="196" y1="73" x2="210" y2="73" stroke={LINE} strokeWidth="1" />
      <line x1="196" y1="111" x2="210" y2="111" stroke={LINE} strokeWidth="1" />
      <line x1="196" y1="149" x2="210" y2="149" stroke={LINE} strokeWidth="1" />
      {/* dimensions */}
      <line x1="92" y1="34" x2="92" y2="185" stroke={SLATE} strokeWidth="1" />
      <line x1="88" y1="34" x2="96" y2="34" stroke={SLATE} strokeWidth="1" />
      <line x1="88" y1="185" x2="96" y2="185" stroke={SLATE} strokeWidth="1" />
      <text x="84" y="116" fontFamily={MONO} fontSize="11" fill={SLATE} textAnchor="end">115 mm</text>
      <line x1="114" y1="204" x2="206" y2="204" stroke={SLATE} strokeWidth="1" />
      <line x1="114" y1="200" x2="114" y2="208" stroke={SLATE} strokeWidth="1" />
      <line x1="206" y1="200" x2="206" y2="208" stroke={SLATE} strokeWidth="1" />
      <text x="160" y="217" fontFamily={MONO} fontSize="11" fill={SLATE} textAnchor="middle">Ø 66 mm</text>
    </svg>
  );
}

/** Quadrotor, top view. */
export function UavDiagram() {
  const rotors = [
    { x: 84, y: 62 },
    { x: 236, y: 62 },
    { x: 84, y: 158 },
    { x: 236, y: 158 },
  ];
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label="Top view of a quadrotor drone">
      {rotors.map((r) => (
        <line key={`${r.x}-${r.y}`} x1="160" y1="110" x2={r.x} y2={r.y} stroke={INK} strokeWidth="3" />
      ))}
      {rotors.map((r, i) => (
        <g key={`r${r.x}-${r.y}`}>
          <circle cx={r.x} cy={r.y} r="36" fill="none" stroke={LINE} strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx={r.x} cy={r.y} r="5" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
          <line x1={r.x - 30} y1={r.y + (i % 2 ? 10 : -10)} x2={r.x + 30} y2={r.y + (i % 2 ? -10 : 10)} stroke={INK} strokeWidth="1.8" />
        </g>
      ))}
      <rect x="136" y="92" width="48" height="36" rx="5" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      <rect x="146" y="100" width="28" height="20" fill={FOG} stroke={SLATE} strokeWidth="1" />
      <path d="M160 84V68M154 74l6-6 6 6" fill="none" stroke={INK} strokeWidth="1.6" />
      <text x="170" y="76" fontFamily={MONO} fontSize="11" fill={INK}>Heading</text>
      <text x="14" y="212" fontFamily={MONO} fontSize="11" fill={SLATE}>4 × BLDC motor, flight controller on centre plate</text>
    </svg>
  );
}

/** Illustrative altitude profile of a sounding rocket. */
export function TrajectoryChart() {
  const x0 = 44;
  const x1 = 336;
  const yBase = 186;
  const H = 150;
  const at = (u: number): Pt => ({ x: x0 + (x1 - x0) * u, y: yBase - 4 * H * u * (1 - u) });
  const pts = Array.from({ length: 61 }).map((_, i) => at(i / 60));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const burnout = at(0.1);
  const apogee = at(0.5);
  const chute = at(0.78);
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="Illustrative altitude against time curve of a sounding rocket">
      <line x1={x0} y1="16" x2={x0} y2={yBase} stroke={SLATE} strokeWidth="1" />
      <line x1={x0} y1={yBase} x2={x1 + 6} y2={yBase} stroke={SLATE} strokeWidth="1" />
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={x0} y1={yBase - 160 * t} x2={x1} y2={yBase - 160 * t} stroke={MIST} strokeWidth="1" />
      ))}
      <path d={d} fill="none" stroke={INK} strokeWidth="2.2" />
      <path d={`${d} L${x1} ${yBase} L${x0} ${yBase} Z`} fill={INK} opacity="0.04" />
      {[burnout, apogee, chute].map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
      ))}
      <text x={burnout.x + 10} y={burnout.y + 14} fontFamily={MONO} fontSize="11" fill={INK}>Burnout</text>
      <text x={apogee.x} y={apogee.y - 12} fontFamily={MONO} fontSize="11" fill={INK} textAnchor="middle">Apogee</text>
      <text x={chute.x + 8} y={chute.y - 10} fontFamily={MONO} fontSize="11" fill={INK}>Recovery deploy</text>
      <text x="8" y="22" fontFamily={MONO} fontSize="10" fill={SLATE}>Altitude</text>
      <text x={x1 + 4} y={yBase + 14} fontFamily={MONO} fontSize="10" fill={SLATE} textAnchor="end">Time</text>
      <text x={x0 + 6} y={yBase + 14} fontFamily={MONO} fontSize="10" fill={SLATE}>Illustrative profile</text>
    </svg>
  );
}

/** Small abstract telemetry trace used on cards. */
export function Trace({ seed = 1 }: { seed?: number }) {
  const n = 40;
  const pts = Array.from({ length: n }).map((_, i) => {
    const y = 20 + 10 * Math.sin(i * 0.5 + seed) + 6 * Math.sin(i * 1.3 + seed * 2) + 3 * Math.sin(i * 2.7 + seed * 3);
    return `${i === 0 ? 'M' : 'L'}${(i * 300) / (n - 1)} ${y.toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 300 40" preserveAspectRatio="none" role="img" aria-label="Sample telemetry trace" style={{ width: '100%', height: 40 }}>
      <line x1="0" y1="20" x2="300" y2="20" stroke={MIST} strokeWidth="1" />
      <path d={pts.join(' ')} fill="none" stroke={INK} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
