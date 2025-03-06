'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationProvider';
import { gsap } from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CourseCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useAnimation();

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Button animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      backgroundColor: "#1a9c60",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  useEffect(() => {
    // Animate navigation buttons with GSAP
    if (!shouldReduceMotion && carouselRef.current) {
      const navButtons = carouselRef.current.querySelectorAll('.custom-prev-button, .custom-next-button');
      
      gsap.fromTo(navButtons, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, [shouldReduceMotion]);

  return (
    <div className="relative" ref={carouselRef}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: '.custom-prev-button',
          nextEl: '.custom-next-button',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        loop={true}
        autoplay={{ 
          delay: 3000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="courses-swiper px-2"
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          // @ts-ignore
          swiper.params.pagination.el = paginationRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
          swiper.pagination.init();
          swiper.pagination.update();
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <SwiperSlide key={index} className="py-4">
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={!shouldReduceMotion ? "hover" : undefined}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image 
                src={`/course${(index % 3) + 1}.png`}
                alt={`Course ${(index % 3) + 1}`} 
                width={600}
                height={400}
                className="w-full h-40 sm:h-48 object-cover"
                priority={index < 3}
              />
              <motion.div className="p-4 sm:p-6 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-[#413960] mb-2">Modern Psychology</h3>
                <p className="text-sm sm:text-base text-[#6C6B6B] mb-4">Designation</p>
                <motion.button 
                  className="bg-[#21B573] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base mt-auto self-start"
                  variants={buttonVariants}
                  whileHover={!shouldReduceMotion ? "hover" : undefined}
                  whileTap={!shouldReduceMotion ? "tap" : undefined}
                >
                  Buy Course
                </motion.button>
                
                <div className="flex flex-col sm:flex-row sm:justify-between mt-6 text-xs sm:text-sm text-[#6C6B6B] gap-2 sm:gap-0">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#21B573]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Start 20 April, 2021
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#21B573]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    60 seats
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation and pagination container */}
      <div className="flex items-center justify-center mt-8 relative w-full px-12">
        <motion.button 
          ref={prevRef}
          className="custom-prev-button h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center group absolute left-0"
          whileHover={!shouldReduceMotion ? { scale: 1.1, transition: { duration: 0.2 } } : undefined}
          whileTap={!shouldReduceMotion ? { scale: 0.9 } : undefined}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#21B573] group-hover:text-[#1a9c60] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <div ref={paginationRef} className="swiper-pagination-custom w-full flex justify-center"></div>
        
        <motion.button 
          ref={nextRef}
          className="custom-next-button h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center group absolute right-0"
          whileHover={!shouldReduceMotion ? { scale: 1.1, transition: { duration: 0.2 } } : undefined}
          whileTap={!shouldReduceMotion ? { scale: 0.9 } : undefined}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#21B573] group-hover:text-[#1a9c60] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}