import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { ProjectCard } from '@/components/projects/project-card';
import { Reveal } from '@/components/motion';

export const metadata = {
  title: 'Work — Kushagra Pandya',
  description: 'Production-grade AI systems built and shipped by Kushagra Pandya.',
};

export default function ProjectsPage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Selected work"
        title="Things I've built and shipped."
        subtitle="Production-grade AI systems — agentic pipelines and multi-agent applications, taken from notebook to deployment."
      />

      <div className="mt-14 flex flex-col gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <Reveal>
        <a
          href="https://github.com/Kushagra077"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-between rounded-lg border border-dashed border-border bg-card/40 p-6 transition hover:border-foreground/30"
        >
          <div>
            <p className="label-mono">More work</p>
            <p className="mt-1 text-lg font-medium text-foreground">More projects on GitHub</p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
        </a>
      </Reveal>
    </div>
  );
}
