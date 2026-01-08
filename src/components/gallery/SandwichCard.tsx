import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Eye } from 'lucide-react';
import { WinnerBadge } from './WinnerBadge';
import { BuilderCanvas } from '@/components/sandwich-builder/BuilderCanvas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { SandwichWithIngredients, SelectedIngredient } from '@/types/sandwich';
import { hoverScaleVariants } from '@/lib/animations';

interface SandwichCardProps {
  sandwich: SandwichWithIngredients;
}

export const SandwichCard = ({ sandwich }: SandwichCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Convert sandwich ingredients to SelectedIngredient format
  const selectedIngredients: SelectedIngredient[] = sandwich.ingredients
    .sort((a, b) => a.layer_order - b.layer_order)
    .map((si) => ({
      ...si.ingredient!,
      layer_order: si.layer_order,
    }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <motion.div
        variants={hoverScaleVariants}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer
                   border-2 border-gray-100 hover:border-primary/30 hover:shadow-2xl
                   transition-all duration-300 hover:-translate-y-2 relative group"
        onClick={() => setIsDetailOpen(true)}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

        {/* Winner Badge */}
        {sandwich.is_winner && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute top-4 left-4 z-20"
          >
            <WinnerBadge month={sandwich.winner_month || undefined} size="sm" />
          </motion.div>
        )}

        {/* Mini Sandwich Preview */}
        <div className="relative h-56 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50
                        flex items-center justify-center p-6 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
          </div>

          <div className="relative w-full h-full flex items-end justify-center scale-75 drop-shadow-2xl">
            {selectedIngredients.length > 0 ? (
              <div className="relative w-full max-w-[220px]">
                {/* Layered ingredient visualization */}
                <div className="space-y-1.5">
                  {selectedIngredients.slice(0, 5).map((ing, idx) => (
                    <motion.div
                      key={`${ing.id}-${idx}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="w-full h-10 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30
                                 rounded-lg shadow-md border-2 border-primary/20"
                      style={{
                        marginLeft: `${(idx % 2) * 8}px`,
                        transform: `rotate(${(idx % 2 === 0 ? 1 : -1) * 2}deg)`,
                      }}
                    />
                  ))}
                  {selectedIngredients.length > 5 && (
                    <div className="text-center text-xs font-medium text-primary mt-3 bg-white/80
                                    rounded-full px-3 py-1 inline-block">
                      +{selectedIngredients.length - 5} more ingredients
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm font-medium">No ingredients</p>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="relative p-5 bg-white">
          <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-1
                         group-hover:text-primary transition-colors duration-200">
            {sandwich.sandwich_name}
          </h3>

          {sandwich.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {sandwich.description}
            </p>
          )}

          {/* Metadata */}
          <div className="space-y-2 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-full">
                <User className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium">{sandwich.creator_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-secondary/10 rounded-full">
                <Calendar className="w-3 h-3 text-secondary" />
              </div>
              <span>{formatDate(sandwich.created_at!)}</span>
            </div>
          </div>

          {/* View Details Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full border-2 hover:bg-primary hover:text-white hover:border-primary
                       transition-all duration-200 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            View Full Sandwich
          </Button>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-chalk text-primary flex items-center gap-3">
              {sandwich.sandwich_name}
              {sandwich.is_winner && (
                <WinnerBadge month={sandwich.winner_month || undefined} size="sm" />
              )}
            </DialogTitle>
            <DialogDescription>
              Created by {sandwich.creator_name} on {formatDate(sandwich.created_at!)}
            </DialogDescription>
          </DialogHeader>

          {/* Full Sandwich Visualization */}
          <div className="my-6">
            <BuilderCanvas
              selectedIngredients={selectedIngredients}
              onRemoveIngredient={() => {}}
              isInteractive={false}
            />
          </div>

          {/* Description */}
          {sandwich.description && (
            <div className="mb-6">
              <h4 className="font-bold text-accent mb-2">Description</h4>
              <p className="text-muted-foreground">{sandwich.description}</p>
            </div>
          )}

          {/* Ingredients List */}
          <div>
            <h4 className="font-bold text-accent mb-3">
              Ingredients ({selectedIngredients.length})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {selectedIngredients.map((ing, idx) => (
                <div
                  key={`${ing.id}-${idx}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {ing.name}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
