'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import { Icon } from '@/components/Icons';
import { domains, trlLevels, type DomainId } from '@/lib/data';

const stages = ['Account', 'Identity', 'Credentials', 'Domain review', 'Submit'];

function ageFrom(dob: string): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age;
}

export default function MentorApply() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  const [employer, setEmployer] = useState('');
  const [role, setRole] = useState('');
  const [years, setYears] = useState(5);
  const [picked, setPicked] = useState<DomainId[]>([]);
  const [lo, setLo] = useState(3);
  const [hi, setHi] = useState(7);

  const [slot, setSlot] = useState('');
  const [defence, setDefence] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const age = ageFrom(dob);
  const underage = age !== null && age < 18;

  const valid = useMemo(() => {
    if (step === 0) return name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && age !== null && age >= 18;
    if (step === 1) return true;
    if (step === 2) return employer.trim().length > 1 && role.trim().length > 1 && picked.length > 0 && lo <= hi;
    if (step === 3) return slot !== '';
    return agree1 && agree2;
  }, [step, name, email, age, employer, role, picked, lo, hi, slot, agree1, agree2]);

  if (done) {
    return (
      <AppShell role="mentor" title="Mentor workspace / Verification">
        <div className="card" style={{ maxWidth: 720 }}>
          <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
            <span className="pill pill--ok">Application submitted</span>
            <h1 style={{ fontSize: '2rem' }}>Thank you, we have your application</h1>
            <p className="muted">Your profile goes live only after all four checks are complete. You can follow each stage from your workspace.</p>
            <ol className="stepper">
              <li className="is-done">Application</li>
              <li className="is-current">Identity</li>
              <li>Credentials</li>
              <li>Domain review</li>
              <li>Decision</li>
            </ol>
            <Link href="/mentor" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>Go to mentor workspace</Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell role="mentor" title="Mentor workspace / Verification">
      <div className="page-head">
        <div className="stack" style={{ ['--gap' as string]: '6px' }}>
          <h1>Apply to mentor</h1>
          <p className="muted measure">Not everyone can become a mentor. We check who you are, what you have done, and how well you know your domain. Applicants must be 18 or over.</p>
        </div>
      </div>

      <ol className="stepper" aria-label="Application progress">
        {stages.map((s, i) => (
          <li key={s} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}><span>{s}</span></li>
        ))}
      </ol>

      <div className="card" style={{ maxWidth: 820 }}>
        <div className="card__body stack" style={{ ['--gap' as string]: '22px' }}>
          {step === 0 && (
            <>
              <h2 style={{ fontSize: '1.4rem' }}>Create your account</h2>
              <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                <div className="field"><label className="label" htmlFor="name">Full name</label><input className="input" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></div>
                <div className="field"><label className="label" htmlFor="email">Email address</label><input className="input" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></div>
                <div className="field"><label className="label" htmlFor="phone">Mobile number</label><input className="input" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" /><span className="hint">We send a one-time code to confirm it.</span></div>
                <div className="field">
                  <label className="label" htmlFor="dob">Date of birth</label>
                  <input className="input" id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} aria-invalid={underage} />
                  {underage ? <span className="hint" style={{ color: 'var(--crit)' }} role="alert">You must be 18 or over to mentor on InΦnity.</span> : <span className="hint">Used only to confirm you are 18 or over.</span>}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 style={{ fontSize: '1.4rem' }}>Verify your identity</h2>
              <p className="muted">A verification partner checks a government photo ID against a live selfie. InΦnity stores the result of the check, not a copy of your ID.</p>
              <div className="grid grid--2" style={{ ['--gap' as string]: '16px' }}>
                <div className="stack upload" style={{ ['--gap' as string]: '8px' }}><Icon name="user" /><span className="semibold small">Government photo ID</span><span className="xsmall muted">Passport, Aadhaar or driving licence</span><button type="button" className="btn btn--secondary btn--sm">Start identity check</button></div>
                <div className="stack upload" style={{ ['--gap' as string]: '8px' }}><Icon name="video" /><span className="semibold small">Live selfie</span><span className="xsmall muted">Takes about a minute</span><button type="button" className="btn btn--secondary btn--sm" disabled>Available after ID</button></div>
              </div>
              <div className="notice"><Icon name="lock" /><span>You can continue now and finish this check later. Your profile stays hidden until it is complete.</span></div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: '1.4rem' }}>Your professional background</h2>
              <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                <div className="field"><label className="label" htmlFor="employer">Current or most recent organisation</label><input className="input" id="employer" value={employer} onChange={(e) => setEmployer(e.target.value)} /></div>
                <div className="field"><label className="label" htmlFor="role">Role</label><input className="input" id="role" value={role} onChange={(e) => setRole(e.target.value)} /></div>
                <div className="field"><label className="label" htmlFor="years">Years in the field</label><input className="input" id="years" type="number" min={0} max={60} value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
              </div>
              <div className="field">
                <span className="label" id="dom">Domains you can mentor in</span>
                <div className="chips" role="group" aria-labelledby="dom">
                  {domains.map((d) => (
                    <button key={d.id} type="button" className={`chip ${picked.includes(d.id) ? 'chip--on' : ''}`} aria-pressed={picked.includes(d.id)} onClick={() => setPicked(picked.includes(d.id) ? picked.filter((x) => x !== d.id) : [...picked, d.id])}>{d.name}</button>
                  ))}
                </div>
                <span className="hint">You are reviewed only in the domains you pick.</span>
              </div>
              <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                <div className="field">
                  <label className="label" htmlFor="lo">Lowest readiness level you mentor</label>
                  <select className="select" id="lo" value={lo} onChange={(e) => setLo(Number(e.target.value))}>{trlLevels.map((l) => <option key={l.n} value={l.n}>TRL {l.n}: {l.short}</option>)}</select>
                </div>
                <div className="field">
                  <label className="label" htmlFor="hi">Highest readiness level you mentor</label>
                  <select className="select" id="hi" value={hi} onChange={(e) => setHi(Number(e.target.value))}>{trlLevels.map((l) => <option key={l.n} value={l.n}>TRL {l.n}: {l.short}</option>)}</select>
                  {lo > hi && <span className="hint" style={{ color: 'var(--crit)' }} role="alert">The highest level must not be lower than the lowest.</span>}
                </div>
              </div>
              <div className="stack upload" style={{ ['--gap' as string]: '8px' }}>
                <Icon name="upload" />
                <span className="semibold small">Evidence of experience</span>
                <span className="xsmall muted">Employment letter, degree certificate, publications or flight records. Do not upload classified or export-controlled material.</span>
                <input id="evidence" type="file" multiple aria-label="Upload evidence documents" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontSize: '1.4rem' }}>Book your domain review</h2>
              <p className="muted">A reviewer in your field holds a 30-minute technical conversation. It is how we confirm what your profile says.</p>
              <div className="field" style={{ maxWidth: 360 }}>
                <label className="label" htmlFor="slot">Preferred time</label>
                <select className="select" id="slot" value={slot} onChange={(e) => setSlot(e.target.value)}>
                  <option value="">Choose a slot</option>
                  <option>Sat 24 Oct 2026, 10:00 IST</option>
                  <option>Sat 24 Oct 2026, 15:00 IST</option>
                  <option>Sun 25 Oct 2026, 11:00 IST</option>
                  <option>Mon 26 Oct 2026, 18:00 IST</option>
                </select>
              </div>
              <label className="check">
                <input type="checkbox" checked={defence} onChange={(e) => setDefence(e.target.checked)} />
                <span>I am willing to be considered for defence-related projects. This adds a compliance review to my application.</span>
              </label>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={{ fontSize: '1.4rem' }}>Review and submit</h2>
              <dl className="kv">
                <dt>Name</dt><dd>{name}</dd>
                <dt>Email</dt><dd>{email}</dd>
                <dt>Organisation</dt><dd>{employer}, {role}</dd>
                <dt>Experience</dt><dd>{years} years</dd>
                <dt>Domains</dt><dd>{picked.length ? picked.map((d) => domains.find((x) => x.id === d)?.name).join(', ') : 'None'}</dd>
                <dt>Readiness</dt><dd>TRL {lo} to {hi}</dd>
                <dt>Review call</dt><dd>{slot}</dd>
                <dt>Defence projects</dt><dd>{defence ? 'Yes, compliance review added' : 'No'}</dd>
              </dl>
              <div className="stack" style={{ ['--gap' as string]: '12px' }}>
                <label className="check"><input type="checkbox" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} /><span>Everything above is accurate and I can provide evidence for it.</span></label>
                <label className="check"><input type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} /><span>I will guide and review student work. I will not do assessed work for students, and I will respect each team&apos;s ownership of its project.</span></label>
              </div>
            </>
          )}

          <hr className="rule" />
          <div className="row row--between">
            <button type="button" className="btn btn--secondary" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>
            {step < 4 ? (
              <button type="button" className="btn btn--primary" onClick={() => setStep(step + 1)} disabled={!valid}>Continue</button>
            ) : (
              <button type="button" className="btn btn--primary" onClick={() => setDone(true)} disabled={!valid}>Submit application</button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
