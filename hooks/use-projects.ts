"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export function useProjects(stage?: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (stage) {
          query = query.eq('stage', stage);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          if (supabaseError.code === '42P01') {
            // Table doesn't exist yet - this is expected on first load
            if (mounted) {
              setProjects([]);
            }
          } else {
            throw supabaseError;
          }
        } else if (mounted) {
          setProjects(data || []);
        }
      } catch (e) {
        console.error('Error fetching projects:', e);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again later.",
          variant: "destructive",
        });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, [stage, toast]);

  return { projects, loading };
}