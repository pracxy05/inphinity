import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TrlScale from '@/components/TrlScale';
import { Icon } from '@/components/Icons';
import { getMentor, mentors, domainName } from '@/lib/data';

export function generateStaticParams() {
  return mentors.map((m) => ({ id: m.id }));
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const slots = ['Morning', 'Afternoon', 'Evening'];

const formatText: Record<string, string> = {
  'Hourly session': 'Book single sessions when you need a review or a second opinion.',
  'Monthly package': 'A set cadence of sessions with notes and action items between them.',
  'Fixed-price milestone': 'Agree a deliverable, such as a design review, and pay when it is accepted.',
};

export default async function MentorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = getMentor(id);
  if (!m) notFound();

  const checks = [
    { label: 'Identity', ok: m.verified.identity },
    { label: 'Credentials', ok: m.verified.credentials },
    { label: 'Domain review', ok: m.verified.domainReview },
    { label: 'Background and conflict check', ok: m.verified.background },
  ];

  return (
    <>
      <SiteHeader />
      <main className="section section--fog" style={{ paddingBlock: 'clamp(28px, 4vw, 48px)' }}>
        <div className="container stack" style={{ ['--gap' as string]: '28px' }}>
          <Link href="/mentors" className="link small" style={{ alignSelf: 'flex-start' }}>All mentors</Link>

          <div className="card">
            <div className="card__body row row--top" style={{ ['--gap' as string]: '24px' }}>
              <div className="avatar avatar--lg">{m.initials}</div>
              <div className="stack grow" style={{ ['--gap' as string]: '10px' }}>
                <h1 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)' }}>{m.name}</h1>
                <p className="semibold">{m.title}</p>
                <div className="tags">
                  {m.domains.map((d) => <span key={d} className="tag tag--solid">{domainName(d)}</span>)}
                  {m.defenceCleared && <span className="tag"><Icon name="defence" />&nbsp;Cleared for defence-related projects</span>}
                </div>
              </div>
              <div className="row" style={{ ['--gap' as string]: '10px' }}>
                <Link href="/session/demo" className="btn btn--secondary">Book 15-minute intro</Link>
                <Link href="/student/new" className="btn btn--primary">Request mentorship</Link>
              </div>
            </div>
          </div>

          <div className="dash">
            <div className="stack" style={{ ['--gap' as string]: '24px' }}>
              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>About</h2></div>
                <div className="card__body stack" style={{ ['--gap' as string]: '14px' }}>
                  <p>{m.bio}</p>
                  <p className="muted">{m.background}</p>
                  <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                    <span className="small semibold">Topics</span>
                    <div className="tags">{m.topics.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                  </div>
                </div>
              </section>

              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Readiness levels covered</h2><span className="mono small">TRL {m.trl[0]} to {m.trl[1]}</span></div>
                <div className="card__body"><TrlScale range={m.trl} /></div>
              </section>

              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Engagement formats</h2><span className="pill pill--neutral">Rate card tier {m.tier}</span></div>
                <div className="card__body grid grid--3" style={{ ['--gap' as string]: '16px' }}>
                  {m.formats.map((f) => (
                    <div key={f} className="stack" style={{ ['--gap' as string]: '6px', padding: 16, border: '1px solid var(--line)', borderRadius: 4 }}>
                      <h4 style={{ fontFamily: 'var(--sans)', fontWeight: 600 }}>{f}</h4>
                      <p className="small muted">{formatText[f]}</p>
                    </div>
                  ))}
                </div>
                <div className="card__foot small muted">Rates are set by InΦnity and appear here once the rate card is published. You always see the rate before you confirm.</div>
              </section>

              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Typical availability</h2><span className="small muted">{m.timezone}</span></div>
                <div className="card__body" style={{ overflowX: 'auto' }}>
                  <div className="avail" style={{ minWidth: 460 }} role="table" aria-label="Weekly availability">
                    <div />
                    {days.map((d) => <div key={d} className="h">{d}</div>)}
                    {slots.map((s, r) => (
                      <div key={s} style={{ display: 'contents' }}>
                        <div className="r">{s}</div>
                        {days.map((d, c) => <div key={d} className={m.grid[r][c] ? 'on' : 'off'} title={`${d} ${s.toLowerCase()}: ${m.grid[r][c] ? 'available' : 'unavailable'}`} />)}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <aside className="stack" style={{ ['--gap' as string]: '24px' }}>
              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Verification</h2></div>
                <div className="card__body stack" style={{ ['--gap' as string]: '12px' }}>
                  {checks.map((c) => (
                    <div key={c.label} className="row row--between">
                      <span className="small">{c.label}</span>
                      <span className={`pill ${c.ok ? 'pill--ok' : 'pill--warn'}`}>{c.ok ? 'Verified' : 'Pending'}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="card">
                <div className="card__body">
                  <dl className="kv small">
                    <dt>Experience</dt><dd>{m.years} years</dd>
                    <dt>Languages</dt><dd>{m.languages.join(', ')}</dd>
                    <dt>Availability</dt><dd>{m.availability}</dd>
                    <dt>Time zone</dt><dd>{m.timezone}</dd>
                  </dl>
                </div>
              </section>
              <div className="notice">
                <Icon name="info" />
                <span>Mentors give guidance and review. Your project and its ownership stay with you.</span>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
