import { site } from '@/lib/data';

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  content?: string;
}

function unwrap(raw = '') {
  return raw
    .replace(/^\s*<!\[CDATA\[/, '')
    .replace(/\]\]>\s*$/, '')
    .trim();
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? unwrap(m[1]) : '';
}

// Runs at build time (the site is a static export, so there is no server at
// request time). Medium blocks browser CORS, which is why this isn't client-side.
export async function getMediumPosts(): Promise<FeedItem[]> {
  try {
    const res = await fetch(`https://medium.com/feed/@${site.mediumHandle}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio build)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => {
      const block = m[1];
      const content = tag(block, 'content:encoded');
      return {
        title: tag(block, 'title'),
        link: tag(block, 'link').split('?')[0],
        pubDate: tag(block, 'pubDate'),
        description: content,
        content,
      };
    });
  } catch {
    return [];
  }
}
