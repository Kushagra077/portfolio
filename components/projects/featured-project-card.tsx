import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 sm:p-8">
      <p className="label-mono">
        {project.index} / {project.category}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
        {project.name}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{project.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2">
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
    </article>
  );
}
