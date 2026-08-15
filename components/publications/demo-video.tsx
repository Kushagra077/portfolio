'use client';

import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DemoVideoProps {
  videoId: string;
  title: string;
  /** Shown under the title in the player, e.g. the patent number. */
  context?: string;
}

/**
 * Click-to-play demo player. The YouTube iframe only mounts once the dialog is
 * open, so the patent page loads no third-party frames or cookies up front.
 */
export function DemoVideo({ videoId, title, context }: DemoVideoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-primary transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
            <Play className="h-2.5 w-2.5 fill-current" />
          </span>
          Watch demo
        </button>
      </DialogTrigger>

      {/*
        --demo-h drives everything: the video box takes that height, and the
        dialog takes the matching 9:16 width. Deriving both from one value keeps
        the long patent title from stretching the dialog wider than the video
        (which would letterbox it), while the height cap keeps a vertical Short
        inside the viewport.
      */}
      <DialogContent
        style={{ '--demo-h': 'min(68vh, 600px)' } as React.CSSProperties}
        className="w-[calc(var(--demo-h)*9/16)] max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0"
      >
        <DialogHeader className="space-y-1 border-b border-border px-5 py-4 pr-12 text-left">
          <DialogTitle className="font-display text-sm font-semibold leading-snug tracking-tight">
            {title}
          </DialogTitle>
          {context && (
            <DialogDescription className="font-mono text-[10px] uppercase tracking-[0.12em]">
              {context}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex justify-center bg-black">
          <div className="aspect-[9/16] h-[var(--demo-h)] max-w-full">
            {open && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
          </div>
        </div>

        <div className="border-t border-border px-5 py-3">
          <a
            href={`https://youtu.be/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            Watch on YouTube
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
