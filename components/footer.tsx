import Link from 'next/link';
import { site } from '@/lib/data';
import { SocialLinks } from '@/components/social-links';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="font-mono text-sm font-bold tracking-tight text-foreground">
            {site.name}
          </Link>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {site.role} · Built with precision
          </p>
        </div>
        <SocialLinks />
      </div>
      <div className="container pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
