"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000),
  goals: z.string().min(20, "Goals must be at least 20 characters").max(500),
  resources: z.string().min(20, "Resources must be at least 20 characters").max(500),
  timeline: z.string().min(10, "Timeline must be at least 10 characters").max(200),
});

export default function ExpressOpinions() {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      goals: "",
      resources: "",
      timeline: "",
    },
  });

  function onSubmit(values: z.infer<typeof projectSchema>) {
    console.log(values);
    // TODO: Implement project submission
  }

  return (
    <div className="container px-4 py-16 mx-auto max-w-3xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Express Your Project Idea</CardTitle>
          <CardDescription>
            Share your project proposal and gather community support. Projects need sufficient support to advance to the voting stage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your project title" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear and concise title for your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project in detail"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain what your project is about and why it matters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List the main goals of your project"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What do you aim to achieve with this project?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Resources</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List the resources needed for your project"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What resources (financial, technical, human) will you need?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline Estimation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Estimated timeline for completion"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide an estimated timeline for project completion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full">
                Submit Project Proposal
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}