"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            4-Stage Project Management Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your ideas into reality through our structured approach to project development and community collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => (
            <Card key={stage.title} className="group hover:shadow-lg transition-shadow">
              <Link href={stage.href}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <stage.icon className={`w-8 h-8 ${stage.color}`} />
                    <span className="text-2xl font-bold text-muted-foreground">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {stage.title}
                  </CardTitle>
                  <CardDescription>{stage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <Link href="/express">
              Start Your Project Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}