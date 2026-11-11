import Link from 'next/link';
import Logo from './Logo';
import TelemetryClock from './TelemetryClock';

export default function SiteHeader() {
  return (
    <>
      <div className="utility">
        <div className="container utility__inner">
          <div className="utility__links">
            <Link href="/student/new">For students</Link>
            <Link href="/mentor/apply">For mentors</Link>
            <Link href="/sign-in">Sign in</Link>
          </div>
          <TelemetryClock />
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            <Link href="/#how">How it works</Link>
            <Link href="/#domains">Domains</Link>
            <Link href="/#readiness">Technology readiness</Link>
            <Link href="/mentors">Mentors</Link>
            <Link href="/#security">Security</Link>
          </nav>
          <div className="header-actions">
            <Link href="/sign-in" className="btn btn--ghost btn--sm">Sign in</Link>
            <Link href="/student/new" className="btn btn--primary btn--sm">Request a mentor</Link>
          </div>
        </div>
      </header>
    </>
  );
}
