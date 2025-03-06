'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '../components/AnimationProvider';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import CoursesSection from '../components/sections/CoursesSection';
import TestimonialSection from '../components/sections/TestimonialSection';

// Register GSAP plugins on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { shouldReduceMotion } = useAnimation();

  // Initialize global animations
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    // Create a smooth scrolling experience
    gsap.to('body', { 
      opacity: 1, 
      duration: 0.5, 
      ease: "power2.inOut" 
    });
    
  }, [shouldReduceMotion]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <div className="bg-[#F0FFF0]">
        <Header />
        <HeroSection />
      </div>

      <StatsSection />
      <CoursesSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}