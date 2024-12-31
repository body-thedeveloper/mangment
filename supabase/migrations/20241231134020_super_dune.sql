/*
  # Initial Schema Setup

  1. New Tables
    - `projects`: Main projects table
    - `project_supports`: User support tracking
    - `project_votes`: User voting records
    - `project_comments`: Project comments

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
*/

DO $$ 
BEGIN

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  goals text NOT NULL,
  resources text NOT NULL,
  timeline text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  stage text DEFAULT 'express' CHECK (stage IN ('express', 'vote', 'contribute', 'implement')),
  support_count int DEFAULT 0,
  vote_count int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_supports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

CREATE TABLE IF NOT EXISTS project_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  vote text CHECK (vote IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

CREATE TABLE IF NOT EXISTS project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_supports ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $policies$ 
BEGIN
    -- Projects policies
    EXECUTE 'CREATE POLICY "Anyone can view projects" ON projects FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Users can create projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can update their own projects" ON projects FOR UPDATE USING (auth.uid() = user_id)';

    -- Project supports policies
    EXECUTE 'CREATE POLICY "Anyone can view project supports" ON project_supports FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Users can support projects" ON project_supports FOR INSERT WITH CHECK (auth.uid() = user_id)';

    -- Project votes policies
    EXECUTE 'CREATE POLICY "Anyone can view project votes" ON project_votes FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Users can vote on projects" ON project_votes FOR INSERT WITH CHECK (auth.uid() = user_id)';

    -- Project comments policies
    EXECUTE 'CREATE POLICY "Anyone can view project comments" ON project_comments FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Users can create comments" ON project_comments FOR INSERT WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can update their own comments" ON project_comments FOR UPDATE USING (auth.uid() = user_id)';
EXCEPTION
    WHEN duplicate_object THEN
        NULL;  -- Ignore if policies already exist
END $policies$;

END $$;