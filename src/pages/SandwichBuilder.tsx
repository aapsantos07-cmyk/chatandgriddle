import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Trash2 } from 'lucide-react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BuilderCanvas } from '@/components/sandwich-builder/BuilderCanvas';
import { IngredientSelector } from '@/components/sandwich-builder/IngredientSelector';
import { SubmissionForm } from '@/components/sandwich-builder/SubmissionForm';
import { SuccessModal } from '@/components/sandwich-builder/SuccessModal';
import { useSandwichBuilder } from '@/hooks/useSandwichBuilder';
import { useCreateSubmission } from '@/hooks/useSubmissions';
import { useToast } from '@/hooks/use-toast';
import { fadeInVariants } from '@/lib/animations';
import type { Ingredient, SandwichFormData } from '@/types/sandwich';

const SandwichBuilder = () => {
  const {
    selectedIngredients,
    addIngredient,
    removeIngredient,
    clearSandwich,
    isIngredientSelected,
    calculateTotalPrice,
    canAddMore,
  } = useSandwichBuilder();

  const { mutate: createSubmission, isPending } = useCreateSubmission();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSelectIngredient = (ingredient: Ingredient) => {
    if (!canAddMore && !isIngredientSelected(ingredient.id)) {
      toast({
        title: 'Maximum ingredients reached',
        description: 'Remove some ingredients to add more.',
        variant: 'destructive',
      });
      return;
    }

    addIngredient(ingredient);
    toast({
      title: 'Ingredient added!',
      description: `${ingredient.name} added to your sandwich.`,
    });
  };

  const handleRemoveIngredient = (index: number) => {
    const ingredient = selectedIngredients[index];
    removeIngredient(index);
    toast({
      title: 'Ingredient removed',
      description: `${ingredient.name} removed from your sandwich.`,
    });
  };

  const handleSubmit = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: 'No ingredients selected',
        description: 'Please add some ingredients to your sandwich first!',
        variant: 'destructive',
      });
      return;
    }

    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: SandwichFormData) => {
    createSubmission(
      {
        formData,
        ingredients: selectedIngredients,
      },
      {
        onSuccess: () => {
          setIsFormOpen(false);
          setIsSuccessOpen(true);
        },
        onError: (error) => {
          toast({
            title: 'Submission failed',
            description: error instanceof Error ? error.message : 'Please try again.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleBuildAnother = () => {
    clearSandwich();
    setIsSuccessOpen(false);
  };

  return (
    <>
      <SEO
        title="Sandwich Builder"
        description="Create your dream sandwich and compete for Sandwich of the Month at Chat & Griddle"
        keywords="sandwich builder, custom sandwich, sandwich competition, Chat & Griddle"
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
            <motion.div
              className="flex justify-center mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full shadow-2xl">
                <ChefHat className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-chalk text-accent mb-4
                           bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Build Your Dream Sandwich
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create your perfect sandwich and enter it into our monthly competition.
              The winner becomes our featured <span className="text-primary font-semibold">Sandwich of the Month</span>!
            </p>
          </motion.div>

          {/* Main Builder */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* Left: Ingredient Selector */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-accent mb-4">
                  Select Ingredients
                </h2>
                <IngredientSelector
                  onSelectIngredient={handleSelectIngredient}
                  isIngredientSelected={isIngredientSelected}
                  canAddMore={canAddMore}
                />
              </div>
            </motion.div>

            {/* Right: Builder Canvas */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="lg:sticky lg:top-24">
                <BuilderCanvas
                  selectedIngredients={selectedIngredients}
                  onRemoveIngredient={handleRemoveIngredient}
                />

                {/* Action Buttons */}
                <div className="mt-6 space-y-4">
                  {/* Price Display */}
                  {selectedIngredients.length > 0 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border-2 border-green-200"
                    >
                      <p className="text-sm font-medium text-green-700 mb-2">Estimated Price</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${calculateTotalPrice().toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 mt-2">+ tax where applicable</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    className="w-full btn-rustic py-7 text-lg font-bold shadow-xl hover:shadow-2xl
                               transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                    disabled={selectedIngredients.length === 0}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ChefHat className="w-5 h-5" />
                      Submit My Sandwich
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary
                                    opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Button>

                  {/* Clear Button */}
                  {selectedIngredients.length > 0 && (
                    <Button
                      onClick={clearSandwich}
                      variant="outline"
                      className="w-full py-4 border-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600
                                 transition-all duration-200 group"
                    >
                      <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Start Over
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="bg-accent/5 border-2 border-accent/20 rounded-lg p-6 max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-bold text-accent mb-3">
              How It Works
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Select your favorite ingredients to build your dream sandwich</li>
              <li>Give your creation a creative name and submit it</li>
              <li>Each month, we'll choose the best sandwich as our Sandwich of the Month</li>
              <li>Winners get bragging rights and their sandwich featured in our restaurant!</li>
            </ol>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <SubmissionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={isPending}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onBuildAnother={handleBuildAnother}
      />

      <Footer />
    </>
  );
};

export default SandwichBuilder;
