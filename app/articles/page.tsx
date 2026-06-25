import { PageHeader } from '@/components/page-header';
import { ArticlesFeed } from '@/components/articles/articles-feed';

export const metadata = {
  title: 'Articles — Kushagra Pandya',
  description: 'Notes and deep-dives on building AI systems, synced live from Medium.',
};

export default function ArticlesPage() {
  return (
    <div className="container pt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader
          eyebrow="Writing"
          title="Articles."
          subtitle="Notes and deep-dives on building AI systems — synced live from Medium."
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
          // auto-pulled via RSS
        </p>
      </div>

      <ArticlesFeed />
    </div>
  );
}
