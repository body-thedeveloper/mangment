"use client";

import { ProjectCard } from "./project-card";
import { useProjects } from "@/hooks/use-projects";
import { useSupport } from "@/hooks/use-support";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectGridProps {
  stage?: string;
}

export function ProjectGrid({ stage }: ProjectGridProps) {
  const { projects, loading } = useProjects(stage);
  const { supportedProjects, toggleSupport } = useSupport();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No projects found</p>
      </div>
    );
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