'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FadeIn } from '../ScrollAnimations';
import { useAnimation } from '../AnimationProvider';

export default function TestimonialSection() {
  const testimonialsRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useAnimation();
  
  return (
    <section ref={testimonialsRef} className="container mx-auto max-w-[1200px] py-16 sm:py-20 md:py-24">
      <FadeIn direction="up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#413960] text-center mb-6 sm:mb-8">Testimonial</h2>
      </FadeIn>
      
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 testimonial-container">
        <motion.div 
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 min-w-[5rem] sm:min-w-[6rem] md:min-w-[7rem] rounded-full overflow-hidden mx-auto md:mx-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={!shouldReduceMotion ? { scale: 1.1, transition: { duration: 0.3 } } : undefined}
        >
          <Image 
            src="/testimonial-person.png" 
            alt="Testimonial" 
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.p 
          className="text-sm sm:text-base text-[#6C6B6B] text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour,
          or randomised words which don't look even slightly believable.
        </motion.p>
      </div>
    </section>
  );
}
