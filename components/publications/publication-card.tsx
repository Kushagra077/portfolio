"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, ExternalLink } from "lucide-react";

interface PublicationCardProps {
  title: string;
  venue: string;
  year: string;
  description: string;
  paperUrl: string;
  codeUrl?: string;
}

export function PublicationCard({ title, venue, year, description, paperUrl, codeUrl }: PublicationCardProps) {
  return (
    <Card className="p-6 md:p-8 hover:shadow-lg transition-all" data-aos="fade-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{venue}, {year}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-foreground/80">{description}</p>

        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="group" asChild>
            <a href={paperUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Read Paper
            </a>
          </Button>
          {codeUrl && (
            <Button variant="outline" size="sm" className="group" asChild>
              <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                <Code className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}