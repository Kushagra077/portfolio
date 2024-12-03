"use client";

import { SkillCategory } from "./skill-category";
import {
  Code2,
  Brain,
  Database,
  BarChart,
  Cloud,
  Terminal,
} from "lucide-react";

const iconMap = {
  Code2,
  Brain,
  Database,
  BarChart,
  Cloud,
  Terminal,
};

interface SkillsGridProps {
  categories: Array<{
    title: string;
    icon: keyof typeof iconMap;
    skills: string[];
  }>;
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <SkillCategory
          key={category.title}
          title={category.title}
          icon={iconMap[category.icon]}
          skills={category.skills}
        />
      ))}
    </div>
  );
}