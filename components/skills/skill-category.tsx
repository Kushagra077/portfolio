"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SkillCategoryProps {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export function SkillCategory({ title, icon: Icon, skills }: SkillCategoryProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all" data-aos="fade-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </Card>
  );
}