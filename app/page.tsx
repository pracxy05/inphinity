import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TrlScale from '@/components/TrlScale';
import { Icon } from '@/components/Icons';
import { OrbitHero, CubeSatDiagram, CanSatDiagram, UavDiagram, TrajectoryChart } from '@/components/Art';
import { domains } from '@/lib/data';

const steps = [
  { icon: 'file', title: 'Describe the mission', text: 'Give your project a domain, a readiness level, a planned completion date and the help you need.' },
  { icon: 'search', title: 'Get matched', text: 'We rank verified mentors by domain, readiness fit, availability and language, then you compare them.' },
  { icon: 'video', title: 'Meet by video', text: 'Hold sessions in the platform. Notes, files and action items stay attached to your mission.' },
  { icon: 'flag', title: 'Reach the next level', text: 'Track status against your planned completion date and move your project up the readiness scale.' },
] as const;

const verification = [
  { title: 'Identity', text: 'Government identity check through a verification partner. Mentors must be 18 or over.' },
  { title: 'Credentials', text: 'Employment, education and publications checked against evidence, not self-description.' },
  { title: 'Domain review', text: 'A technical interview with a reviewer in the same field before any profile goes live.' },
  { title: 'Conflict and compliance', text: 'Background screening, conflict checks, and a separate clearance for defence-related projects.' },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="section" style={{ paddingBlock: 'clamp(48px, 6vw, 88px)' }}>
          <div className="container split">
            <div className="stack" style={{ ['--gap' as string]: '28px' }}>
              <h1>Expert mentorship for teams building things that fly.</h1>
              <p className="lede">
                InΦnity connects student and startup teams working on UAVs, CubeSats, CanSats, rockets and defence systems with verified engineers who have already done it.
              </p>
              <div className="row" style={{ ['--gap' as string]: '12px' }}>
                <Link href="/student/new" className="btn btn--primary btn--lg">Request a mentor</Link>
                <Link href="/mentor/apply" className="btn btn--secondary btn--lg">Apply as a mentor</Link>
              </div>
              <ul className="hero-facts">
                <li><Icon name="defence" /><span><b>Every mentor is verified.</b> Identity, credentials and a domain review come first.</span></li>
                <li><Icon name="flag" /><span><b>Matched by readiness.</b> Describe your project by Technology Readiness Level.</span></li>
                <li><Icon name="video" /><span><b>Sessions by video.</b> Notes and files stay with your mission.</span></li>
              </ul>
            </div>
            <figure className="figure ticks" style={{ margin: 0 }}>
              <div className="figure__art" style={{ padding: 12 }}>
                <OrbitHero />
              </div>
              <figcaption className="figure__cap">
                <div className="row row--between">
                  <h4>Mission MSN-0142</h4>
                  <span className="pill pill--ok">On track</span>
                </div>
                <span className="figure__spec">1U CubeSat · low Earth orbit · planned completion 18 Dec 2026</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Domains */}
        <section className="section section--fog" id="domains">
          <div className="container">
            <div className="section-head">
              <h2>Ten domains, from first prototype to flight hardware</h2>
              <p className="lede">Pick the field your project lives in. Every mentor is reviewed in the domains they list, and nowhere else.</p>
            </div>
            <div className="tiles">
              {domains.map((d) => (
                <Link key={d.id} href={`/mentors?domain=${d.id}`} className="tile">
                  <Icon name={d.icon} />
                  <h4>{d.name}</h4>
                  <p>{d.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware figures */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>The hardware our mentors know best</h2>
              <p className="lede">Mentors review real designs: airframes, buses, boards and test plans.</p>
            </div>
            <div className="grid grid--4" style={{ ['--gap' as string]: '20px' }}>
              <figure className="figure" style={{ margin: 0 }}>
                <div className="figure__art"><CubeSatDiagram /></div>
                <figcaption className="figure__cap"><h4>1U CubeSat</h4><span className="figure__spec">10 × 10 × 10 cm</span></figcaption>
              </figure>
              <figure className="figure" style={{ margin: 0 }}>
                <div className="figure__art"><CanSatDiagram /></div>
                <figcaption className="figure__cap"><h4>CanSat</h4><span className="figure__spec">Ø 66 mm × 115 mm envelope</span></figcaption>
              </figure>
              <figure className="figure" style={{ margin: 0 }}>
                <div className="figure__art"><UavDiagram /></div>
                <figcaption className="figure__cap"><h4>Multirotor UAV</h4><span className="figure__spec">Frame, motors, flight controller</span></figcaption>
              </figure>
              <figure className="figure" style={{ margin: 0 }}>
                <div className="figure__art"><TrajectoryChart /></div>
                <figcaption className="figure__cap"><h4>Sounding rocket</h4><span className="figure__spec">Altitude profile and recovery</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section section--fog" id="how">
          <div className="container">
            <div className="section-head">
              <h2>How InΦnity works</h2>
              <p className="lede">From a mission description to a working session in four steps.</p>
            </div>
            <div className="grid grid--4" style={{ ['--gap' as string]: '20px' }}>
              {steps.map((s, i) => (
                <div key={s.title} className="step">
                  <div className="row row--between">
                    <Icon name={s.icon} />
                    <span className="step__n">Step {i + 1}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p className="small muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology readiness */}
        <section className="section section--ink" id="readiness">
          <div className="container stack" style={{ ['--gap' as string]: '40px' }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <h2>Match by readiness, not only by topic</h2>
              <p className="lede" style={{ color: '#c4cad0' }}>
                A team testing its first breadboard needs different help from a team preparing for an operational demonstration. You tell us your level on the Technology Readiness scale, and mentors list the levels they cover.
              </p>
            </div>
            <TrlScale value={4} onInk />
            <div className="grid grid--3" style={{ ['--gap' as string]: '32px' }}>
              <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                <h4>Levels 1 to 3: concept and proof</h4>
                <p className="small muted">Ideas, first simulations and proof-of-concept experiments. Mentors help you choose what to build and what to ignore.</p>
              </div>
              <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                <h4>Levels 4 to 6: lab to prototype</h4>
                <p className="small muted">Breadboards, integrated prototypes and tests in relevant environments. Mentors review designs and test plans.</p>
              </div>
              <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                <h4>Levels 7 to 9: demonstration to service</h4>
                <p className="small muted">Operational demonstrations, qualification and mission operations. Mentors bring flight and field experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section className="section" id="verification">
          <div className="container split split--top">
            <div className="stack" style={{ ['--gap' as string]: '20px' }}>
              <h2>Mentors are verified before they are visible</h2>
              <p className="lede">Not everyone can become a mentor. Each applicant goes through four checks, and a profile goes live only when all of them are complete.</p>
              <div className="notice">
                <Icon name="defence" />
                <span><b>Defence and dual-use projects</b> go through a separate compliance review. Mentors for these projects hold an extra clearance on their profile.</span>
              </div>
              <Link href="/mentor/apply" className="btn btn--secondary" style={{ alignSelf: 'flex-start' }}>See the application process</Link>
            </div>
            <div className="card">
              {verification.map((v, i) => (
                <div key={v.title} className="card__body" style={{ borderTop: i ? '1px solid var(--line)' : 0, display: 'flex', gap: 16 }}>
                  <span className="avatar" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}><Icon name="check" /></span>
                  <div className="stack" style={{ ['--gap' as string]: '4px' }}>
                    <h4 style={{ fontFamily: 'var(--sans)', fontWeight: 600 }}>{v.title}</h4>
                    <p className="small muted">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="section section--fog" id="security">
          <div className="container">
            <div className="section-head">
              <h2>Security and data handling</h2>
              <p className="lede">Your designs and your identity are the product of real work. We built the platform to protect both.</p>
            </div>
            <div className="grid grid--3" style={{ ['--gap' as string]: '20px' }}>
              <div className="card"><div className="card__body stack" style={{ ['--gap' as string]: '10px' }}><Icon name="lock" /><h4>Access by role</h4><p className="small muted">Support, finance, verification and security staff each see only what their job needs. Sensitive actions need a second approval.</p></div></div>
              <div className="card"><div className="card__body stack" style={{ ['--gap' as string]: '10px' }}><Icon name="file" /><h4>Documents scanned and encrypted</h4><p className="small muted">Uploads are scanned before they are stored, encrypted at rest, and released only to people with a reason to open them.</p></div></div>
              <div className="card"><div className="card__body stack" style={{ ['--gap' as string]: '10px' }}><Icon name="alert" /><h4>Restricted material stays out</h4><p className="small muted">Do not upload classified or export-controlled material. Project descriptions are screened, and restricted projects go to a review queue.</p></div></div>
            </div>
            <p className="small muted measure" style={{ marginTop: 24 }}>
              InΦnity&apos;s security architecture is aligned to ISO/IEC 27001:2022 and the SOC 2 Trust Services Criteria. Independent certification is planned and has not yet been completed.
            </p>
          </div>
        </section>

        {/* Closing band */}
        <section className="section section--ink" style={{ paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
          <div className="container row row--between" style={{ ['--gap' as string]: '24px' }}>
            <div className="stack" style={{ ['--gap' as string]: '10px', maxWidth: 640 }}>
              <h2>Describe your mission. Meet the right mentor.</h2>
              <p className="muted">It takes about five minutes to write a request. You can edit it until you publish.</p>
            </div>
            <div className="row" style={{ ['--gap' as string]: '12px' }}>
              <Link href="/student/new" className="btn btn--invert btn--lg">Request a mentor</Link>
              <Link href="/mentors" className="btn btn--outline-invert btn--lg">Browse mentors</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
