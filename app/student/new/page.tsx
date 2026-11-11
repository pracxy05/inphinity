'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import TrlScale from '@/components/TrlScale';
import { Icon } from '@/components/Icons';
import { domains, domainName, trlLevels, formatOptions, fmtDate, type DomainId } from '@/lib/data';

const needOptions = [
  'Architecture review', 'Design review preparation', 'Code and firmware review', 'Test planning', 'Simulation and analysis',
  'Hardware debugging', 'Regulatory and range safety guidance', 'Competition preparation',
];

const stepNames = ['Mission', 'Readiness', 'Support', 'Review'];

export default function NewMission() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState('Attitude determination for a 1U CubeSat');
  const [domain, setDomain] = useState<DomainId>('cubesat');
  const [summary, setSummary] = useState('We are building a magnetometer and gyroscope based attitude estimator for a 1U CubeSat and need to choose an estimation approach that fits a small flight computer.');
  const [trl, setTrl] = useState(3);
  const [team, setTeam] = useState(4);
  const [pdc, setPdc] = useState('2026-12-18');
  const [needs, setNeeds] = useState<string[]>(['Architecture review', 'Simulation and analysis']);
  const [formats, setFormats] = useState<string[]>(['Hourly session']);
  const [language, setLanguage] = useState('English');
  const [clearance, setClearance] = useState(false);
  const [d1, setD1] = useState(false);
  const [d2, setD2] = useState(false);
  const [d3, setD3] = useState(false);

  const isDefence = domain === 'defence';
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const valid = useMemo(() => {
    if (step === 0) return title.trim().length > 3 && summary.trim().length > 10;
    if (step === 1) return Boolean(pdc);
    if (step === 2) return needs.length > 0 && formats.length > 0;
    return d1 && d2 && d3 && (!isDefence || clearance);
  }, [step, title, summary, pdc, needs, formats, d1, d2, d3, clearance, isDefence]);

  if (submitted) {
    return (
      <AppShell role="student" title="Student workspace / New mission request">
        <div className="card" style={{ maxWidth: 720 }}>
          <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
            <span className="pill pill--ok">Request published</span>
            <h1 style={{ fontSize: '2rem' }}>Mission MSN-0200 is open for matching</h1>
            <p className="muted">
              {isDefence ? 'Because this is a defence-related project, it first goes through a compliance review. You will see its status on your overview.' : 'Verified mentors in your domain can now see your request. You can compare matches while you wait.'}
            </p>
            <dl className="kv">
              <dt>Mission</dt><dd>{title}</dd>
              <dt>Domain</dt><dd>{domainName(domain)}</dd>
              <dt>Readiness</dt><dd>TRL {trl}</dd>
              <dt><abbr title="Planned date of completion">PDC</abbr></dt><dd>{fmtDate(pdc)}</dd>
            </dl>
            <div className="row" style={{ ['--gap' as string]: '12px' }}>
              <Link href="/mentors" className="btn btn--primary">See matching mentors</Link>
              <Link href="/student" className="btn btn--secondary">Back to overview</Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell role="student" title="Student workspace / New mission request">
      <div className="page-head">
        <div className="stack" style={{ ['--gap' as string]: '6px' }}>
          <h1>New mission request</h1>
          <p className="muted measure">Describe the project so mentors can see whether they can help. You can edit it until you publish.</p>
        </div>
      </div>

      <ol className="stepper" aria-label="Progress">
        {stepNames.map((n, i) => (
          <li key={n} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}>
            <span>{n}</span>
          </li>
        ))}
      </ol>

      <div className="dash">
        <div className="card">
          <div className="card__body stack" style={{ ['--gap' as string]: '22px' }}>
            {step === 0 && (
              <>
                <h2 style={{ fontSize: '1.4rem' }}>What are you building?</h2>
                <div className="field">
                  <label className="label" htmlFor="title">Mission title</label>
                  <input className="input" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="field">
                  <span className="label" id="domain-label">Domain</span>
                  <div className="chips" role="group" aria-labelledby="domain-label">
                    {domains.map((d) => (
                      <button key={d.id} type="button" className={`chip ${domain === d.id ? 'chip--on' : ''}`} aria-pressed={domain === d.id} onClick={() => setDomain(d.id)}>
                        {d.name}
                      </button>
                    ))}
                  </div>
                </div>
                {isDefence && (
                  <div className="notice notice--warn">
                    <Icon name="alert" />
                    <span>Defence and dual-use projects need a compliance review before mentors can see them. Do not describe classified or export-controlled details here.</span>
                  </div>
                )}
                <div className="field">
                  <label className="label" htmlFor="summary">What problem are you solving?</label>
                  <textarea className="textarea" id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
                  <span className="hint">Describe the goal and where you are stuck. Mentors see this text.</span>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 style={{ fontSize: '1.4rem' }}>Where is the project today?</h2>
                <div className="field">
                  <label className="label" htmlFor="trl">Technology readiness level: {trl}</label>
                  <input className="range" id="trl" type="range" min={1} max={9} step={1} value={trl} onChange={(e) => setTrl(Number(e.target.value))} />
                  <TrlScale value={trl} />
                  <span className="hint">TRL {trl}: {trlLevels[trl - 1].long}</span>
                </div>
                <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                  <div className="field">
                    <label className="label" htmlFor="team">Team size</label>
                    <input className="input" id="team" type="number" min={1} max={50} value={team} onChange={(e) => setTeam(Number(e.target.value))} />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="pdc">Planned date of completion (PDC)</label>
                    <input className="input" id="pdc" type="date" value={pdc} onChange={(e) => setPdc(e.target.value)} />
                    <span className="hint">We show your status against this date.</span>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 style={{ fontSize: '1.4rem' }}>What help do you need?</h2>
                <div className="field">
                  <span className="label" id="needs-label">Support needed</span>
                  <div className="chips" role="group" aria-labelledby="needs-label">
                    {needOptions.map((n) => (
                      <button key={n} type="button" className={`chip ${needs.includes(n) ? 'chip--on' : ''}`} aria-pressed={needs.includes(n)} onClick={() => toggle(needs, setNeeds, n)}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <span className="label" id="format-label">Engagement format</span>
                  <div className="stack" style={{ ['--gap' as string]: '10px' }} role="group" aria-labelledby="format-label">
                    {formatOptions.map((f) => (
                      <label key={f} className="check">
                        <input type="checkbox" checked={formats.includes(f)} onChange={() => toggle(formats, setFormats, f)} />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                  <span className="hint">Rates follow the InΦnity rate card. You see the rate before you confirm anything.</span>
                </div>
                <div className="field" style={{ maxWidth: 320 }}>
                  <label className="label" htmlFor="language">Preferred language</label>
                  <select className="select" id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    {['English', 'Hindi', 'Telugu', 'Marathi', 'Kannada', 'Malayalam'].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 style={{ fontSize: '1.4rem' }}>Confirm and publish</h2>
                <div className="stack" style={{ ['--gap' as string]: '14px' }}>
                  <label className="check">
                    <input type="checkbox" checked={d1} onChange={(e) => setD1(e.target.checked)} />
                    <span>I own this project or have the right to describe it, and I am 18 or over.</span>
                  </label>
                  <label className="check">
                    <input type="checkbox" checked={d2} onChange={(e) => setD2(e.target.checked)} />
                    <span>I will not upload classified or export-controlled material to InΦnity.</span>
                  </label>
                  <label className="check">
                    <input type="checkbox" checked={d3} onChange={(e) => setD3(e.target.checked)} />
                    <span>Mentors will guide and review my work. They will not do assessed work for me.</span>
                  </label>
                  {isDefence && (
                    <label className="check">
                      <input type="checkbox" checked={clearance} onChange={(e) => setClearance(e.target.checked)} />
                      <span>I understand this defence-related project needs a compliance review and a cleared mentor.</span>
                    </label>
                  )}
                </div>
                <div className="notice">
                  <Icon name="info" />
                  <span>You keep ownership of your project. Any special terms for mentors are shown to both sides before an engagement starts.</span>
                </div>
              </>
            )}

            <hr className="rule" />
            <div className="row row--between">
              <button type="button" className="btn btn--secondary" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>
              {step < 3 ? (
                <button type="button" className="btn btn--primary" onClick={() => setStep(step + 1)} disabled={!valid}>Continue</button>
              ) : (
                <button type="button" className="btn btn--primary" onClick={() => setSubmitted(true)} disabled={!valid}>Publish request</button>
              )}
            </div>
          </div>
        </div>

        <aside className="card card--fog" aria-label="Request summary">
          <div className="card__head"><h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Your request</h3><span className="mono xsmall muted">Draft</span></div>
          <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
            <div className="stack" style={{ ['--gap' as string]: '4px' }}>
              <span className="semibold">{title || 'Untitled mission'}</span>
              <span className="small muted">{domainName(domain)}</span>
            </div>
            <div className="stack" style={{ ['--gap' as string]: '6px' }}>
              <span className="small semibold">Readiness: TRL {trl}</span>
              <TrlScale value={trl} compact />
            </div>
            <dl className="kv small">
              <dt>Team</dt><dd>{team} {team === 1 ? 'person' : 'people'}</dd>
              <dt><abbr title="Planned date of completion">PDC</abbr></dt><dd>{pdc ? fmtDate(pdc) : 'Not set'}</dd>
              <dt>Formats</dt><dd>{formats.length ? formats.join(', ') : 'None selected'}</dd>
              <dt>Language</dt><dd>{language}</dd>
            </dl>
            <div className="tags">{needs.map((n) => <span key={n} className="tag">{n}</span>)}</div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
