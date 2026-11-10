import { ChevronRight } from 'lucide-react';
import { positions } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/motion';

export const metadata = {
  title: 'Experience — Kushagra Pandya',
  description: 'Identity-document AI at TSS Consultancy: classification, liveness, extraction and fine-tuning.',
};

export default function ExperiencePage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Career"
        title="Experience."
        subtitle="Identity-document AI, from research to production."
      />

      <div className="mt-14 border-l border-border pl-6 sm:pl-10">
        {positions.map((p, i) => (
          <Reveal
            key={p.role + p.period}
            delay={i * 0.05}
            className="pb-16 last:pb-0 sm:pb-20"
          >
            <div className="relative">
              {/* node dot */}
              <span className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary sm:-left-[49px]" />

              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {p.period}
                </p>
                {p.current && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                    Now
                  </span>
                )}
              </div>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {p.role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {p.company} · {p.location}
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{p.summary}</p>

              <details className="group mt-4">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-primary transition hover:opacity-80 [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" />
                  <span className="group-open:hidden">Show details</span>
                  <span className="hidden group-open:inline">Hide details</span>
                </summary>
                <div className="mt-5 space-y-6">
                  {p.sections.map((sec, k) => (
                    <div key={k}>
                      {sec.title && (
                        <h4 className="font-display text-base font-semibold tracking-tight text-foreground">
                          {sec.title}
                        </h4>
                      )}
                      <ul className={sec.title ? 'mt-2.5 space-y-2.5' : 'space-y-2.5'}>
                        {sec.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
