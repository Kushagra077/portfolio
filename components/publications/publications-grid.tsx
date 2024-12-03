"use client";

import { PublicationCard } from "./publication-card";

interface Publication {
  title: string;
  venue: string;
  year: string;
  description: string;
  paperUrl: string;
  codeUrl?: string;
}

interface PublicationsGridProps {
  publications: Publication[];
}

export function PublicationsGrid({ publications }: PublicationsGridProps) {
  return (
    <div className="grid gap-6">
      {publications.map((publication, index) => (
        <PublicationCard
          key={index}
          title={publication.title}
          venue={publication.venue}
          year={publication.year}
          description={publication.description}
          paperUrl={publication.paperUrl}
          codeUrl={publication.codeUrl}
        />
      ))}
    </div>
  );
}