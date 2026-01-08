import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Ingredient, IngredientCategory } from '@/types/sandwich';

// Fetch all ingredient categories
export const useIngredientCategories = () => {
  return useQuery({
    queryKey: ['ingredient-categories'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        throw new Error(
          'Supabase is not configured. Please follow the setup guide in SUPABASE_SETUP.md'
        );
      }

      const { data, error } = await supabase
        .from('ingredient_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as IngredientCategory[];
    },
  });
};

// Fetch all ingredients with their categories
export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        throw new Error(
          'Supabase is not configured. Please follow the setup guide in SUPABASE_SETUP.md'
        );
      }

      const { data, error } = await supabase
        .from('ingredients')
        .select(`
          *,
          category:ingredient_categories(*)
        `)
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Ingredient[];
    },
  });
};

// Fetch ingredients by category
export const useIngredientsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['ingredients', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Ingredient[];
    },
    enabled: !!categoryId,
  });
};

// Helper function to group ingredients by category
export const useGroupedIngredients = () => {
  const { data: ingredients, ...rest } = useIngredients();

  const groupedIngredients = ingredients?.reduce((acc, ingredient) => {
    const categoryName = ingredient.category?.name || 'Other';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(ingredient);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return {
    ...rest,
    data: groupedIngredients,
  };
};
