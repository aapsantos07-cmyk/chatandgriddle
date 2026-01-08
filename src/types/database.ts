// Supabase database types (auto-generated style)
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
      ingredient_categories: {
        Row: {
          id: string
          name: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          display_order: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_order?: number
          created_at?: string
        }
      }
      ingredients: {
        Row: {
          id: string
          category_id: string
          name: string
          svg_path: string
          price_modifier: number
          is_available: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          svg_path: string
          price_modifier?: number
          is_available?: boolean
          display_order: number
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          svg_path?: string
          price_modifier?: number
          is_available?: boolean
          display_order?: number
          created_at?: string
        }
      }
      sandwich_submissions: {
        Row: {
          id: string
          sandwich_name: string
          creator_name: string
          creator_email: string | null
          description: string | null
          image_url: string | null
          is_winner: boolean
          winner_month: string | null
          votes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sandwich_name: string
          creator_name: string
          creator_email?: string | null
          description?: string | null
          image_url?: string | null
          is_winner?: boolean
          winner_month?: string | null
          votes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sandwich_name?: string
          creator_name?: string
          creator_email?: string | null
          description?: string | null
          image_url?: string | null
          is_winner?: boolean
          winner_month?: string | null
          votes?: number
          created_at?: string
          updated_at?: string
        }
      }
      sandwich_ingredients: {
        Row: {
          id: string
          submission_id: string
          ingredient_id: string
          layer_order: number
          created_at: string
        }
        Insert: {
          id?: string
          submission_id: string
          ingredient_id: string
          layer_order: number
          created_at?: string
        }
        Update: {
          id?: string
          submission_id?: string
          ingredient_id?: string
          layer_order?: number
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
