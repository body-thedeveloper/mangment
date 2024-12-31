"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function useSupport() {
  const [supportedProjects, setSupportedProjects] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSupportedProjects();
  }, []);

  async function fetchSupportedProjects() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("project_supports")
      .select("project_id")
      .eq("user_id", user.id);

    if (data) {
      setSupportedProjects(data.map(support => support.project_id));
    }
  }

  async function toggleSupport(projectId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to support projects",
        variant: "destructive",
      });
      return;
    }

    const isSupported = supportedProjects.includes(projectId);
    
    if (isSupported) {
      const { error } = await supabase
        .from("project_supports")
        .delete()
        .eq("project_id", projectId)
        .eq("user_id", user.id);

      if (!error) {
        setSupportedProjects(prev => prev.filter(id => id !== projectId));
      }
    } else {
      const { error } = await supabase
        .from("project_supports")
        .insert({ project_id: projectId, user_id: user.id });

      if (!error) {
        setSupportedProjects(prev => [...prev, projectId]);
      }
    }
  }

  return { supportedProjects, toggleSupport };
}