const tone: Record<string, 'ok' | 'warn' | 'crit' | 'info' | 'neutral'> = {
  'On track': 'ok',
  'At risk': 'warn',
  Overdue: 'crit',
  'Awaiting mentor': 'info',
  Completed: 'neutral',
  Verified: 'ok',
  Pending: 'warn',
  Ready: 'ok',
  'In progress': 'info',
  'Due today': 'warn',
  Open: 'warn',
  Resolved: 'ok',
  Escalated: 'crit',
  Held: 'warn',
  Released: 'ok',
  Refunded: 'crit',
};

export default function StatusPill({ status, tone: forced }: { status: string; tone?: 'ok' | 'warn' | 'crit' | 'info' | 'neutral' }) {
  return <span className={`pill pill--${forced ?? tone[status] ?? 'neutral'}`}>{status}</span>;
}
