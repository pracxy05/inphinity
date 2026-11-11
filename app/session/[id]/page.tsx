'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import { Icon } from '@/components/Icons';
import { Trace } from '@/components/Art';

const tabs = ['Notes', 'Data', 'Chat'] as const;

function clock(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export default function SessionRoom() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Notes');
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [share, setShare] = useState(false);
  const [sec, setSec] = useState(0);
  const [chat, setChat] = useState([
    { me: false, text: 'Welcome. I have your simulation notebook open, can you share the gyro noise figures?' },
    { me: true, text: 'Yes, sharing them in the Data tab now.' },
  ]);
  const [draft, setDraft] = useState('');
  const [items, setItems] = useState([
    { t: 'Compare an extended Kalman filter with a complementary filter on the same log', done: true },
    { t: 'Record gyro bias drift over a one hour static run', done: false },
    { t: 'Send the updated simulation before the next session', done: false },
  ]);

  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const send = () => {
    if (!draft.trim()) return;
    setChat([...chat, { me: true, text: draft.trim() }]);
    setDraft('');
  };

  return (
    <AppShell role="student" title="Student workspace / Session room">
      <div className="page-head">
        <div className="stack" style={{ ['--gap' as string]: '6px' }}>
          <span className="mono xsmall muted">MSN-0142</span>
          <h1>Estimator design review</h1>
          <p className="muted">With Dr. Rhea Kulkarni · Attitude determination for a 1U CubeSat</p>
        </div>
        <div className="row" style={{ ['--gap' as string]: '12px' }}>
          <span className="pill pill--neutral">Recording off</span>
          <span className="mono" style={{ fontSize: '1.4rem' }} aria-label="Session time">{clock(sec)}</span>
        </div>
      </div>

      <div className="room">
        <div className="stack" style={{ ['--gap' as string]: '12px' }}>
          <div className="video" role="img" aria-label="Video area. The video provider connects here.">
            <div className="stack" style={{ ['--gap' as string]: '10px', alignItems: 'center', textAlign: 'center' }}>
              <div className="avatar avatar--lg" style={{ background: '#3b434b', borderColor: '#5c656e', color: '#fff' }}>RK</div>
              <span className="small">{share ? 'You are sharing your screen' : 'Waiting for video to connect'}</span>
              <span className="xsmall" style={{ color: '#a3abb3' }}>A video provider connects in this area in the full build.</span>
            </div>
            <span className="video__tag">Dr. Rhea Kulkarni</span>
            <div className="video__self">{cam ? 'You' : 'Camera off'}</div>
          </div>

          <div className="controls" role="group" aria-label="Call controls">
            <button type="button" className="iconbtn" aria-pressed={mic} aria-label={mic ? 'Mute microphone' : 'Unmute microphone'} onClick={() => setMic(!mic)}><Icon name="mic" /></button>
            <button type="button" className="iconbtn" aria-pressed={cam} aria-label={cam ? 'Turn camera off' : 'Turn camera on'} onClick={() => setCam(!cam)}><Icon name="video" /></button>
            <button type="button" className="iconbtn" aria-pressed={!share} style={share ? { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' } : undefined} aria-label={share ? 'Stop sharing screen' : 'Share screen'} onClick={() => setShare(!share)}><Icon name="screen" /></button>
            <Link href="/student" className="iconbtn iconbtn--end"><Icon name="end" /> End session</Link>
          </div>
        </div>

        <section className="card" aria-label="Session tools" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card__head">
            <div className="seg" role="group" aria-label="Session panel">
              {tabs.map((t) => <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>)}
            </div>
          </div>

          {tab === 'Notes' && (
            <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
              <div className="field">
                <label className="label" htmlFor="notes">Session notes</label>
                <textarea className="textarea" id="notes" defaultValue={'Agenda\n1. Review estimator options\n2. Decide test data to collect'} />
              </div>
              <div className="stack" style={{ ['--gap' as string]: '10px' }}>
                <span className="label">Action items</span>
                {items.map((it, i) => (
                  <label key={it.t} className="check">
                    <input type="checkbox" checked={it.done} onChange={() => setItems(items.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))} />
                    <span style={{ textDecoration: it.done ? 'line-through' : 'none', color: it.done ? 'var(--slate)' : 'inherit' }}>{it.t}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {tab === 'Data' && (
            <div className="card__body stack" style={{ ['--gap' as string]: '16px' }}>
              <div className="stack" style={{ ['--gap' as string]: '6px' }}>
                <span className="label">Gyroscope X, static run</span>
                <Trace seed={4} />
              </div>
              <div className="stack" style={{ ['--gap' as string]: '6px' }}>
                <span className="label">Magnetometer heading error</span>
                <Trace seed={7} />
              </div>
              <dl className="kv small mono">
                <dt>Sample rate</dt><dd>100 Hz</dd>
                <dt>Duration</dt><dd>600 s</dd>
                <dt>File</dt><dd>static_run_03.csv</dd>
              </dl>
              <span className="xsmall muted">Sample traces. Shared files stay with the mission after the session ends.</span>
            </div>
          )}

          {tab === 'Chat' && (
            <>
              <div className="chat grow" aria-live="polite">
                {chat.map((c, i) => <div key={i} className={`msg ${c.me ? 'msg--me' : ''}`}>{c.text}</div>)}
              </div>
              <div className="card__foot row" style={{ ['--gap' as string]: '8px', flexWrap: 'nowrap' }}>
                <label className="sr-only" htmlFor="draft">Message</label>
                <input className="input" id="draft" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} placeholder="Write a message" />
                <button type="button" className="btn btn--primary" onClick={send}>Send</button>
              </div>
            </>
          )}
        </section>
      </div>
    </AppShell>
  );
}
