import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data';

export const dynamic = 'force-static';

const base = 'https://www.kushagrapandya.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/projects', '/skills', '/experience', '/education', '/publications', '/articles'];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...projects.map((proj) => ({ url: `${base}/projects/${proj.slug}` })),
  ];
}
