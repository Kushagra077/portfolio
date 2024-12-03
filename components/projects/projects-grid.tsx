"use client";

import { ProjectCard } from "./project-card";

interface Project {
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  image: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          tags={project.tags}
          demoUrl={project.demoUrl}
          githubUrl={project.githubUrl}
          image={project.image}
        />
      ))}
    </div>
  );
}