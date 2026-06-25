'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/data';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  content?: string;
}

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; items: FeedItem[] };

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatDate(s: string) {
  const d = new Date(s);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ArticlesFeed() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const feed = `https://medium.com/feed/@${site.mediumHandle}`;
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
    let cancelled = false;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.status === 'ok' && Array.isArray(data.items)) {
          setState({ status: 'ready', items: data.items });
        } else {
          setState({ status: 'error' });
        }
      })
      .catch(() => !cancelled && setState({ status: 'error' }));

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === 'loading') {
    return (
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-lg border border-border bg-card/50" />
        ))}
      </div>
    );
  }

  if (state.status === 'error' || state.items.length === 0) {
    return (
      <div className="mt-14 rounded-lg border border-dashed border-border bg-card/40 p-10 text-center">
        <p className="text-muted-foreground">
          {state.status === 'error'
            ? "Couldn't load the live feed right now."
            : 'No articles published yet — check back soon.'}
        </p>
        <a
          href={`https://medium.com/@${site.mediumHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          Visit Medium
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2">
      {state.items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground/20"
        >
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt=""
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-44 w-full items-center justify-center border-b border-border bg-secondary">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Medium
              </span>
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Medium · {formatDate(item.pubDate)}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {stripHtml(item.description).slice(0, 160)}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Read on Medium
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
