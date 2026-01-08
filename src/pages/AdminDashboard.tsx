import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut, Award, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { SandwichCard } from '@/components/gallery/SandwichCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth, useLogout, useMarkWinner, useSubmissionStats } from '@/hooks/useAdmin';
import { useSubmissions } from '@/hooks/useSubmissions';
import { useToast } from '@/hooks/use-toast';
import { winnerConfetti } from '@/lib/animations';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: user, isLoading: authLoading } = useAuth();
  const { mutate: logout } = useLogout();
  const { mutate: markWinner, isPending: isMarkingWinner } = useMarkWinner();
  const { data: submissions, isLoading: submissionsLoading } = useSubmissions();
  const { data: stats } = useSubmissionStats();

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 7);
  });

  // Generate month options
  const getMonthOptions = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthValue = date.toISOString().slice(0, 7);
      const monthLabel = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      months.push({ value: monthValue, label: monthLabel });
    }
    return months;
  };

  const monthOptions = getMonthOptions();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast({
          title: 'Logged out',
          description: 'You have been successfully logged out.',
        });
        navigate('/');
      },
    });
  };

  const handleMarkWinner = (submissionId: string) => {
    markWinner(
      { submissionId, month: selectedMonth },
      {
        onSuccess: () => {
          winnerConfetti();
          toast({
            title: 'Winner selected!',
            description: 'The sandwich has been marked as winner for this month.',
          });
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error instanceof Error ? error.message : 'Failed to mark winner',
            variant: 'destructive',
          });
        },
      }
    );
  };

  // Show login if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  // Get submissions for selected month
  const monthSubmissions = submissions?.filter((sub) => {
    const subMonth = sub.created_at?.slice(0, 7);
    return subMonth === selectedMonth;
  });

  const currentWinner = monthSubmissions?.find((sub) => sub.is_winner);

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Manage sandwich submissions and select monthly winners"
      />

      <div className="min-h-screen bg-cream py-12">
        <div className="container-rustic">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-chalk text-accent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage submissions and select monthly winners
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Submissions</p>
                  <p className="text-3xl font-bold text-primary">{stats?.total || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/30" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-primary">{stats?.thisMonth || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/30" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Winners</p>
                  <p className="text-3xl font-bold text-yellow-500">{stats?.winners || 0}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500/30" />
              </div>
            </div>
          </div>

          {/* Month Selector */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-4">
              <label className="font-medium text-accent">Select Month:</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Winner */}
          {currentWinner && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Current Winner for {monthOptions.find(m => m.value === selectedMonth)?.label}
              </h2>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 border-2 border-yellow-300">
                <div className="max-w-md mx-auto">
                  <SandwichCard sandwich={currentWinner} />
                </div>
              </div>
            </div>
          )}

          {/* Submissions List */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-4">
              Submissions for {monthOptions.find(m => m.value === selectedMonth)?.label}
              <span className="text-muted-foreground font-normal ml-2">
                ({monthSubmissions?.length || 0})
              </span>
            </h2>

            {submissionsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
                <span className="text-muted-foreground">Loading submissions...</span>
              </div>
            ) : monthSubmissions && monthSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {monthSubmissions.map((sandwich) => (
                  <div key={sandwich.id} className="relative">
                    <SandwichCard sandwich={sandwich} />
                    {!sandwich.is_winner && (
                      <Button
                        onClick={() => handleMarkWinner(sandwich.id!)}
                        className="w-full mt-2 btn-rustic"
                        disabled={isMarkingWinner}
                      >
                        {isMarkingWinner ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Marking...
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Mark as Winner
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg">
                <p className="text-muted-foreground">
                  No submissions for this month yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
