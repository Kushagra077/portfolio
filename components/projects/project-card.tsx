import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';
import { SystemDiagram } from '@/components/diagrams/system-diagram';
import { Reveal } from '@/components/motion';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="group grid grid-cols-1 gap-8 rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 sm:p-8 lg:grid-cols-5 lg:gap-10">
        {/* Left: text */}
        <div className="flex flex-col lg:col-span-2">
          <p className="label-mono">
            {project.index} / {project.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-5 pt-7">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
            >
              Case study
              <span aria-hidden>→</span>
            </Link>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-primary"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right: diagram */}
        <div className="flex items-center rounded-md border border-border/60 bg-background/40 p-5 lg:col-span-3">
          <SystemDiagram diagram={project.diagram} />
        </div>
      </article>
    </Reveal>
  );
}
