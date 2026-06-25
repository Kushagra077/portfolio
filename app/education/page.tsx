import { education } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/motion';

export const metadata = {
  title: 'Education — Kushagra Pandya',
  description: 'Foundations in computer science and AI.',
};

export default function EducationPage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Education"
        title="Education."
        subtitle="Foundations in computer science and AI."
      />

      <Reveal>
        <div className="relative mt-14 overflow-hidden rounded-lg border border-border bg-card p-8 sm:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] font-bold leading-none text-foreground/[0.03] sm:text-[14rem]"
          >
            2024
          </span>

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {education.period} · {education.location}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {education.degree}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">{education.institution}</p>

            <div className="mt-5 inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 font-mono text-sm text-primary">
              CPI {education.cpi}
            </div>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              {education.detail}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {education.courses.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
