import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type {
  SandwichSubmission,
  SandwichWithIngredients,
  SandwichFormData,
  GalleryFilters,
  SelectedIngredient
} from '@/types/sandwich';

// Fetch all submissions with ingredients
export const useSubmissions = (filters?: GalleryFilters) => {
  return useQuery({
    queryKey: ['submissions', filters],
    queryFn: async () => {
      let query = supabase
        .from('sandwich_submissions')
        .select(`
          *,
          ingredients:sandwich_ingredients(
            *,
            ingredient:ingredients(*)
          )
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.winnersOnly) {
        query = query.eq('is_winner', true);
      }

      if (filters?.month) {
        query = query.eq('winner_month', filters.month);
      }

      if (filters?.searchTerm) {
        query = query.or(
          `sandwich_name.ilike.%${filters.searchTerm}%,creator_name.ilike.%${filters.searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as SandwichWithIngredients[];
    },
  });
};

// Fetch a single submission by ID
export const useSubmission = (id: string) => {
  return useQuery({
    queryKey: ['submission', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sandwich_submissions')
        .select(`
          *,
          ingredients:sandwich_ingredients(
            *,
            ingredient:ingredients(*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as SandwichWithIngredients;
    },
    enabled: !!id,
  });
};

// Fetch current month's winner
export const useCurrentWinner = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM

  return useQuery({
    queryKey: ['current-winner', currentMonth],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sandwich_submissions')
        .select(`
          *,
          ingredients:sandwich_ingredients(
            *,
            ingredient:ingredients(*)
          )
        `)
        .eq('is_winner', true)
        .eq('winner_month', currentMonth)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      return data as SandwichWithIngredients | null;
    },
  });
};

// Create a new sandwich submission
export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
      ingredients,
    }: {
      formData: SandwichFormData;
      ingredients: SelectedIngredient[];
    }) => {
      // Create the submission
      const { data: submission, error: submissionError } = await supabase
        .from('sandwich_submissions')
        .insert({
          sandwich_name: formData.sandwich_name,
          creator_name: formData.creator_name,
          creator_email: formData.creator_email || null,
          description: formData.description || null,
          is_winner: false,
          votes: 0,
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      // Create the ingredients associations
      const ingredientInserts = ingredients.map((ing) => ({
        submission_id: submission.id,
        ingredient_id: ing.id,
        layer_order: ing.layer_order,
      }));

      const { error: ingredientsError } = await supabase
        .from('sandwich_ingredients')
        .insert(ingredientInserts);

      if (ingredientsError) throw ingredientsError;

      return submission;
    },
    onSuccess: () => {
      // Invalidate submissions cache to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
};
