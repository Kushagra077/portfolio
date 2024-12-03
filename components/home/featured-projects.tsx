"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { FeaturedProject } from '@/lib/types';

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-24" data-aos="fade-up">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ title, description, tags, demoUrl, githubUrl }) => (
          <Card key={title} className="overflow-hidden">
            <div className="h-48 bg-primary/10" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground mb-4">{description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={githubUrl} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {demoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={demoUrl} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}