'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import StatusPill from '@/components/StatusPill';
import { Icon, type IconName } from '@/components/Icons';
import { adminQueue, adminEvents, adminTransactions, adminCases, adminByDomain, domainName } from '@/lib/data';

type Section = 'Overview' | 'Verification' | 'Finance' | 'Security' | 'Support';

const sections: { id: Section; icon: IconName }[] = [
  { id: 'Overview', icon: 'chart' },
  { id: 'Verification', icon: 'defence' },
  { id: 'Finance', icon: 'list' },
  { id: 'Security', icon: 'lock' },
  { id: 'Support', icon: 'message' },
];

const access: Record<string, Section[]> = {
  'Operations lead': ['Overview', 'Support'],
  'Verification admin': ['Overview', 'Verification'],
  'Finance admin': ['Overview', 'Finance'],
  'Security admin': ['Overview', 'Security', 'Verification'],
  'Support agent': ['Overview', 'Support'],
};

const roleNote: Record<string, string> = {
  'Operations lead': 'Sees marketplace health and support cases. Cannot open verification documents or payment detail.',
  'Verification admin': 'Sees identity and credential records. Cannot see payment history.',
  'Finance admin': 'Sees amounts, fees and payouts. Cannot open identity documents.',
  'Security admin': 'Sees security events and verification audit trails. Cannot change payouts.',
  'Support agent': 'Sees cases with personal details masked. Cannot see documents or payments.',
};

const max = Math.max(...adminByDomain.map((d) => d.open));

export default function Admin() {
  const [role, setRole] = useState('Verification admin');
  const [section, setSection] = useState<Section>('Verification');

  const allowed = access[role];
  const current: Section = allowed.includes(section) ? section : 'Overview';

  const pick = (r: string) => {
    setRole(r);
    if (!access[r].includes(section)) setSection('Overview');
  };

  return (
    <AppShell role="admin" title="Admin console / Operations">
      <div className="page-head">
        <div className="stack" style={{ ['--gap' as string]: '6px' }}>
          <h1>Operations console</h1>
          <p className="muted measure">Every staff role sees only what its job needs. Switch roles to see how the console changes.</p>
        </div>
      </div>

      <div className="stack" style={{ ['--gap' as string]: '10px' }}>
        <span className="label" id="viewing">Viewing as</span>
        <div className="chips" role="group" aria-labelledby="viewing">
          {Object.keys(access).map((r) => (
            <button key={r} type="button" className={`chip ${role === r ? 'chip--on' : ''}`} aria-pressed={role === r} onClick={() => pick(r)}>{r}</button>
          ))}
        </div>
        <p className="small muted">{roleNote[role]}</p>
      </div>

      <div className="card">
        <div className="grid grid--4" style={{ ['--gap' as string]: '0' }}>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}><span className="stat__v">86</span><span className="stat__l">Verified mentors</span></div>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}><span className="stat__v">14</span><span className="stat__l">Applications in review</span></div>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}><span className="stat__v">215</span><span className="stat__l">Open mission requests</span></div>
          <div className="stat"><span className="stat__v">3</span><span className="stat__l">Open disputes, 1 past response time</span></div>
        </div>
      </div>

      <div className="admin">
        <nav className="stack" style={{ ['--gap' as string]: '6px' }} aria-label="Console sections">
          {sections.map((s) => {
            const can = allowed.includes(s.id);
            return (
              <button key={s.id} type="button" className="app__link" disabled={!can} aria-current={current === s.id ? 'page' : undefined} onClick={() => setSection(s.id)} style={{ width: '100%', background: current === s.id ? 'var(--ink)' : 'var(--paper)', color: current === s.id ? '#fff' : can ? 'var(--ink)' : 'var(--steel)', border: '1px solid var(--line)', cursor: can ? 'pointer' : 'not-allowed', justifyContent: 'space-between' }}>
                <span className="row" style={{ ['--gap' as string]: '12px', flexWrap: 'nowrap' }}><Icon name={s.icon} />{s.id}</span>
                {!can && <span className="xsmall">No access</span>}
              </button>
            );
          })}
        </nav>

        <div className="stack" style={{ ['--gap' as string]: '24px', minWidth: 0 }}>
          {current === 'Overview' && (
            <>
              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Open requests by domain</h2><span className="small muted">Sample data</span></div>
                <div className="card__body stack" style={{ ['--gap' as string]: '12px' }}>
                  {adminByDomain.map((d) => (
                    <div key={d.id} className="barrow">
                      <span className="small">{domainName(d.id)}</span>
                      <div className="bar" aria-hidden="true"><div className="bar__fill" style={{ width: `${(d.open / max) * 100}%` }} /></div>
                      <span className="mono small">{d.open}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="card">
                <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Platform health</h2></div>
                <div className="table-wrap">
                  <table className="table">
                    <thead><tr><th>Service</th><th>Measure</th><th>Status</th></tr></thead>
                    <tbody>
                      <tr><td className="semibold">Web and API</td><td className="mono small">p95 latency 182 ms</td><td><span className="pill pill--ok">Healthy</span></td></tr>
                      <tr><td className="semibold">Background jobs</td><td className="mono small">12 queued</td><td><span className="pill pill--ok">Healthy</span></td></tr>
                      <tr><td className="semibold">Payment webhooks</td><td className="mono small">1 retry pending</td><td><span className="pill pill--warn">Watch</span></td></tr>
                      <tr><td className="semibold">Video provider</td><td className="mono small">Not connected in prototype</td><td><span className="pill pill--neutral">Offline</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {current === 'Verification' && (
            <section className="card">
              <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Mentor verification queue</h2><span className="small muted">Oldest first</span></div>
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Applicant</th><th>Domain</th><th>Stage</th><th>Waiting</th><th>Status</th></tr></thead>
                  <tbody>
                    {adminQueue.map((r) => (
                      <tr key={r.name}>
                        <td className="semibold">{r.name}</td><td className="small">{r.domain}</td><td className="small">{r.stage}</td><td className="mono small">{r.waiting}</td>
                        <td><StatusPill status={r.status} tone={r.status === 'Overdue' ? 'crit' : undefined} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card__foot small muted">Defence and dual-use applicants also pass a compliance review before approval.</div>
            </section>
          )}

          {current === 'Finance' && (
            <section className="card">
              <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Recent transactions</h2><span className="small muted">Amounts hidden until the rate card is published</span></div>
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Reference</th><th>Format</th><th>Amount</th><th>State</th></tr></thead>
                  <tbody>
                    {adminTransactions.map((t) => (
                      <tr key={t.ref}><td className="mono small">{t.ref}</td><td className="small">{t.kind}</td><td className="mono small muted">Not set</td><td><StatusPill status={t.state} /></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {current === 'Security' && (
            <section className="card">
              <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Security events</h2><span className="small muted">Last 24 hours</span></div>
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Event</th><th>Who</th><th>Result</th></tr></thead>
                  <tbody>
                    {adminEvents.map((e) => (
                      <tr key={e.event}><td className="semibold">{e.event}</td><td className="small">{e.who}</td><td><StatusPill status={e.result} tone={e.tone as 'ok' | 'warn' | 'crit'} /></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {current === 'Support' && (
            <section className="card">
              <div className="card__head"><h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--sans)' }}>Support cases</h2><span className="small muted">Personal details masked</span></div>
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Case</th><th>Engagement</th><th>Status</th></tr></thead>
                  <tbody>
                    {adminCases.map((c) => (
                      <tr key={c.ref}><td className="semibold">{c.subject}</td><td className="mono small">{c.ref}</td><td><StatusPill status={c.status} /></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </AppShell>
  );
}
