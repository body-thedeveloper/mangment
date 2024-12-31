"use client";

import { ProjectCard } from "./project-card";
import { useProjects } from "@/hooks/use-projects";
import { useSupport } from "@/hooks/use-support";

export function ProjectGrid() {
  const { projects, loading } = useProjects();
  const { supportedProjects, toggleSupport } = useSupport();

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSupport={toggleSupport}
          isSupported={supportedProjects.includes(project.id)}
        />
      ))}
    </div>
  );
}