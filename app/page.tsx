"use client";

import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Vote, Users, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const stages = [
    {
      title: "Express Opinions",
      description: "Share your project ideas and gather initial support",
      icon: Lightbulb,
      href: "/express",
      color: "text-yellow-500",
    },
    {
      title: "Community Voting",
      description: "Projects are voted on by the community",
      icon: Vote,
      href: "/vote",
      color: "text-blue-500",
    },
    {
      title: "Find Contributors",
      description: "Connect with people who can help realize the project",
      icon: Users,
      href: "/contributors",
      color: "text-green-500",
    },
    {
      title: "Implementation",
      description: "Execute the project with your team",
      icon: Target,
      href: "/implementation",
      color: "text-purple-500",
    },
  ];

  return (
    <main className="container px-4 py-16 mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          4-Stage Project Management Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn your ideas into reality through our structured approach to project
          development and community collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stages.map((stage, index) => (
          <Link
            key={stage.title}
            href={stage.href}
            className="group hover:shadow-lg transition-shadow rounded-lg p-6 bg-card"
          >
            <div className="flex items-center justify-between mb-2">
              <stage.icon className={`w-8 h-8 ${stage.color}`} />
              <span className="text-2xl font-bold text-muted-foreground">
                {(index + 1).toString().padStart(2, "0")}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {stage.title}
            </h2>
            <p className="text-muted-foreground">{stage.description}</p>
          </Link>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Latest Projects</h2>
        <ProjectGrid />
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link href="/express">
            Start Your Project Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </main>
  );
}