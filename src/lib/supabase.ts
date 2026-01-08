import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured (not placeholder values)
const isConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_project_url_here' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  supabaseUrl.startsWith('http');

// Create a dummy URL for development if not configured
const dummyUrl = 'https://placeholder.supabase.co';
const dummyKey = 'placeholder-key-replace-with-real-key-from-supabase-dashboard';

export const supabase = createClient<Database>(
  isConfigured ? supabaseUrl : dummyUrl,
  isConfigured ? supabaseAnonKey : dummyKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Export a flag to check if Supabase is configured
export const isSupabaseConfigured = isConfigured;
