'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import TrlScale from '@/components/TrlScale';
import { Icon } from '@/components/Icons';
import { domains, domainName, formatOptions, mentors, type DomainId } from '@/lib/data';

export default function MentorDirectory({ initialDomain }: { initialDomain?: DomainId }) {
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<DomainId[]>(initialDomain ? [initialDomain] : []);
  const [level, setLevel] = useState(0);
  const [formats, setFormats] = useState<string[]>([]);
  const [fullyVerified, setFullyVerified] = useState(false);
  const [defence, setDefence] = useState(false);
  const [sort, setSort] = useState<'experience' | 'name'>('experience');

  const toggle = <T,>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mentors
      .filter((m) => {
        if (q && !`${m.name} ${m.title} ${m.background} ${m.topics.join(' ')}`.toLowerCase().includes(q)) return false;
        if (picked.length && !picked.some((d) => m.domains.includes(d))) return false;
        if (level && !(m.trl[0] <= level && level <= m.trl[1])) return false;
        if (formats.length && !formats.every((f) => m.formats.includes(f))) return false;
        if (fullyVerified && !Object.values(m.verified).every(Boolean)) return false;
        if (defence && !m.defenceCleared) return false;
        return true;
      })
      .sort((a, b) => (sort === 'experience' ? b.years - a.years : a.name.localeCompare(b.name)));
  }, [query, picked, level, formats, fullyVerified, defence, sort]);

  const clear = () => {
    setQuery(''); setPicked([]); setLevel(0); setFormats([]); setFullyVerified(false); setDefence(false);
  };

  return (
    <div className="directory">
      <aside className="card directory__filters" aria-label="Filters">
        <div className="card__head">
          <h2 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Filters</h2>
          <button type="button" className="btn btn--ghost btn--sm" onClick={clear}>Clear all</button>
        </div>
        <div className="card__body stack" style={{ ['--gap' as string]: '22px' }}>
          <div className="field">
            <label className="label" htmlFor="q">Search</label>
            <input className="input" id="q" type="search" placeholder="Name, topic or background" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <fieldset className="fieldset">
            <legend className="label">Domain</legend>
            <div className="stack" style={{ ['--gap' as string]: '10px' }}>
              {domains.map((d) => (
                <label key={d.id} className="check">
                  <input type="checkbox" checked={picked.includes(d.id)} onChange={() => setPicked(toggle(picked, d.id))} />
                  <span>{d.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label className="label" htmlFor="level">Covers readiness level</label>
            <select className="select" id="level" value={level} onChange={(e) => setLevel(Number(e.target.value))}>
              <option value={0}>Any level</option>
              {Array.from({ length: 9 }).map((_, i) => <option key={i} value={i + 1}>TRL {i + 1}</option>)}
            </select>
          </div>

          <fieldset className="fieldset">
            <legend className="label">Engagement format</legend>
            <div className="stack" style={{ ['--gap' as string]: '10px' }}>
              {formatOptions.map((f) => (
                <label key={f} className="check">
                  <input type="checkbox" checked={formats.includes(f)} onChange={() => setFormats(toggle(formats, f))} />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="stack" style={{ ['--gap' as string]: '10px' }}>
            <label className="check">
              <input type="checkbox" checked={fullyVerified} onChange={(e) => setFullyVerified(e.target.checked)} />
              <span>All four checks complete</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={defence} onChange={(e) => setDefence(e.target.checked)} />
              <span>Cleared for defence-related projects</span>
            </label>
          </div>
        </div>
      </aside>

      <div className="stack" style={{ ['--gap' as string]: '16px' }}>
        <div className="row row--between">
          <p className="small" aria-live="polite"><b>{results.length}</b> {results.length === 1 ? 'mentor' : 'mentors'} match your filters</p>
          <div className="row" style={{ ['--gap' as string]: '8px' }}>
            <label className="small muted" htmlFor="sort">Sort by</label>
            <select className="select" id="sort" style={{ width: 'auto', minHeight: 36 }} value={sort} onChange={(e) => setSort(e.target.value as 'experience' | 'name')}>
              <option value="experience">Years of experience</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {results.map((m) => {
          const checks = Object.values(m.verified).filter(Boolean).length;
          return (
            <article key={m.id} className="card">
              <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
                <div className="row row--top" style={{ ['--gap' as string]: '16px', flexWrap: 'nowrap' }}>
                  <div className="avatar avatar--lg">{m.initials}</div>
                  <div className="stack grow" style={{ ['--gap' as string]: '4px' }}>
                    <div className="row row--between row--top">
                      <h3>{m.name}</h3>
                      <span className={`pill ${checks === 4 ? 'pill--ok' : 'pill--warn'}`}>{checks} of 4 checks</span>
                    </div>
                    <p className="small semibold">{m.title}</p>
                    <p className="small muted">{m.background}</p>
                  </div>
                </div>

                <div className="tags">
                  {m.domains.map((d) => <span key={d} className="tag tag--solid">{domainName(d)}</span>)}
                  {m.defenceCleared && <span className="tag"><Icon name="defence" />&nbsp;Defence cleared</span>}
                </div>

                <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                  <div className="stack" style={{ ['--gap' as string]: '6px' }}>
                    <span className="xsmall muted">Readiness covered: TRL {m.trl[0]} to {m.trl[1]}</span>
                    <TrlScale range={m.trl} compact />
                  </div>
                  <dl className="kv small">
                    <dt>Experience</dt><dd>{m.years} years</dd>
                    <dt>Languages</dt><dd>{m.languages.join(', ')}</dd>
                    <dt>Rate card</dt><dd>Tier {m.tier}</dd>
                  </dl>
                </div>
              </div>
              <div className="card__foot row row--between">
                <div className="tags">{m.formats.map((f) => <span key={f} className="tag">{f}</span>)}</div>
                <div className="row" style={{ ['--gap' as string]: '8px' }}>
                  <Link href={`/mentors/${m.id}`} className="btn btn--secondary btn--sm">View profile</Link>
                  <Link href="/student/new" className="btn btn--primary btn--sm">Request mentor</Link>
                </div>
              </div>
            </article>
          );
        })}

        {results.length === 0 && (
          <div className="card">
            <div className="card__body stack" style={{ ['--gap' as string]: '10px' }}>
              <h3>No mentors match all of these filters</h3>
              <p className="muted small">Remove a filter to see more mentors, or post a mission request and let verified mentors come to you.</p>
              <div className="row" style={{ ['--gap' as string]: '10px' }}>
                <button type="button" className="btn btn--secondary btn--sm" onClick={clear}>Clear all filters</button>
                <Link href="/student/new" className="btn btn--primary btn--sm">Post a mission request</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
