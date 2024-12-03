"use client";

import { Card } from '@/components/ui/card';
import { expertiseIconMap } from '@/lib/constants';
import { Expertise } from '@/lib/types';

interface ExpertiseSectionProps {
  expertise: Expertise[];
}

export function ExpertiseSection({ expertise }: ExpertiseSectionProps) {
  return (
    <section className="py-24" data-aos="fade-up">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Core Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertise.map(({ title, description, icon }) => {
          const Icon = expertiseIconMap[icon];
          return (
            <Card
              key={title}
              className="p-8 hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="mb-6 p-3 w-14 h-14 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}