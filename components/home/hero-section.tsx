"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { SocialLinks } from './social-links';
import { HomeMetadata } from '@/lib/types';

interface HeroSectionProps {
  metadata: HomeMetadata;
}

export function HeroSection({ metadata }: HeroSectionProps) {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-12">
      <div className="flex-1 space-y-8" data-aos="fade-right">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            {metadata.title}
          </h1>
          <p className="text-2xl text-muted-foreground font-light">
            {metadata.subtitle}
          </p>
        </div>
        <p className="text-lg text-muted-foreground max-w-prose leading-relaxed">
          {metadata.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="group" asChild>
            <a href="/resume">
              View Resume{" "}
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </Button>
          <SocialLinks links={metadata.socialLinks} />
        </div>
      </div>
      <div className="flex-1 flex justify-center" data-aos="fade-left">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/0 animate-pulse" />
          <Image
            src={metadata.profileImage}
            alt="Profile picture"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}