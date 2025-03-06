'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAnimation } from '../AnimationProvider';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({ end, duration = 2.5, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, amount: 0.5 });
  const { shouldReduceMotion } = useAnimation();
  
  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setCount(end);
      return;
    }
    
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedTime = timestamp - startTimestamp;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      
      // Use easeOutExpo for smoother animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    // Cleanup function
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, end, duration, shouldReduceMotion]);
  
  return (
    <span ref={countRef} className="count-up-animation">
      {prefix}{count}{suffix}
    </span>
  );
}
