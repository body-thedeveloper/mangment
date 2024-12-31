export type Project = {
  id: string;
  title: string;
  description: string;
  goals: string;
  resources: string;
  timeline: string;
  created_at: string;
  user_id: string;
  stage: 'express' | 'vote' | 'contribute' | 'implement';
  support_count: number;
  vote_count: number;
};

export type ProjectSupport = {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
};

export type ProjectVote = {
  id: string;
  project_id: string;
  user_id: string;
  vote: 'up' | 'down';
  created_at: string;
};

export type ProjectComment = {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
};