import confetti from 'canvas-confetti';
import type { Variants } from 'framer-motion';

// Stacking animation for sandwich ingredients
export const stackingVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: index * 0.1,
    },
  }),
  exit: {
    y: -50,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

// Fade in animation for page sections
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Stagger children animation for lists/grids
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Individual item in staggered list
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// Pulse animation for winner badge
export const pulseVariants: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Hover scale effect
export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Rustic confetti celebration
export const rusticConfetti = () => {
  // Rustic diner color palette matching the theme
  const colors = [
    '#3a5a40', // green-accent (primary dark)
    '#588157', // green-light
    '#a98467', // wood-light
    '#eae2d6', // cream
    '#bc6c25', // rust
    '#dad7cd', // light neutral
  ];

  // First burst from center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ['square', 'circle'],
    gravity: 1.2,
  });

  // Second burst from left
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });
  }, 250);

  // Third burst from right
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });
  }, 400);
};

// Celebration for monthly winner announcement
export const winnerConfetti = () => {
  const colors = ['#ffd700', '#ffed4e', '#ffc107', '#ff9800']; // Gold colors

  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.5 },
    colors: colors,
    shapes: ['star'],
    gravity: 0.8,
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 100,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 100,
      origin: { x: 1 },
      colors: colors,
    });
  }, 300);
};
