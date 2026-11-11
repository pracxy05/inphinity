'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import TrlScale from '@/components/TrlScale';
import StatusPill from '@/components/StatusPill';
import { Icon } from '@/components/Icons';
import { requests, domainName, fmtDate, projects } from '@/lib/data';

const tabs = ['Recommended', 'New', 'Applied'] as const;

export default function MentorHome() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Recommended');
  const list = useMemo(() => requests.filter((r) => r.tab === tab), [tab]);

  const engagements = projects.filter((p) => p.mentorId === 'rhea-kulkarni' || p.mentorId === 'kavya-reddy');

  return (
    <AppShell role="mentor" title="Mentor workspace / Overview">
      <div className="page-head">
        <div className="stack" style={{ ['--gap' as string]: '6px' }}>
          <h1>Good evening, Rhea</h1>
          <p className="muted">Tuesday 13 October 2026</p>
        </div>
        <span className="pill pill--ok">Verified mentor</span>
      </div>

      <div className="card">
        <div className="grid grid--3" style={{ ['--gap' as string]: '0' }}>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}>
            <span className="stat__v">{requests.filter((r) => r.tab !== 'Applied').length}</span>
            <span className="stat__l">Requests matching your domains</span>
          </div>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}>
            <span className="stat__v">{engagements.length}</span>
            <span className="stat__l">Active engagements</span>
          </div>
          <div className="stat">
            <span className="stat__v">Sat 10:00</span>
            <span className="stat__l">Next session, 17 Oct 2026</span>
          </div>
        </div>
      </div>

      <div className="dash">
        <div className="stack" style={{ ['--gap' as string]: '24px' }}>
          <section className="card">
            <div className="card__head">
              <h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Mission requests</h2>
              <div className="seg" role="group" aria-label="Request filter">
                {tabs.map((t) => (
                  <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              {list.map((r, i) => (
                <div key={r.id} className="card__body stack" style={{ ['--gap' as string]: '14px', borderTop: i ? '1px solid var(--line)' : 0 }}>
                  <div className="row row--between row--top">
                    <div className="stack" style={{ ['--gap' as string]: '4px', minWidth: 0 }}>
                      <span className="mono xsmall muted">{r.mission}</span>
                      <h3 style={{ fontSize: '1.1rem' }}>{r.title}</h3>
                      <span className="small muted">{domainName(r.domain)} · team of {r.team} · <abbr title="Planned date of completion">PDC</abbr> {fmtDate(r.pdc)}</span>
                    </div>
                    <span className="pill pill--ok">{r.match}% fit</span>
                  </div>
                  <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                    <div className="stack" style={{ ['--gap' as string]: '6px' }}>
                      <span className="xsmall muted">Readiness: TRL {r.trl}</span>
                      <TrlScale value={r.trl} compact />
                    </div>
                    <div className="stack" style={{ ['--gap' as string]: '2px' }}>
                      <span className="xsmall muted">Help wanted</span>
                      <span className="small">{r.needs}</span>
                    </div>
                  </div>
                  <div className="row" style={{ ['--gap' as string]: '8px' }}>
                    {tab === 'Applied' ? (
                      <button type="button" className="btn btn--secondary btn--sm">Withdraw proposal</button>
                    ) : (
                      <>
                        <button type="button" className="btn btn--primary btn--sm">Send proposal</button>
                        <button type="button" className="btn btn--secondary btn--sm">View details</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Active engagements</h2></div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Mission</th><th>Domain</th><th>Status</th><th><abbr title="Planned date of completion">PDC</abbr></th><th /></tr>
                </thead>
                <tbody>
                  {engagements.map((p) => (
                    <tr key={p.id}>
                      <td><div className="semibold">{p.title}</div><div className="mono xsmall muted">{p.mission}</div></td>
                      <td className="small">{domainName(p.domain)}</td>
                      <td><StatusPill status={p.status} /></td>
                      <td className="mono small">{fmtDate(p.pdc)}</td>
                      <td><Link href="/session/demo" className="btn btn--secondary btn--sm">Session room</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="stack" style={{ ['--gap' as string]: '24px' }}>
          <section className="card">
            <div className="card__head"><h2 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Your verification</h2><Link href="/mentor/apply" className="link small">Review</Link></div>
            <div className="card__body stack" style={{ ['--gap' as string]: '12px' }}>
              {['Identity', 'Credentials', 'Domain review', 'Background and conflict check'].map((c) => (
                <div key={c} className="row row--between"><span className="small">{c}</span><StatusPill status="Verified" /></div>
              ))}
              <div className="row row--between"><span className="small">Defence clearance</span><StatusPill status="Pending" /></div>
            </div>
          </section>

          <section className="card">
            <div className="card__head"><h2 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Earnings and payouts</h2></div>
            <div className="card__body stack" style={{ ['--gap' as string]: '12px' }}>
              <p className="small muted">Rates follow the InΦnity rate card. Earnings and payout history appear here once rates are published.</p>
              <div className="notice"><Icon name="info" /><span>Add and verify a payout account before your first engagement starts.</span></div>
              <button type="button" className="btn btn--secondary btn--sm" style={{ alignSelf: 'flex-start' }}>Add payout account</button>
            </div>
          </section>

          <section className="card">
            <div className="card__head"><h2 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Engagement formats</h2></div>
            <div className="card__body stack" style={{ ['--gap' as string]: '8px' }}>
              <div className="tags">
                <span className="tag">Hourly session</span>
                <span className="tag">Monthly package</span>
                <span className="tag">Fixed-price milestone</span>
              </div>
              <p className="xsmall muted">Rate card tier A applies to all three formats.</p>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
