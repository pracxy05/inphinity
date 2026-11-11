import Link from 'next/link';
import Logo from './Logo';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cols">
          <div className="stack" style={{ ['--gap' as string]: '16px' }}>
            <Logo invert />
            <p className="small" style={{ maxWidth: '36ch' }}>
              Expert mentorship for student and startup teams building UAVs, satellites, rockets and defence systems.
            </p>
          </div>
          <div>
            <h4>Students</h4>
            <ul className="footer__list">
              <li><Link href="/student/new">Request a mentor</Link></li>
              <li><Link href="/mentors">Browse mentors</Link></li>
              <li><Link href="/#readiness">Technology readiness</Link></li>
              <li><Link href="/student">Student workspace</Link></li>
            </ul>
          </div>
          <div>
            <h4>Mentors</h4>
            <ul className="footer__list">
              <li><Link href="/mentor/apply">Apply to mentor</Link></li>
              <li><Link href="/#verification">How we verify</Link></li>
              <li><Link href="/mentor">Mentor workspace</Link></li>
              <li><Link href="/session/demo">Session room</Link></li>
            </ul>
          </div>
          <div>
            <h4>Platform</h4>
            <ul className="footer__list">
              <li><Link href="/#domains">Domains</Link></li>
              <li><Link href="/#security">Security and data</Link></li>
              <li><Link href="/admin">Admin console</Link></li>
              <li><Link href="/sign-in">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="footer__list">
              <li><span className="small">Terms of use (draft)</span></li>
              <li><span className="small">Privacy notice (draft)</span></li>
              <li><span className="small">Mentor code of conduct (draft)</span></li>
              <li><span className="small">Academic integrity policy (draft)</span></li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span>© 2026 InΦnity. UI prototype v0.1, sample data only.</span>
          <span>Students and mentors must be 18 or over.</span>
        </div>
      </div>
    </footer>
  );
}
