import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FadeIn } from '../ScrollAnimations';
import Button from '../ui/Button';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={heroRef} className="container mx-auto max-w-[1200px] py-8 sm:py-12 md:py-20 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <FadeIn direction="up" delay={0.2}>
          <p className="text-[#FD511A] mb-2 text-sm sm:text-base">Are you ready to Learn?</p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#413960] mb-4 leading-tight">
            Learn With fun <br className="hidden sm:block" />
            on <span className="text-[#21B573]">any schedule</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.4}>
          <p className="text-[#6C6B6B] mb-6 sm:mb-8 max-w-sm mx-auto md:mx-0 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius blandit facilisis quam netus.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.5}>
          <Button className="px-6 py-3 sm:px-8 sm:py-3">Get Started</Button>
        </FadeIn>
      </div>
      
      <div className="md:w-1/2 px-4 sm:px-8 md:px-0">
        <FadeIn direction="left" delay={0.6}>
          <div className="relative hero-image">
            <Image 
              src="/illustration.png" 
              alt="E-learning illustration" 
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
