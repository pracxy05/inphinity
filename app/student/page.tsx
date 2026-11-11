import Link from 'next/link';
import AppShell from '@/components/AppShell';
import TrlScale from '@/components/TrlScale';
import StatusPill from '@/components/StatusPill';
import { Icon } from '@/components/Icons';
import { Trace } from '@/components/Art';
import { projects, getMentor, domainName, fmtDate, daysUntil } from '@/lib/data';

function dueText(iso: string) {
  const d = daysUntil(iso);
  if (d < 0) return `${Math.abs(d)} days past`;
  if (d === 0) return 'today';
  return `in ${d} days`;
}

export default function StudentHome() {
  const active = projects.filter((p) => p.status !== 'Awaiting mentor');
  const nearest = [...projects].sort((a, b) => a.pdc.localeCompare(b.pdc))[0];

  return (
    <AppShell role="student" title="Student workspace / Overview">
      <div className="page-head">
        <div className="stack" style={{ ['--gap' as string]: '6px' }}>
          <h1>Your missions</h1>
          <p className="muted">Tuesday 13 October 2026</p>
        </div>
        <Link href="/student/new" className="btn btn--primary"><Icon name="plus" /> New mission request</Link>
      </div>

      <div className="card">
        <div className="grid grid--3" style={{ ['--gap' as string]: '0' }}>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}>
            <span className="stat__v">{active.length}</span>
            <span className="stat__l">Missions with a mentor</span>
          </div>
          <div className="stat" style={{ borderRight: '1px solid var(--line)' }}>
            <span className="stat__v">{fmtDate(nearest.pdc)}</span>
            <span className="stat__l">Nearest <abbr title="Planned date of completion">PDC</abbr>, {dueText(nearest.pdc)}</span>
          </div>
          <div className="stat">
            <span className="stat__v">Sat 10:00</span>
            <span className="stat__l">Next session, 17 Oct 2026</span>
          </div>
        </div>
      </div>

      <div className="dash">
        <div className="stack" style={{ ['--gap' as string]: '16px' }}>
          <h2 style={{ fontSize: '1.4rem' }}>Missions</h2>
          {projects.map((p) => {
            const mentor = p.mentorId ? getMentor(p.mentorId) : null;
            return (
              <article key={p.id} className="card">
                <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
                  <div className="row row--between row--top">
                    <div className="stack" style={{ ['--gap' as string]: '6px', minWidth: 0 }}>
                      <span className="mono xsmall muted">{p.mission}</span>
                      <h3>{p.title}</h3>
                      <div className="tags"><span className="tag tag--solid">{domainName(p.domain)}</span></div>
                    </div>
                    <StatusPill status={p.status} />
                  </div>

                  <div className="grid grid--2" style={{ ['--gap' as string]: '20px' }}>
                    <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                      <span className="small semibold">Readiness: TRL {p.trl}</span>
                      <TrlScale value={p.trl} compact />
                    </div>
                    <div className="stack" style={{ ['--gap' as string]: '8px' }}>
                      <span className="small semibold"><abbr title="Planned date of completion">PDC</abbr> {fmtDate(p.pdc)} · {dueText(p.pdc)}</span>
                      <div className="bar" role="progressbar" aria-valuenow={p.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${p.progress} percent complete`}>
                        <div className="bar__fill" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card__foot row row--between">
                  <span className="small">
                    <span className="muted">Next: </span>{p.next}
                  </span>
                  {mentor ? (
                    <Link href={`/mentors/${mentor.id}`} className="link small">{mentor.name}</Link>
                  ) : (
                    <Link href="/mentors?domain=rocketry" className="btn btn--secondary btn--sm">Find a mentor</Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="stack" style={{ ['--gap' as string]: '20px' }}>
          <div className="card">
            <div className="card__head"><h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Next session</h3><span className="pill pill--info">Booked</span></div>
            <div className="card__body stack" style={{ ['--gap' as string]: '12px' }}>
              <div className="row" style={{ ['--gap' as string]: '12px' }}>
                <div className="avatar">RK</div>
                <div>
                  <div className="semibold small">Estimator design review</div>
                  <div className="xsmall muted">with Dr. Rhea Kulkarni · MSN-0142</div>
                </div>
              </div>
              <div className="row small" style={{ ['--gap' as string]: '8px' }}><Icon name="calendar" /><span className="mono">Sat 17 Oct 2026, 10:00 IST</span></div>
              <Link href="/session/demo" className="btn btn--primary btn--block"><Icon name="video" /> Open session room</Link>
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Telemetry from your CanSat</h3></div>
            <div className="card__body stack" style={{ ['--gap' as string]: '8px' }}>
              <Trace seed={2} />
              <span className="xsmall muted">Sample trace from the last range test. Mentors can annotate shared data during sessions.</span>
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--sans)' }}>Recent activity</h3></div>
            <div className="card__body">
              <ul className="timeline">
                <li><div className="small semibold">Mentor note added</div><div className="xsmall muted">Estimator options, MSN-0142 · Yesterday</div></li>
                <li><div className="small semibold">Range test logged</div><div className="xsmall muted">MSN-0157 · 9 Oct 2026</div></li>
                <li><div className="small semibold">Mission request published</div><div className="xsmall muted">MSN-0171 · 6 Oct 2026</div></li>
                <li className="is-todo"><div className="small semibold">Choose a propulsion mentor</div><div className="xsmall muted">Open</div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
