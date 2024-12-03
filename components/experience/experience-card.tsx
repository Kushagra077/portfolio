"use client";

import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export function ExperienceCard({ title, company, period, responsibilities, technologies }: ExperienceCardProps) {
  return (
    <Card className="p-6 md:p-8 hover:shadow-lg transition-all" data-aos="fade-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{company}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{period}</p>
        
        <ul className="list-disc list-inside space-y-2">
          {responsibilities.map((item, index) => (
            <li key={index} className="text-foreground/80">{item}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}