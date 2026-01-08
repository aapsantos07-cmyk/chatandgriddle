import { AnimatePresence, motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { SandwichLayer } from './SandwichLayer';
import type { SelectedIngredient } from '@/types/sandwich';

interface BuilderCanvasProps {
  selectedIngredients: SelectedIngredient[];
  onRemoveIngredient: (index: number) => void;
  isInteractive?: boolean;
}

export const BuilderCanvas = ({
  selectedIngredients,
  onRemoveIngredient,
  isInteractive = true,
}: BuilderCanvasProps) => {
  return (
    <div className="relative rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #D4A574 0%, #C49A6C 50%, #B8946A 100%)',
           boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
         }}
    >
      {/* Cutting board wood grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
           style={{
             backgroundImage: `
               repeating-linear-gradient(
                 90deg,
                 transparent,
                 transparent 80px,
                 rgba(0,0,0,0.05) 80px,
                 rgba(0,0,0,0.05) 82px
               ),
               repeating-linear-gradient(
                 0deg,
                 rgba(0,0,0,0.02) 0px,
                 rgba(0,0,0,0.02) 2px,
                 transparent 2px,
                 transparent 4px
               )
             `,
           }}
      />

      {/* Wood grain detail */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
           }}
      />

      {/* Sandwich container */}
      <div className="relative min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-end">
        {/* Empty state */}
        {selectedIngredients.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <ChefHat className="w-20 h-20 text-white/40 mb-6 drop-shadow-lg" />
            </motion.div>
            <p className="text-white/80 text-center font-chalk text-2xl drop-shadow-md mb-2">
              Start building your sandwich!
            </p>
            <p className="text-white/60 text-center text-sm drop-shadow-sm">
              Click ingredients below to add them
            </p>
          </motion.div>
        )}

        {/* Top bun (always visible if ingredients selected) */}
        {selectedIngredients.length > 0 && (
          <div className="relative w-full max-w-md mb-2">
            <img
              src="/ingredients/bread/top-bun.svg"
              alt="Top bun"
              className="w-full h-auto object-contain drop-shadow-lg"
              onError={(e) => {
                // Fallback to generic bread top if specific top-bun doesn't exist
                e.currentTarget.src = '/ingredients/bread/sourdough.svg';
              }}
            />
          </div>
        )}

        {/* Sandwich ingredients stack (filter out bread since we have buns) */}
        <div className="relative w-full max-w-md">
          <AnimatePresence mode="popLayout">
            {selectedIngredients
              .filter((ingredient) => ingredient.category?.name !== 'Bread')
              .map((ingredient, index) => (
                <SandwichLayer
                  key={`${ingredient.id}-${index}`}
                  ingredient={ingredient}
                  index={index}
                  onRemove={() => {
                    // Find the original index in selectedIngredients
                    const originalIndex = selectedIngredients.findIndex(
                      (ing) => ing.id === ingredient.id && ing.layer_order === ingredient.layer_order
                    );
                    if (originalIndex !== -1) {
                      onRemoveIngredient(originalIndex);
                    }
                  }}
                  isInteractive={isInteractive}
                />
              ))}
          </AnimatePresence>
        </div>

        {/* Bottom bun (always visible if ingredients selected) */}
        {selectedIngredients.length > 0 && (
          <div className="relative w-full max-w-md mt-2">
            <img
              src="/ingredients/bread/bottom-bun.svg"
              alt="Bottom bun"
              className="w-full h-auto object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.src = '/ingredients/bread/sourdough.svg';
              }}
            />
          </div>
        )}
      </div>

      {/* Ingredient count */}
      {selectedIngredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''} selected
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
