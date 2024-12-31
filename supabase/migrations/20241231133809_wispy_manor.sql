/*
  # Initial schema setup

  1. New Tables
    - `projects`: Stores project information and metadata
    - `project_supports`: Tracks user support for projects
    - `project_votes`: Records user votes on projects
    - `project_comments`: Stores project comments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Projects table
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

-- Project supports table
CREATE TABLE IF NOT EXISTS project_supports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Project votes table
CREATE TABLE IF NOT EXISTS project_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  vote text CHECK (vote IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Project comments table
CREATE TABLE IF NOT EXISTS project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_supports ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Project supports policies
CREATE POLICY "Anyone can view project supports"
  ON project_supports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can support projects"
  ON project_supports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Project votes policies
CREATE POLICY "Anyone can view project votes"
  ON project_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can vote on projects"
  ON project_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Project comments policies
CREATE POLICY "Anyone can view project comments"
  ON project_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON project_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON project_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);