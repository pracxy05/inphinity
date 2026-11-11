import type { IconName } from '@/components/Icons';

/* All people, projects and figures below are sample data for the UI prototype.
   No prices are set anywhere: rates come from a rate card the company will publish. */

export type DomainId = 'uav' | 'cubesat' | 'cansat' | 'rocketry' | 'avionics' | 'rf' | 'gnc' | 'payload' | 'ground' | 'defence';

export const domains: { id: DomainId; name: string; icon: IconName; blurb: string }[] = [
  { id: 'uav', name: 'UAV and autopilot', icon: 'uav', blurb: 'Fixed-wing, multirotor and VTOL airframes, flight controllers and tuning.' },
  { id: 'cubesat', name: 'CubeSats and nanosatellites', icon: 'cubesat', blurb: 'Bus design, power, attitude control and mission operations.' },
  { id: 'cansat', name: 'CanSat', icon: 'cansat', blurb: 'Soda-can-sized satellites for competitions and education.' },
  { id: 'rocketry', name: 'Rockets and propulsion', icon: 'rocket', blurb: 'Sounding rockets, motors, recovery systems and range safety.' },
  { id: 'avionics', name: 'Avionics and embedded', icon: 'avionics', blurb: 'Flight computers, sensors, firmware and real-time software.' },
  { id: 'rf', name: 'RF and telemetry', icon: 'rf', blurb: 'Link budgets, antennas, LoRa and S-band, air-to-ground links.' },
  { id: 'gnc', name: 'Guidance, navigation and control', icon: 'gnc', blurb: 'State estimation, control laws, orbit determination and simulation.' },
  { id: 'payload', name: 'Payloads and sensors', icon: 'payload', blurb: 'Imaging, atmospheric and science instruments with their data chains.' },
  { id: 'ground', name: 'Ground segment', icon: 'ground', blurb: 'Ground stations, mission control software and data pipelines.' },
  { id: 'defence', name: 'Defence and dual-use', icon: 'defence', blurb: 'Security-sensitive systems. A compliance review applies before matching.' },
];

export const domainName = (id: DomainId) => domains.find((d) => d.id === id)?.name ?? id;

export const trlLevels = [
  { n: 1, short: 'Basic principles', long: 'Basic principles observed and reported.' },
  { n: 2, short: 'Concept formulated', long: 'Technology concept and application formulated.' },
  { n: 3, short: 'Proof of concept', long: 'Analytical and experimental proof of concept.' },
  { n: 4, short: 'Lab validation', long: 'Component or breadboard validated in a laboratory.' },
  { n: 5, short: 'Relevant environment', long: 'Component or breadboard validated in a relevant environment.' },
  { n: 6, short: 'Prototype demonstrated', long: 'System or prototype demonstrated in a relevant environment.' },
  { n: 7, short: 'Operational demo', long: 'System prototype demonstrated in an operational environment.' },
  { n: 8, short: 'System qualified', long: 'Actual system completed and qualified through test and demonstration.' },
  { n: 9, short: 'Proven in service', long: 'Actual system proven through successful mission operations.' },
];

export type Mentor = {
  id: string;
  name: string;
  initials: string;
  title: string;
  background: string;
  domains: DomainId[];
  trl: [number, number];
  years: number;
  languages: string[];
  timezone: string;
  availability: string;
  /** 3 rows (morning, afternoon, evening) by 7 columns (Mon to Sun) */
  grid: boolean[][];
  formats: string[];
  tier: 'A' | 'B' | 'C';
  verified: { identity: boolean; credentials: boolean; domainReview: boolean; background: boolean };
  defenceCleared: boolean;
  bio: string;
  topics: string[];
};

const T = true;
const F = false;

