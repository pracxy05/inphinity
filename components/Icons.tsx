import type { ReactElement } from 'react';

export type IconName =
  | 'uav' | 'cubesat' | 'cansat' | 'rocket' | 'avionics' | 'rf' | 'gnc' | 'payload' | 'ground' | 'defence'
  | 'arrow' | 'check' | 'search' | 'calendar' | 'message' | 'video' | 'mic' | 'screen' | 'end' | 'file'
  | 'lock' | 'clock' | 'user' | 'grid' | 'folder' | 'alert' | 'upload' | 'list' | 'settings' | 'plus'
  | 'chart' | 'flag' | 'info' | 'globe';

const paths: Record<IconName, ReactElement> = {
  uav: (<><circle cx="5" cy="5" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M7 7l3.5 3.5M17 7l-3.5 3.5M7 17l3.5-3.5M17 17l-3.5-3.5" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /></>),
  cubesat: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>),
  cansat: (<><ellipse cx="12" cy="6" rx="5" ry="2.2" /><path d="M7 6v12c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V6" /><path d="M7 11c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2" /></>),
  rocket: (<><path d="M12 2c3 2.5 4.5 6 4.5 10v5h-9v-5c0-4 1.5-7.5 4.5-10z" /><circle cx="12" cy="10" r="1.6" /><path d="M7.5 14l-3 3.5V20l3-1.5M16.5 14l3 3.5V20l-3-1.5M10 20.5l2 2 2-2" /></>),
  avionics: (<><rect x="6" y="6" width="12" height="12" rx="1" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>),
  rf: (<><path d="M12 12v9M9 21h6" /><circle cx="12" cy="10" r="1.6" /><path d="M7.5 5.5a6.4 6.4 0 000 9M16.5 5.5a6.4 6.4 0 010 9M4.7 3a10.3 10.3 0 000 14M19.3 3a10.3 10.3 0 010 14" /></>),
  gnc: (<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>),
  payload: (<><rect x="3" y="7" width="18" height="12" rx="1" /><circle cx="12" cy="13" r="3.2" /><path d="M8 7l1.5-3h5L16 7" /></>),
  ground: (<><path d="M4 9a9 9 0 0010 10L4 9z" /><path d="M9.5 14.5L15 9M15 9l3-3M13 21h8" /></>),
  defence: (<><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></>),
  arrow: (<path d="M5 12h14M13 6l6 6-6 6" />),
  check: (<path d="M5 12.5l4.5 4.5L19 7.5" />),
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5" /></>),
  calendar: (<><rect x="3.5" y="5" width="17" height="15" rx="1" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  message: (<path d="M4 5h16v11H9l-5 4V5z" />),
  video: (<><rect x="3" y="6" width="13" height="12" rx="1.5" /><path d="M16 10.5l5-3v9l-5-3" /></>),
  mic: (<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" /></>),
  screen: (<><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 20h8M12 16v4" /></>),
  end: (<path d="M3 15c5-5 13-5 18 0l-2.5 2.5-3-1.5v-2.5c-2-.8-4-.8-6 0V16l-3 1.5L3 15z" />),
  file: (<><path d="M6 3h8l4 4v14H6V3z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>),
  lock: (<><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 018 0v3" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>),
  grid: (<><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></>),
  folder: (<path d="M3 6h7l2 2h9v11H3V6z" />),
  alert: (<><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5M12 18v.5" /></>),
  upload: (<path d="M12 16V4M7 9l5-5 5 5M4 20h16" />),
  list: (<path d="M8 6h12M8 12h12M8 18h12M4 6h.5M4 12h.5M4 18h.5" />),
  settings: (<><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>),
  plus: (<path d="M12 5v14M5 12h14" />),
  chart: (<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3" />),
  flag: (<path d="M5 21V4M5 4h11l-2 4 2 4H5" />),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
