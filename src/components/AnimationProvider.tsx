'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { AnimatePresence } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Animation Context
interface AnimationContextType {
  shouldReduceMotion: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  shouldReduceMotion: false,
});

export const useAnimation = () => useContext(AnimationContext);

// Animation Provider Component
interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    // Setup listener for changes
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    // Set a base GSAP timeline for page entrance
    gsap.to('body', { 
      opacity: 1, 
      duration: shouldReduceMotion ? 0 : 0.5, 
      ease: 'power2.inOut' 
    });
    
    // Add a smooth scroll effect for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        const href = this.getAttribute('href');
        if (href) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            gsap.to(window, { 
              duration: shouldReduceMotion ? 0 : 0.8, 
              scrollTo: target,
              ease: 'power3.inOut'
            });
          }
        }
      });
    });
  }, [shouldReduceMotion]);

  return (
    <AnimationContext.Provider value={{ shouldReduceMotion }}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </AnimationContext.Provider>
  );
}

