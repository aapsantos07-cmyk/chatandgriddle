// TypeScript interfaces for Sandwich Builder feature

export type IngredientCategoryName = 'bread' | 'proteins' | 'cheeses' | 'veggies' | 'sauces' | 'extras';

export interface IngredientCategory {
  id: string;
  name: string;
  display_order: number;
  created_at?: string;
}

export interface Ingredient {
  id: string;
  category_id: string;
  name: string;
  svg_path: string;
  price_modifier: number;
  is_available: boolean;
  display_order: number;
  created_at?: string;
  category?: IngredientCategory;
}

export interface SelectedIngredient extends Ingredient {
  layer_order: number;
}

export interface SandwichSubmission {
  id?: string;
  sandwich_name: string;
  creator_name: string;
  creator_email?: string;
  description?: string;
  image_url?: string;
  is_winner: boolean;
  winner_month?: string;
  votes: number;
  created_at?: string;
  updated_at?: string;
}

export interface SandwichIngredient {
  id?: string;
  submission_id: string;
  ingredient_id: string;
  layer_order: number;
  created_at?: string;
  ingredient?: Ingredient;
}

export interface SandwichWithIngredients extends SandwichSubmission {
  ingredients: SandwichIngredient[];
}

export interface AdminUser {
  id: string;
  email: string;
  created_at?: string;
}

// Form submission types
export interface SandwichFormData {
  sandwich_name: string;
  creator_name: string;
  creator_email?: string;
  description?: string;
}

// Filter types for gallery
export interface GalleryFilters {
  month?: string;
  winnersOnly: boolean;
  searchTerm?: string;
}
