"use client";

import { Button } from '@/components/ui/button';
import { iconMap } from '@/lib/constants';
import { SocialLink } from '@/lib/types';

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map(({ platform, url }) => {
        const Icon = iconMap[platform];
        return (
          <Button key={platform} variant="outline" size="icon" asChild>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{platform}</span>
            </a>
          </Button>
        );
      })}
    </div>
  );
}