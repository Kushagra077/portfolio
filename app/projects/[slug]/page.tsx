import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects, getProject } from '@/lib/data';
import { SystemDiagram } from '@/components/diagrams/system-diagram';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Kushagra Pandya`,
    description: project.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="container pt-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to work
      </Link>

      {/* Hero */}
      <section className="mt-10 max-w-3xl">
        <Reveal>
          <p className="label-mono">Case study / {project.category}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {project.name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            View on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </section>

      {/* Architecture */}
      <section className="mt-24">
        <Reveal>
          <p className="label-mono">Architecture</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 rounded-lg border border-border bg-card p-6 sm:p-10">
            <SystemDiagram diagram={project.diagram} />
          </div>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="mt-24 max-w-3xl">
        <Reveal>
          <p className="label-mono">How it works</p>
        </Reveal>
        <Stagger className="mt-10 flex flex-col gap-12">
          {project.steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex gap-6">
                <span className="font-mono text-sm text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Highlights */}
      <section className="mt-24">
        <Reveal>
          <p className="label-mono">Engineering highlights</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.highlights.map((h) => (
            <StaggerItem key={h}>
              <div className="h-full rounded-lg border border-border bg-card p-6">
                <p className="leading-relaxed text-foreground">{h}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Next */}
      <section className="mt-24 border-t border-border pt-10">
        <Link href={`/projects/${next.slug}`} className="group block">
          <p className="label-mono">Next project</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground transition group-hover:text-primary">
            {next.name} →
          </p>
        </Link>
      </section>
    </div>
  );
}
