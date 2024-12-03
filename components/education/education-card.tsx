"use client";

import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface EducationCardProps {
  degree: string;
  institution: string;
  year: string;
  details: string[];
  courses?: string[];
}

export function EducationCard({ degree, institution, year, details, courses }: EducationCardProps) {
  return (
    <Card className="p-6 md:p-8 hover:shadow-lg transition-all" data-aos="fade-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{degree}</h3>
          <p className="text-muted-foreground">{institution}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{year}</p>
        
        <ul className="list-disc list-inside space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="text-foreground/80">
              {typeof detail === 'string' ? detail : `${Object.keys(detail)[0]}: ${Object.values(detail)[0]}`}
            </li>
          ))}
        </ul>

        {courses && courses.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Key Courses</h4>
            <div className="flex flex-wrap gap-2">
              {courses.map((course, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}