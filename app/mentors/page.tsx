import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MentorDirectory from '@/components/MentorDirectory';
import { domains, type DomainId } from '@/lib/data';

export const metadata = { title: 'Mentors | InΦnity' };

export default async function MentorsPage({ searchParams }: { searchParams: Promise<{ domain?: string }> }) {
  const { domain: requested } = await searchParams;
  const initial = domains.find((d) => d.id === requested)?.id as DomainId | undefined;
  return (
    <>
      <SiteHeader />
      <main className="section section--fog" style={{ paddingBlock: 'clamp(32px, 4vw, 56px)' }}>
        <div className="container stack" style={{ ['--gap' as string]: '28px' }}>
          <div className="stack" style={{ ['--gap' as string]: '10px', maxWidth: 720 }}>
            <h1 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)' }}>Find a verified mentor</h1>
            <p className="lede">Filter by domain, readiness level and engagement format. Every mentor listed has completed identity and credential checks. Sample profiles shown.</p>
          </div>
          <MentorDirectory initialDomain={initial} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
