import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BuilderCanvas } from '@/components/sandwich-builder/BuilderCanvas';
import { WinnerBadge } from '@/components/gallery/WinnerBadge';
import { useCurrentWinner } from '@/hooks/useSubmissions';
import type { SelectedIngredient } from '@/types/sandwich';
import { fadeInVariants } from '@/lib/animations';

export const MonthlyWinnerSection = () => {
  const { data: currentWinner, isLoading, error } = useCurrentWinner();

  // Convert sandwich ingredients to SelectedIngredient format
  const selectedIngredients: SelectedIngredient[] = currentWinner?.ingredients
    ? currentWinner.ingredients
        .sort((a, b) => a.layer_order - b.layer_order)
        .map((si) => ({
          ...si.ingredient!,
          layer_order: si.layer_order,
        }))
    : [];

  return (
    <section className="section-padding bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <div className="container-rustic">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-4">
            Sandwich of the Month
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out this month's winning sandwich creation from our community contest!
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading this month's winner...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600">Unable to load the winner at this time.</p>
          </div>
        )}

        {/* No Winner State */}
        {!isLoading && !error && !currentWinner && (
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-16 bg-white/60 rounded-2xl backdrop-blur-sm"
          >
            <Award className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-accent mb-2">
              No Winner Yet This Month
            </h3>
            <p className="text-muted-foreground mb-6">
              Submit your creative sandwich to compete for Sandwich of the Month!
            </p>
            <Link to="/sandwich-builder" className="btn-rustic inline-flex items-center gap-2">
              Create Your Sandwich
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Winner Display */}
        {!isLoading && !error && currentWinner && (
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl p-6 md:p-12"
          >
            {/* Left: Sandwich Visualization */}
            <div className="order-2 md:order-1">
              <BuilderCanvas
                selectedIngredients={selectedIngredients}
                onRemoveIngredient={() => {}}
                isInteractive={false}
              />
            </div>

            {/* Right: Details */}
            <div className="order-1 md:order-2">
              <div className="flex justify-center md:justify-start mb-4">
                <WinnerBadge
                  month={currentWinner.winner_month || undefined}
                  size="lg"
                />
              </div>

              <h3 className="font-chalk text-3xl text-accent mb-3">
                {currentWinner.sandwich_name}
              </h3>

              <p className="text-muted-foreground mb-2">
                Created by <span className="font-semibold text-accent">{currentWinner.creator_name}</span>
              </p>

              {currentWinner.description && (
                <p className="text-muted-foreground mb-6 italic">
                  "{currentWinner.description}"
                </p>
              )}

              {/* Ingredients List */}
              <div className="mb-6">
                <h4 className="font-bold text-accent mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Ingredients ({selectedIngredients.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedIngredients.map((ing, idx) => (
                    <div
                      key={`${ing.id}-${idx}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground bg-cream/50 px-3 py-2 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {ing.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link to="/sandwich-builder" className="btn-rustic inline-flex items-center gap-2">
                Build Your Own Sandwich
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
