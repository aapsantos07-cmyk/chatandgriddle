import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Check if user is authenticated
export const useAuth = () => {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
};

// Mark sandwich as winner
export const useMarkWinner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ submissionId, month }: { submissionId: string; month: string }) => {
      // First, unmark any current winners for this month
      await supabase
        .from('sandwich_submissions')
        .update({ is_winner: false, winner_month: null })
        .eq('winner_month', month);

      // Then mark the new winner
      const { data, error } = await supabase
        .from('sandwich_submissions')
        .update({
          is_winner: true,
          winner_month: month,
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['current-winner'] });
    },
  });
};

// Unmark sandwich as winner
export const useUnmarkWinner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submissionId: string) => {
      const { data, error } = await supabase
        .from('sandwich_submissions')
        .update({
          is_winner: false,
          winner_month: null,
        })
        .eq('id', submissionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['current-winner'] });
    },
  });
};

// Get submission stats
export const useSubmissionStats = () => {
  return useQuery({
    queryKey: ['submission-stats'],
    queryFn: async () => {
      // Get total submissions
      const { count: totalCount } = await supabase
        .from('sandwich_submissions')
        .select('*', { count: 'exact', head: true });

      // Get total winners
      const { count: winnerCount } = await supabase
        .from('sandwich_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('is_winner', true);

      // Get this month's submissions
      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthStart = `${currentMonth}-01T00:00:00`;
      const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split('T')[0] + 'T23:59:59';

      const { count: monthCount } = await supabase
        .from('sandwich_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart)
        .lte('created_at', monthEnd);

      return {
        total: totalCount || 0,
        winners: winnerCount || 0,
        thisMonth: monthCount || 0,
      };
    },
  });
};
