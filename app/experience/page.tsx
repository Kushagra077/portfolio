import { positions } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/motion';

export const metadata = {
  title: 'Experience — Kushagra Pandya',
  description: 'Building and shipping AI in production at TSS Consultancy.',
};

export default function ExperiencePage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Career"
        title="Experience."
        subtitle="Building and shipping AI in production."
      />

      <div className="mt-14 border-l border-border pl-6 sm:pl-10">
        {positions.map((p, i) => (
          <Reveal key={p.role + p.period} delay={i * 0.05}>
            <div className="relative pb-14 last:pb-0">
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

              <ul className="mt-4 space-y-2.5">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

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
