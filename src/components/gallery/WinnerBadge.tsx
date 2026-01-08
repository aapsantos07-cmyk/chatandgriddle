import { motion } from 'framer-motion';
import { Award, Crown } from 'lucide-react';
import { pulseVariants } from '@/lib/animations';

interface WinnerBadgeProps {
  month?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const WinnerBadge = ({ month, size = 'md' }: WinnerBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const formatMonth = (monthString?: string) => {
    if (!monthString) return 'Winner';
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <motion.div
      variants={pulseVariants}
      initial="initial"
      animate="pulse"
      className={`
        inline-flex items-center gap-2 font-chalk
        bg-gradient-to-r from-yellow-400 to-yellow-500
        text-yellow-900 rounded-full shadow-lg
        ${sizeClasses[size]}
      `}
      style={{
        boxShadow: '0 4px 12px rgba(234, 179, 8, 0.4)',
      }}
    >
      <Crown className={iconSize[size]} />
      <span className="font-bold">
        {month ? formatMonth(month) : 'Sandwich of the Month'}
      </span>
      <Award className={iconSize[size]} />
    </motion.div>
  );
};
