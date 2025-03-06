'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useAnimation as useGlobalAnimation } from './AnimationProvider';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  distance = 30,
  once = true,
  threshold = 0.1
}: FadeInProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const { shouldReduceMotion } = useGlobalAnimation();

  // Initial animation states based on direction
  const getInitialState = () => {
    if (shouldReduceMotion) return { opacity: 1 };

    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Animation target state
  const getVisibleState = () => {
    return { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: { 
        duration: shouldReduceMotion ? 0 : duration, 
        ease: 'easeOut', 
        delay
      } 
    };
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getVisibleState());
    }
  }, [isInView, controls, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
  once = true
}: StaggerContainerProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const { shouldReduceMotion } = useGlobalAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delay,
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const { shouldReduceMotion } = useGlobalAnimation();

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
