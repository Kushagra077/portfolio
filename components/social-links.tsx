import { socials } from '@/lib/data';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
  itemClassName?: string;
}

export function SocialLinks({ className, itemClassName }: SocialLinksProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.url}
            target={s.platform === 'Email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary',
              itemClassName
            )}
          >
            {s.label}
            <span className="translate-y-px text-[0.7em] opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
