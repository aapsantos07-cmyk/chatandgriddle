import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { rusticConfetti } from '@/lib/animations';
import { useAuth } from '@/hooks/useAdmin';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuildAnother: () => void;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  onBuildAnother,
}: SuccessModalProps) => {
  const navigate = useNavigate();
  const { data: user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      rusticConfetti();

      // Additional confetti burst after a delay
      const timeout = setTimeout(() => {
        rusticConfetti();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleBuildAnother = () => {
    onBuildAnother();
    onClose();
  };

  const handleViewGallery = () => {
    onClose();
    navigate('/sandwich-gallery');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-chalk text-primary">
            Sandwich Submitted!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Your creation has been entered into the competition!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">
            Check back soon to see if your sandwich wins Sandwich of the Month!
          </p>

          <div className="flex flex-col gap-3 pt-4">
            {user && (
              <Button
                onClick={handleViewGallery}
                className="btn-rustic w-full"
              >
                View Gallery
              </Button>
            )}
            <Button
              onClick={handleBuildAnother}
              variant="outline"
              className="w-full"
            >
              Build Another Sandwich
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
