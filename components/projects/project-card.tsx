"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import type { Project } from "@/types/database";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onSupport?: (id: string) => void;
  isSupported?: boolean;
}

export function ProjectCard({ project, onSupport, isSupported }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Support: {project.support_count}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSupport?.(project.id)}
              className={cn(isSupported && "text-red-500")}
            >
              <Heart className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <a href={`/projects/${project.id}`}>View Details</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}