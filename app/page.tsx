import { getMarkdownContent } from '@/lib/markdown';
import { HomeMetadata } from '@/lib/types';
import { HeroSection } from '@/components/home/hero-section';
import { ExpertiseSection } from '@/components/home/expertise-section';
import { FeaturedProjects } from '@/components/home/featured-projects';

export default function Home() {
  const { metadata } = getMarkdownContent('home') as { metadata: HomeMetadata };

  return (
    <div className="container px-4 mx-auto">
      <HeroSection metadata={metadata} />
      <ExpertiseSection expertise={metadata.expertise} />
      <FeaturedProjects projects={metadata.featuredProjects} />
    </div>
  );
}