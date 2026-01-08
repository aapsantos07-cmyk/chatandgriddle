import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, Plus, Image as ImageIcon } from 'lucide-react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SandwichCard } from '@/components/gallery/SandwichCard';
import { FilterBar } from '@/components/gallery/FilterBar';
import { WinnerBadge } from '@/components/gallery/WinnerBadge';
import { useSubmissions, useCurrentWinner } from '@/hooks/useSubmissions';
import { fadeInVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations';
import { useAuth } from '@/hooks/useAdmin';
import { AdminLogin } from '@/components/admin/AdminLogin';
import type { GalleryFilters } from '@/types/sandwich';

const SandwichGallery = () => {
  const [filters, setFilters] = useState<GalleryFilters>({
    winnersOnly: false,
  });

  const { data: submissions, isLoading, error } = useSubmissions(filters);
  const { data: currentWinner } = useCurrentWinner();
  const { data: user, isLoading: authLoading } = useAuth();

  // Separate current winner from other submissions
  const otherSubmissions = submissions?.filter(
    (sub) => !currentWinner || sub.id !== currentWinner.id
  );

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <AdminLogin />;
  }

  return (
    <>
      <SEO
        title="Sandwich Gallery"
        description="Browse creative sandwich submissions and see our Sandwich of the Month winners at Chat & Griddle"
        keywords="sandwich gallery, sandwich contest, Chat & Griddle submissions"
      />
      <Navigation />

      <div className="min-h-screen bg-cream py-24 md:py-28">
        <div className="container-rustic">
          {/* Header */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-chalk text-accent mb-4">
              Sandwich Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Explore amazing sandwich creations from our community. Vote for your favorites
              and discover the Sandwich of the Month!
            </p>
            <Link to="/sandwich-builder">
              <Button className="btn-rustic">
                <Plus className="w-4 h-4 mr-2" />
                Create Your Own
              </Button>
            </Link>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </motion.div>

          {/* Current Winner Showcase */}
          {currentWinner && !filters.month && !filters.searchTerm && (
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-8 border-2 border-yellow-300">
                <div className="flex justify-center mb-4">
                  <WinnerBadge
                    month={currentWinner.winner_month || undefined}
                    size="lg"
                  />
                </div>
                <h2 className="text-3xl font-chalk text-center text-accent mb-6">
                  Current Winner
                </h2>
                <div className="max-w-md mx-auto">
                  <SandwichCard sandwich={currentWinner} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
              <span className="text-muted-foreground">Loading sandwiches...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-2">Error loading submissions</p>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && submissions?.length === 0 && (
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="text-center py-20"
            >
              <ImageIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-accent mb-2">
                No Sandwiches Found
              </h3>
              <p className="text-muted-foreground mb-6">
                {filters.winnersOnly || filters.month || filters.searchTerm
                  ? 'Try adjusting your filters'
                  : 'Be the first to create a sandwich!'}
              </p>
              <Link to="/sandwich-builder">
                <Button className="btn-rustic">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Sandwich
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Submissions Grid */}
          {!isLoading && !error && otherSubmissions && otherSubmissions.length > 0 && (
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-accent mb-6">
                {filters.winnersOnly
                  ? 'Past Winners'
                  : filters.month
                  ? 'Submissions'
                  : 'All Submissions'}
                <span className="text-muted-foreground font-normal ml-2">
                  ({otherSubmissions.length})
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {otherSubmissions.map((sandwich) => (
                  <motion.div key={sandwich.id} variants={staggerItemVariants}>
                    <SandwichCard sandwich={sandwich} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SandwichGallery;
