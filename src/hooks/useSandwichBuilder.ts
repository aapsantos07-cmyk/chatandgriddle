import { useState, useCallback } from 'react';
import type { Ingredient, SelectedIngredient } from '@/types/sandwich';

export const useSandwichBuilder = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [maxIngredients] = useState(10); // Limit to prevent overstacking

  // Add ingredient to the sandwich
  const addIngredient = useCallback((ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      // Check if we've reached the max
      if (prev.length >= maxIngredients) {
        return prev;
      }

      // Add ingredient with layer order
      const newIngredient: SelectedIngredient = {
        ...ingredient,
        layer_order: prev.length,
      };

      return [...prev, newIngredient];
    });
  }, [maxIngredients]);

  // Remove ingredient from the sandwich
  const removeIngredient = useCallback((index: number) => {
    setSelectedIngredients((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Re-index layer orders
      return updated.map((ing, i) => ({
        ...ing,
        layer_order: i,
      }));
    });
  }, []);

  // Clear all ingredients
  const clearSandwich = useCallback(() => {
    setSelectedIngredients([]);
  }, []);

  // Check if ingredient is already selected
  const isIngredientSelected = useCallback((ingredientId: string) => {
    return selectedIngredients.some((ing) => ing.id === ingredientId);
  }, [selectedIngredients]);

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    const basePrice = 5.00; // Base sandwich price
    const ingredientTotal = selectedIngredients.reduce(
      (total, ing) => total + (ing.price_modifier || 0),
      0
    );
    return basePrice + ingredientTotal;
  }, [selectedIngredients]);

  // Get ingredient count by category
  const getIngredientCountByCategory = useCallback((categoryId: string) => {
    return selectedIngredients.filter(
      (ing) => ing.category_id === categoryId
    ).length;
  }, [selectedIngredients]);

  return {
    selectedIngredients,
    addIngredient,
    removeIngredient,
    clearSandwich,
    isIngredientSelected,
    calculateTotalPrice,
    getIngredientCountByCategory,
    maxIngredients,
    canAddMore: selectedIngredients.length < maxIngredients,
  };
};
