import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimation } from '@/components/AnimationProvider';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: ButtonProps) {
  const { shouldReduceMotion } = useAnimation();
  
  const baseClasses = "rounded-full font-medium transition-colors";
  const variantClasses = {
    primary: "bg-[#21B573] text-white px-8 py-3",
    secondary: "bg-white text-[#21B573] border border-[#21B573] px-6 py-2"
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      backgroundColor: variant === 'primary' ? "#1a9c60" : "#f5f5f5",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      variants={buttonVariants}
      whileHover={!shouldReduceMotion ? "hover" : undefined}
      whileTap={!shouldReduceMotion ? "tap" : undefined}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}