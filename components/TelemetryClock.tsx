'use client';

import { useEffect, useState } from 'react';

/** Mission-style clock in the utility bar. Renders after mount so server and browser never disagree. */
export default function TelemetryClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const utc = now ? now.toISOString().slice(11, 19) : '--:--:--';
  const ist = now ? new Date(now.getTime() + 19800000).toISOString().slice(11, 19) : '--:--:--';

  return (
    <div className="utility__clock" aria-label="Current time">
      <span>UTC {utc}</span>
      <span>IST {ist}</span>
    </div>
  );
}
