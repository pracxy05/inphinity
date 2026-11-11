import { trlLevels } from '@/lib/data';

type Props = {
  /** Highlight one level */
  value?: number;
  /** Shade a range of levels, for example a mentor's coverage */
  range?: [number, number];
  compact?: boolean;
  onInk?: boolean;
};

/** Technology Readiness Level scale, levels 1 to 9. */
export default function TrlScale({ value, range, compact = false, onInk = false }: Props) {
  const label = value
    ? `Technology readiness level ${value} of 9`
    : range
      ? `Technology readiness levels ${range[0]} to ${range[1]} of 9`
      : 'Technology readiness scale, levels 1 to 9';
  return (
    <div className={['trl', compact ? 'trl--compact' : '', onInk ? 'trl--on-ink' : ''].filter(Boolean).join(' ')} role="img" aria-label={label}>
      {trlLevels.map((l) => {
        const on = value === l.n;
        const inRange = range ? l.n >= range[0] && l.n <= range[1] : false;
        const cls = ['trl__cell', on || (inRange && compact) ? 'trl__cell--on' : '', inRange && !compact ? 'trl__cell--range' : ''].filter(Boolean).join(' ');
        return (
          <div key={l.n} className={cls} title={`TRL ${l.n}: ${l.long}`}>
            <b>{l.n}</b>
            <span>{l.short}</span>
          </div>
        );
      })}
    </div>
  );
}
