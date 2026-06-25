import Link from 'next/link';
import { projects } from '@/lib/data';
import { Hero } from '@/components/home/hero';
import { ProjectCard } from '@/components/projects/project-card';
import { Reveal } from '@/components/motion';

export default function Home() {
  return (
    <div className="container">
      <Hero />

      <section className="pb-8">
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-border pt-10">
            <p className="label-mono">Selected work / 2024—2025</p>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition hover:text-primary"
            >
              All work →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
