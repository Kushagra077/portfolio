import { PageHeader } from '@/components/page-header';
import { ArticlesFeed } from '@/components/articles/articles-feed';

export const metadata = {
  title: 'Articles — Kushagra Pandya',
  description: 'Notes and deep-dives on building AI systems, synced live from Medium.',
};

export default function ArticlesPage() {
  return (
    <div className="container pt-16">
      <PageHeader
        eyebrow="Writing"
        title="Articles."
        subtitle="Notes and deep-dives on building AI systems — synced live from Medium."
      />

      <ArticlesFeed />
    </div>
  );
}
