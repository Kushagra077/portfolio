import { ArrowUpRight } from 'lucide-react';
import { papers, patents } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export const metadata = {
  title: 'Publications — Kushagra Pandya',
  description: 'Peer-reviewed research and filed patents in AI and computer vision.',
};

export default function PublicationsPage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Research"
        title="Publications & patents."
        subtitle="Peer-reviewed research and filed patents in AI and computer vision."
      />

      {/* Papers */}
      <section className="mt-14">
        <Reveal>
          <p className="label-mono">Peer-reviewed papers</p>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {papers.map((paper) => (
            <Reveal key={paper.title}>
              <article className="rounded-lg border border-border bg-card p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {paper.venue} · {paper.year}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
                  {paper.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{paper.summary}</p>
                {paper.url && (
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:gap-2.5"
                  >
                    Read paper
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Patents */}
      <section className="mt-16">
        <Reveal>
          <p className="label-mono">Patents</p>
        </Reveal>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
          {patents.map((patent) => (
            <StaggerItem key={patent.number}>
              <article className="h-full rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
                  #{patent.number}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {patent.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {patent.description}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70">
                  Intellectual Property India · 2024
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
