import Link from 'next/link';

/** The Φ glyph: a circle with an axis through it. Reads as a planet and as the phi in InΦnity. */
export function PhiMark({ className, strokeWidth = 2.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 30" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <circle cx="12" cy="15" r="8.2" />
      <line x1="12" y1="1" x2="12" y2="29" />
    </svg>
  );
}

export default function Logo({ invert = false, small = false, href = '/' }: { invert?: boolean; small?: boolean; href?: string }) {
  const cls = ['logo', invert ? 'logo--invert' : '', small ? 'logo--sm' : ''].filter(Boolean).join(' ');
  return (
    <Link href={href} className={cls} aria-label="InΦnity home">
      <span aria-hidden="true">In</span>
      <PhiMark />
      <span aria-hidden="true">nity</span>
    </Link>
  );
}
