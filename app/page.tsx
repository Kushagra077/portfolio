import Link from 'next/link';
import { projects, stats, featuredProjectSlugs } from '@/lib/data';
import { Hero } from '@/components/home/hero';
import { FeaturedProjectCard } from '@/components/projects/featured-project-card';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export default function Home() {
  const featured = featuredProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  return (
    <div className="container">
      <Hero />

      {/* Proof points */}
      <section className="border-t border-border pb-20 pt-10">
        <Reveal>
          <p className="label-mono">In production</p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <p className="whitespace-nowrap font-display text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.context}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured work */}
      <section className="pb-8">
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-border pt-10">
            <p className="label-mono">Featured work</p>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition hover:text-primary"
            >
              All {projects.length} projects →
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <FeaturedProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
