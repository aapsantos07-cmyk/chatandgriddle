import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { SelectedIngredient } from '@/types/sandwich';
import { stackingVariants } from '@/lib/animations';

interface SandwichLayerProps {
  ingredient: SelectedIngredient;
  index: number;
  onRemove: (index: number) => void;
  isInteractive?: boolean;
}

export const SandwichLayer = ({
  ingredient,
  index,
  onRemove,
  isInteractive = true,
}: SandwichLayerProps) => {
  // Calculate z-index and slight rotation for realistic stacking
  const zIndex = 10 + index;
  const rotation = (index % 2 === 0 ? 1 : -1) * Math.random() * 2; // Small random rotation

  return (
    <motion.div
      custom={index}
      variants={stackingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layoutId={ingredient.id}
      className="relative group"
      style={{
        zIndex,
        marginTop: index === 0 ? '0' : '-40px', // Overlap layers
      }}
    >
      {/* Remove button (only visible on hover if interactive) */}
      {isInteractive && (
        <button
          onClick={() => onRemove(index)}
          className="absolute -top-2 -right-2 z-20 bg-red-500 text-white rounded-full p-1.5
                     opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110
                     transition-all duration-200 shadow-lg"
          aria-label={`Remove ${ingredient.name}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Ingredient image with rotation */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          rotate: rotation,
        }}
        whileHover={isInteractive ? { scale: 1.05 } : {}}
      >
        <img
          src={ingredient.svg_path}
          alt={ingredient.name}
          className="w-full h-auto object-contain drop-shadow-md transition-transform duration-200"
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
          }}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-ingredient.svg';
          }}
        />

        {/* Ingredient label (shows on hover if interactive) */}
        {isInteractive && (
          <div className="absolute inset-0 flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          bg-black/40 rounded-lg pointer-events-none">
            <span className="text-white text-sm font-semibold drop-shadow-lg">
              {ingredient.name}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
