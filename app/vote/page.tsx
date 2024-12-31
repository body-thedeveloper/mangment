"use client";

import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VotePage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-4xl font-bold tracking-tight mb-8">Vote on Projects</h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
        Support the projects you believe in. Projects with sufficient votes will advance to the contributor stage.
      </p>

      <ProjectGrid stage="vote" />
    </div>
  );
}