import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Ingredient } from '@/types/sandwich';
import { hoverScaleVariants } from '@/lib/animations';

interface IngredientItemProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onSelect: (ingredient: Ingredient) => void;
  disabled?: boolean;
}

export const IngredientItem = ({
  ingredient,
  isSelected,
  onSelect,
  disabled = false,
}: IngredientItemProps) => {
  return (
    <motion.button
      variants={hoverScaleVariants}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={() => !disabled && onSelect(ingredient)}
      disabled={disabled}
      className={`
        relative p-5 rounded-xl transition-all duration-300 overflow-hidden
        ${isSelected
          ? 'border-3 border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20'
          : 'border-2 border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer hover:-translate-y-1'}
      `}
    >
      {/* Background glow effect for selected items */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"
        />
      )}

      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="absolute top-3 right-3 bg-primary text-white rounded-full p-1.5 shadow-lg z-10"
        >
          <Check className="w-4 h-4" />
        </motion.div>
      )}

      {/* Ingredient image with backdrop */}
      <div className="relative flex justify-center mb-2 sm:mb-3">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 rounded-lg blur-sm opacity-50" />
        <img
          src={ingredient.svg_path}
          alt={ingredient.name}
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-md transition-transform duration-300"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-ingredient.svg';
          }}
        />
      </div>

      {/* Ingredient name */}
      <p className="text-xs sm:text-sm font-semibold text-center text-gray-800 mb-1 line-clamp-2">
        {ingredient.name}
      </p>

      {/* Price modifier */}
      {ingredient.price_modifier > 0 ? (
        <p className="text-xs font-medium text-primary text-center bg-primary/10 rounded-full px-2 py-0.5 inline-block">
          +${ingredient.price_modifier.toFixed(2)}
        </p>
      ) : (
        <p className="text-xs text-gray-500 text-center">Free</p>
      )}
    </motion.button>
  );
};
