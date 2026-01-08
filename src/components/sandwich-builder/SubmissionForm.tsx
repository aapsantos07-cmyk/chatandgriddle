import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { SandwichFormData } from '@/types/sandwich';

const formSchema = z.object({
  sandwich_name: z.string().min(3, 'Sandwich name must be at least 3 characters').max(50, 'Too long!'),
  creator_name: z.string().min(2, 'Your name must be at least 2 characters').max(50, 'Too long!'),
  creator_email: z.string().email('Invalid email').optional().or(z.literal('')),
  description: z.string().max(200, 'Description must be 200 characters or less').optional(),
});

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SandwichFormData) => void;
  isSubmitting: boolean;
}

export const SubmissionForm = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: SubmissionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sandwich_name: '',
      creator_name: '',
      creator_email: '',
      description: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data as SandwichFormData);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-chalk text-primary">
            Submit Your Sandwich
          </DialogTitle>
          <DialogDescription>
            Enter your sandwich details to compete for Sandwich of the Month!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Sandwich Name */}
            <FormField
              control={form.control}
              name="sandwich_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sandwich Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The Ultimate Breakfast Stack"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your creation a creative name!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Creator Name */}
            <FormField
              control={form.control}
              name="creator_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Creator Email (Optional) */}
            <FormField
              control={form.control}
              name="creator_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll notify you if you win!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (Optional) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what makes your sandwich special..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/200 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-rustic"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit Sandwich'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
