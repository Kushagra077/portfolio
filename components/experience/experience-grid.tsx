"use client";

import { ExperienceCard } from "./experience-card";

interface Position {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

interface ExperienceGridProps {
  positions: Position[];
}

export function ExperienceGrid({ positions }: ExperienceGridProps) {
  return (
    <div className="grid gap-6">
      {positions.map((position, index) => (
        <ExperienceCard
          key={index}
          title={position.title}
          company={position.company}
          period={position.period}
          responsibilities={position.responsibilities}
          technologies={position.technologies}
        />
      ))}
    </div>
  );
}