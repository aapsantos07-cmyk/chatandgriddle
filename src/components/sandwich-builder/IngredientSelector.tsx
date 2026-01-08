import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IngredientItem } from './IngredientItem';
import { useGroupedIngredients } from '@/hooks/useIngredients';
import type { Ingredient } from '@/types/sandwich';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

interface IngredientSelectorProps {
  onSelectIngredient: (ingredient: Ingredient) => void;
  isIngredientSelected: (ingredientId: string) => void;
  canAddMore: boolean;
}

export const IngredientSelector = ({
  onSelectIngredient,
  isIngredientSelected,
  canAddMore,
}: IngredientSelectorProps) => {
  const { data: groupedIngredients, isLoading, error } = useGroupedIngredients();

  // Category order
  const categoryOrder = ['Bread', 'Proteins', 'Cheeses', 'Veggies', 'Sauces', 'Extras'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading ingredients...</span>
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isConfigError = errorMessage.includes('not configured');

    return (
      <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">
          {isConfigError ? '⚙️ Setup Required' : 'Error Loading Ingredients'}
        </h3>
        <p className="text-yellow-700 mb-4">{errorMessage}</p>
        {isConfigError && (
          <div className="bg-white p-4 rounded border border-yellow-300 text-left">
            <p className="font-medium text-sm text-gray-700 mb-2">
              To enable the sandwich builder:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Open the <code className="bg-gray-100 px-1 rounded">SUPABASE_SETUP.md</code> file in the project root</li>
              <li>Follow the step-by-step instructions to set up Supabase</li>
              <li>Add your Supabase credentials to <code className="bg-gray-100 px-1 rounded">.env.local</code></li>
              <li>Restart the development server</li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  if (!groupedIngredients) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No ingredients available.
      </div>
    );
  }

  // Get available categories from the data
  const availableCategories = categoryOrder.filter(
    (cat) => groupedIngredients[cat] && groupedIngredients[cat].length > 0
  );

  return (
    <div className="w-full">
      {/* Max ingredients warning */}
      {!canAddMore && (
        <div className="mb-4 p-3 bg-rust/10 border border-rust rounded-lg">
          <p className="text-sm text-rust text-center font-medium">
            Maximum ingredients reached! Remove some to add more.
          </p>
        </div>
      )}

      <Tabs defaultValue={availableCategories[0]} className="w-full">
        <TabsList className="w-full inline-flex md:grid md:grid-cols-6 gap-2 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow-inner overflow-x-auto flex-nowrap">
          {availableCategories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg
                         data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600
                         transition-all duration-200 font-medium rounded-lg px-3 py-2 text-sm md:text-base
                         hover:bg-primary/10 data-[state=active]:scale-105 whitespace-nowrap flex-shrink-0"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {availableCategories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {groupedIngredients[category]?.map((ingredient) => (
                <motion.div key={ingredient.id} variants={staggerItemVariants}>
                  <IngredientItem
                    ingredient={ingredient}
                    isSelected={isIngredientSelected(ingredient.id)}
                    onSelect={onSelectIngredient}
                    disabled={!canAddMore && !isIngredientSelected(ingredient.id)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Category description */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              {groupedIngredients[category]?.length} {category.toLowerCase()} available
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
