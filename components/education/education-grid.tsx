"use client";

import { EducationCard } from "./education-card";
import { Card } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

interface Degree {
  title: string;
  institution: string;
  period: string;
  details: string[];
  courses?: string[];
}

interface EducationGridProps {
  degrees: Degree[];
  certifications: string[];
}

export function EducationGrid({ degrees, certifications }: EducationGridProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        {degrees.map((degree, index) => (
          <EducationCard
            key={index}
            degree={degree.title}
            institution={degree.institution}
            year={degree.period}
            details={degree.details}
            courses={degree.courses}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Card className="p-6 md:p-8 hover:shadow-lg transition-all" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Professional Certifications</h3>
          </div>
          
          <ul className="list-disc list-inside space-y-2">
            {certifications.map((certification, index) => (
              <li key={index} className="text-foreground/80">{certification}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}