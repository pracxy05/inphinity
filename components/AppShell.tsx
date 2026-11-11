'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Logo from './Logo';
import { Icon, type IconName } from './Icons';

export type Role = 'student' | 'mentor' | 'admin';

const nav: Record<Role, { href: string; label: string; icon: IconName }[]> = {
  student: [
    { href: '/student', label: 'Overview', icon: 'grid' },
    { href: '/student/new', label: 'New mission request', icon: 'plus' },
    { href: '/mentors', label: 'Find mentors', icon: 'search' },
    { href: '/session/demo', label: 'Session room', icon: 'video' },
  ],
  mentor: [
    { href: '/mentor', label: 'Workspace', icon: 'grid' },
    { href: '/mentor/apply', label: 'Verification', icon: 'defence' },
    { href: '/mentors', label: 'Mentor directory', icon: 'user' },
    { href: '/session/demo', label: 'Session room', icon: 'video' },
  ],
  admin: [
    { href: '/admin', label: 'Operations console', icon: 'chart' },
    { href: '/mentors', label: 'Mentor directory', icon: 'user' },
    { href: '/mentor/apply', label: 'Verification flow', icon: 'defence' },
    { href: '/session/demo', label: 'Session room', icon: 'video' },
  ],
};

const who: Record<Role, { name: string; role: string; initials: string }> = {
  student: { name: 'Aarav Rao', role: 'Student, team lead', initials: 'AR' },
  mentor: { name: 'Dr. Rhea Kulkarni', role: 'Mentor, verified', initials: 'RK' },
  admin: { name: 'Security lead', role: 'Staff, passkey sign-in', initials: 'SL' },
};

export default function AppShell({ role, title, children }: { role: Role; title: string; children: ReactNode }) {
  const pathname = usePathname();
  const person = who[role];
  return (
    <div className="app">
      <aside className="app__side">
        <div className="app__brand">
          <Logo href="/" />
          <span className="xsmall muted">{role === 'student' ? 'Student workspace' : role === 'mentor' ? 'Mentor workspace' : 'Admin console'}</span>
        </div>
        <nav className="app__nav" aria-label={`${role} navigation`}>
          {nav[role].map((item) => (
            <Link key={item.href + item.label} href={item.href} className="app__link" aria-current={pathname === item.href ? 'page' : undefined}>
              <Icon name={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="app__user">
          <div className="avatar">{person.initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="small semibold">{person.name}</div>
            <div className="xsmall muted">{person.role}</div>
          </div>
        </div>
      </aside>
      <div className="app__main">
        <div className="app__top">
          <span className="small semibold">{title}</span>
          <div className="row" style={{ ['--gap' as string]: '12px' }}>
            <span className="pill pill--neutral">Sample data</span>
            <Link href="/" className="btn btn--ghost btn--sm">Sign out</Link>
          </div>
        </div>
        <div className="app__content">{children}</div>
      </div>
    </div>
  );
}
