import { skillGroups } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Stagger, StaggerItem } from '@/components/motion';

export const metadata = {
  title: 'Skills — Kushagra Pandya',
  description: 'The stack Kushagra Pandya uses to design, build and ship AI systems.',
};

export default function SkillsPage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Capabilities"
        title="Skills & tools."
        subtitle="The stack I use to design, build and ship AI systems."
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem key={group.label}>
            <div className="h-full rounded-lg border border-border bg-card p-6">
              <p className="label-mono">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-[12px] text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
