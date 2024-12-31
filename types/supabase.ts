export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          goals: string
          resources: string
          timeline: string
          created_at: string
          user_id: string
          stage: 'express' | 'vote' | 'contribute' | 'implement'
          support_count: number
          vote_count: number
        }
        Insert: {
          id?: string
          title: string
          description: string
          goals: string
          resources: string
          timeline: string
          created_at?: string
          user_id: string
          stage?: 'express' | 'vote' | 'contribute' | 'implement'
          support_count?: number
          vote_count?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          goals?: string
          resources?: string
          timeline?: string
          created_at?: string
          user_id?: string
          stage?: 'express' | 'vote' | 'contribute' | 'implement'
          support_count?: number
          vote_count?: number
        }
      }
    }
  }
}