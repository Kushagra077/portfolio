import { Reveal } from '@/components/motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="label-mono">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
