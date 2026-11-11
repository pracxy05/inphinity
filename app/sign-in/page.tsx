'use client';

import Link from 'next/link';
import { useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Icon } from '@/components/Icons';
import { OrbitHero } from '@/components/Art';

type Role = 'student' | 'mentor' | 'admin';

const roles: { id: Role; label: string; href: string }[] = [
  { id: 'student', label: 'Student', href: '/student' },
  { id: 'mentor', label: 'Mentor', href: '/mentor' },
  { id: 'admin', label: 'Staff', href: '/admin' },
];

export default function SignIn() {
  const [role, setRole] = useState<Role>('student');
  const target = roles.find((r) => r.id === role)!;

  return (
    <>
      <SiteHeader />
      <main className="section" style={{ paddingBlock: 'clamp(40px, 6vw, 80px)' }}>
        <div className="container split split--even">
          <div className="card" style={{ maxWidth: 520, width: '100%' }}>
            <div className="card__body stack" style={{ ['--gap' as string]: '20px' }}>
              <div className="stack" style={{ ['--gap' as string]: '6px' }}>
                <h1 style={{ fontSize: '2rem' }}>Sign in to InΦnity</h1>
                <p className="muted small">Choose how you use the platform.</p>
              </div>

              <div className="seg" role="group" aria-label="Account type">
                {roles.map((r) => (
                  <button key={r.id} type="button" aria-pressed={role === r.id} onClick={() => setRole(r.id)}>
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="field">
                <label className="label" htmlFor="email">Email address</label>
                <input className="input" id="email" type="email" autoComplete="email" placeholder="name@example.com" />
              </div>
              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <input className="input" id="password" type="password" autoComplete="current-password" />
                <span className="hint">Staff accounts sign in with a passkey and a second factor.</span>
              </div>

              <Link href={target.href} className="btn btn--primary btn--block btn--lg">Sign in as {target.label.toLowerCase()}</Link>
              <Link href={target.href} className="btn btn--secondary btn--block">
                <Icon name="lock" /> Continue with a passkey
              </Link>

              <hr className="rule" />
              <p className="small muted">
                New here? <Link href="/student/new" className="link">Request a mentor</Link> or <Link href="/mentor/apply" className="link">apply to mentor</Link>. You must be 18 or over.
              </p>
              <div className="notice">
                <Icon name="info" />
                <span>This is a UI prototype. Any details will sign you in to the sample workspace.</span>
              </div>
            </div>
          </div>

          <figure className="figure ticks" style={{ margin: 0 }}>
            <div className="figure__art" style={{ padding: 12 }}>
              <OrbitHero />
            </div>
            <figcaption className="figure__cap">
              <h4>One account, three workspaces</h4>
              <span className="figure__spec">Students request mentors. Mentors take verified engagements. Staff run the platform.</span>
            </figcaption>
          </figure>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