export const mentors: Mentor[] = [
  {
    id: 'rhea-kulkarni', name: 'Dr. Rhea Kulkarni', initials: 'RK', title: 'Orbital mechanics and GNC specialist',
    background: 'Doctorate in aerospace engineering. Spacecraft guidance work on small-satellite programmes.',
    domains: ['gnc', 'cubesat'], trl: [2, 7], years: 14, languages: ['English', 'Hindi', 'Marathi'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekends and two weekday evenings', grid: [[F, F, F, F, F, T, T], [F, F, F, F, F, T, T], [F, T, F, T, F, F, F]],
    formats: ['Hourly session', 'Monthly package', 'Fixed-price milestone'], tier: 'A',
    verified: { identity: T, credentials: T, domainReview: T, background: T }, defenceCleared: false,
    bio: 'Helps teams turn attitude determination and control ideas into estimators that run on real flight hardware. Prefers to start from the team\'s own simulation.',
    topics: ['Attitude determination', 'Kalman filtering', 'Orbit propagation', 'Control design'],
  },
  {
    id: 'arvind-nair', name: 'Arvind Nair', initials: 'AN', title: 'Flight software and avionics engineer',
    background: 'Flight computer firmware for launch and suborbital vehicles. Real-time systems and fault handling.',
    domains: ['avionics', 'rocketry', 'uav'], trl: [3, 8], years: 11, languages: ['English', 'Malayalam', 'Hindi'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekday evenings', grid: [[F, F, F, F, F, F, F], [F, F, F, F, F, T, F], [T, T, T, T, F, F, T]],
    formats: ['Hourly session', 'Fixed-price milestone'], tier: 'A',
    verified: { identity: T, credentials: T, domainReview: T, background: T }, defenceCleared: false,
    bio: 'Reviews flight software architecture, watchdog and recovery logic, and test plans before a team commits hardware.',
    topics: ['RTOS design', 'Sensor fusion firmware', 'Fault tolerance', 'Hardware-in-the-loop testing'],
  },
  {
    id: 'kavya-reddy', name: 'Kavya Reddy', initials: 'KR', title: 'RF and telemetry engineer',
    background: 'Radio links for balloons, CanSats and small satellites. Ground station design and licensing awareness.',
    domains: ['rf', 'ground', 'cansat'], trl: [2, 7], years: 9, languages: ['English', 'Telugu', 'Hindi'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekends and weekday mornings', grid: [[T, F, T, F, F, T, T], [F, F, F, F, F, T, T], [F, F, F, F, F, F, F]],
    formats: ['Hourly session', 'Monthly package', 'Fixed-price milestone'], tier: 'B',
    verified: { identity: T, credentials: T, domainReview: T, background: T }, defenceCleared: false,
    bio: 'Walks teams through link budgets, antenna choice and range testing so the first flight does not end in a silent radio.',
    topics: ['Link budgets', 'LoRa and S-band', 'Antenna selection', 'Ground station build'],
  },
  {
    id: 'sanjay-verma', name: 'Sanjay Verma', initials: 'SV', title: 'Defence systems engineer, retired services',
    background: 'Long service in systems engineering and trials for airborne defence systems. Qualification and test discipline.',
    domains: ['defence', 'uav', 'gnc'], trl: [4, 9], years: 26, languages: ['English', 'Hindi'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekday afternoons', grid: [[F, F, F, F, F, F, F], [T, T, T, T, F, F, F], [F, F, F, F, F, F, F]],
    formats: ['Monthly package', 'Fixed-price milestone'], tier: 'A',
    verified: { identity: T, credentials: T, domainReview: T, background: T }, defenceCleared: true,
    bio: 'Focuses on requirements, verification and test planning for systems that must survive operational use. Works only with projects that pass the compliance review.',
    topics: ['Requirements engineering', 'Qualification testing', 'Systems integration', 'Reliability'],
  },
  {
    id: 'meenakshi-rao', name: 'Prof. Meenakshi Rao', initials: 'MR', title: 'Propulsion and combustion researcher',
    background: 'University researcher in propulsion. Hybrid and solid motor design, test stand safety and instrumentation.',
    domains: ['rocketry'], trl: [1, 6], years: 18, languages: ['English', 'Kannada', 'Hindi'], timezone: 'IST (UTC+5:30)',
    availability: 'Saturday mornings', grid: [[F, F, F, F, F, T, F], [F, F, F, F, F, F, F], [F, F, F, F, F, F, F]],
    formats: ['Hourly session', 'Fixed-price milestone'], tier: 'A',
    verified: { identity: T, credentials: T, domainReview: T, background: T }, defenceCleared: false,
    bio: 'Guides student teams through motor design trade studies and, above all, safe static testing procedures.',
    topics: ['Hybrid motors', 'Static test stands', 'Nozzle design', 'Test safety'],
  },
  {
    id: 'imran-shaikh', name: 'Imran Shaikh', initials: 'IS', title: 'UAV autopilot and flight-test lead',
    background: 'Autopilot tuning and flight testing for fixed-wing and VTOL vehicles. Test card and log analysis practice.',
    domains: ['uav', 'avionics'], trl: [3, 8], years: 12, languages: ['English', 'Hindi', 'Urdu'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekends', grid: [[F, F, F, F, F, T, T], [F, F, F, F, F, T, T], [F, F, F, F, F, F, F]],
    formats: ['Hourly session', 'Monthly package'], tier: 'B',
    verified: { identity: T, credentials: T, domainReview: T, background: F }, defenceCleared: false,
    bio: 'Reads flight logs with the team, finds the real cause of oscillation or drift, and plans the next flight test.',
    topics: ['PID and L1 tuning', 'Flight log analysis', 'VTOL transition', 'Test cards'],
  },
  {
    id: 'tara-bhatt', name: 'Dr. Tara Bhatt', initials: 'TB', title: 'CubeSat systems engineer',
    background: 'Systems engineering across CubeSat missions from design review to in-orbit operations.',
    domains: ['cubesat', 'payload', 'ground'], trl: [3, 9], years: 16, languages: ['English', 'Gujarati', 'Hindi'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekday evenings and Sundays', grid: [[F, F, F, F, F, F, T], [F, F, F, F, F, F, T], [T, F, T, F, F, F, F]],
    formats: ['Hourly session', 'Monthly package', 'Fixed-price milestone'], tier: 'A',
    verified: { identity: T, credentials: T, domainReview: T, background: T }, defenceCleared: false,
    bio: 'Prepares teams for design reviews: power and thermal budgets, interface control, test campaigns and launch provider requirements.',
    topics: ['Design reviews', 'Power and thermal budgets', 'Environmental testing', 'Operations planning'],
  },
  {
    id: 'rohan-desai', name: 'Rohan Desai', initials: 'RD', title: 'Embedded, IoT and power systems engineer',
    background: 'Low-power embedded design for sensor nodes and CanSats. Battery, regulation and PCB review.',
    domains: ['avionics', 'cansat', 'payload'], trl: [1, 6], years: 8, languages: ['English', 'Hindi', 'Marathi'], timezone: 'IST (UTC+5:30)',
    availability: 'Weekday evenings', grid: [[F, F, F, F, F, F, F], [F, F, F, F, F, F, F], [T, T, T, T, T, F, F]],
    formats: ['Hourly session', 'Monthly package', 'Fixed-price milestone'], tier: 'C',
    verified: { identity: T, credentials: T, domainReview: F, background: F }, defenceCleared: false,
    bio: 'Reviews schematics and boards with first-time hardware teams so the first prototype powers up and stays up.',
    topics: ['Schematic review', 'Low-power design', 'Battery systems', 'Sensor interfaces'],
  },
];

export const getMentor = (id: string) => mentors.find((m) => m.id === id);

export const formatOptions = ['Hourly session', 'Monthly package', 'Fixed-price milestone'];

export type Project = {
  id: string;
  mission: string;
  title: string;
  domain: DomainId;
  trl: number;
  status: 'On track' | 'At risk' | 'Awaiting mentor' | 'Overdue' | 'Completed';
  pdc: string; // planned date of completion, ISO date
  progress: number;
  mentorId: string | null;
  next: string;
};

export const projects: Project[] = [
  { id: 'p1', mission: 'MSN-0142', title: 'Attitude determination for a 1U CubeSat', domain: 'cubesat', trl: 3, status: 'On track', pdc: '2026-12-18', progress: 35, mentorId: 'rhea-kulkarni', next: 'Estimator design review' },
  { id: 'p2', mission: 'MSN-0157', title: 'CanSat telemetry and parachute recovery', domain: 'cansat', trl: 4, status: 'At risk', pdc: '2026-11-06', progress: 62, mentorId: 'kavya-reddy', next: 'Range test of the radio link' },
  { id: 'p3', mission: 'MSN-0171', title: 'Hybrid rocket motor static test stand', domain: 'rocketry', trl: 2, status: 'Awaiting mentor', pdc: '2027-02-27', progress: 10, mentorId: null, next: 'Choose a propulsion mentor' },
];

export type Request = {
  id: string;
  mission: string;
  title: string;
  domain: DomainId;
  trl: number;
  team: number;
  pdc: string;
  tab: 'Recommended' | 'New' | 'Applied';
  match: number;
  needs: string;
};

export const requests: Request[] = [
  { id: 'r1', mission: 'MSN-0188', title: 'Fixed-wing UAV autopilot tuning', domain: 'uav', trl: 5, team: 4, pdc: '2026-12-05', tab: 'Recommended', match: 92, needs: 'Flight log review, control tuning' },
  { id: 'r2', mission: 'MSN-0190', title: 'Ground station for high-altitude balloon flights', domain: 'rf', trl: 4, team: 3, pdc: '2027-01-15', tab: 'Recommended', match: 86, needs: 'Antenna choice, link budget' },
  { id: 'r3', mission: 'MSN-0193', title: 'Flight computer for a student sounding rocket', domain: 'avionics', trl: 3, team: 6, pdc: '2027-03-12', tab: 'New', match: 78, needs: 'Architecture review, test plan' },
  { id: 'r4', mission: 'MSN-0195', title: 'Sun sensor calibration for a CubeSat', domain: 'payload', trl: 4, team: 2, pdc: '2026-12-28', tab: 'New', match: 71, needs: 'Calibration method' },
  { id: 'r5', mission: 'MSN-0179', title: 'Telemetry dashboard for a CanSat team', domain: 'ground', trl: 4, team: 3, pdc: '2026-11-20', tab: 'Applied', match: 74, needs: 'Data pipeline design' },
];

export const adminQueue = [
  { name: 'Applicant 0412', domain: 'Propulsion', stage: 'Domain review', waiting: '5 days', status: 'Overdue' },
  { name: 'Applicant 0415', domain: 'UAV and autopilot', stage: 'Credential check', waiting: '2 days', status: 'Due today' },
  { name: 'Applicant 0418', domain: 'RF and telemetry', stage: 'Identity', waiting: '1 day', status: 'In progress' },
  { name: 'Applicant 0419', domain: 'Defence and dual-use', stage: 'Compliance review', waiting: '1 day', status: 'In progress' },
  { name: 'Applicant 0421', domain: 'CubeSats', stage: 'Ready for approval', waiting: '4 hours', status: 'Ready' },
];

export const adminEvents = [
  { event: 'Mentor profile approved', who: 'Verification admin', result: 'Allowed', tone: 'ok' },
  { event: 'Payout account change requested', who: 'Mentor account', result: 'Needs second approval', tone: 'warn' },
  { event: 'Repeated failed sign-ins', who: 'Student account', result: 'Locked for 15 minutes', tone: 'crit' },
  { event: 'Staff access review', who: 'Security admin', result: 'Completed', tone: 'ok' },
  { event: 'Defence project screening', who: 'Compliance admin', result: 'Held for review', tone: 'warn' },
];

export const adminTransactions = [
  { ref: 'TXN-20261013-0412', kind: 'Hourly session', state: 'Held', tone: 'warn' },
  { ref: 'TXN-20261012-0388', kind: 'Monthly package', state: 'Released', tone: 'ok' },
  { ref: 'TXN-20261012-0371', kind: 'Fixed-price milestone', state: 'Refunded', tone: 'crit' },
  { ref: 'TXN-20261011-0349', kind: 'Hourly session', state: 'Released', tone: 'ok' },
];

export const adminCases = [
  { subject: 'Session rescheduling', ref: 'ENG-1042', status: 'Open', tone: 'warn' },
  { subject: 'Cannot upload credential document', ref: 'ENG-1038', status: 'Open', tone: 'warn' },
  { subject: 'Receipt request', ref: 'ENG-1021', status: 'Resolved', tone: 'ok' },
  { subject: 'Report: unprofessional message', ref: 'ENG-0997', status: 'Escalated', tone: 'crit' },
];

export const adminByDomain: { id: DomainId; open: number }[] = [
  { id: 'uav', open: 38 }, { id: 'cubesat', open: 31 }, { id: 'cansat', open: 29 }, { id: 'rocketry', open: 24 },
  { id: 'avionics', open: 22 }, { id: 'rf', open: 17 }, { id: 'gnc', open: 14 }, { id: 'payload', open: 12 },
  { id: 'ground', open: 11 }, { id: 'defence', open: 6 },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Deterministic date format so server and browser always render the same text. */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Fixed reference date for the sample data, so the prototype reads the same every time it loads. */
const TODAY_UTC = Date.UTC(2026, 9, 13);
export function daysUntil(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - TODAY_UTC) / 86400000);
}
