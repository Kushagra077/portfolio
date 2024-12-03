"use client";

import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, Rocket } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  image: string;
}

export function ProjectCard({ title, description, tags, demoUrl, githubUrl, image }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all" data-aos="fade-up">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Rocket className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-foreground/80">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            {githubUrl && (
              <Button variant="outline" size="sm" className="group" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {demoUrl && (
              <Button variant="outline" size="sm" className="group" asChild>
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}