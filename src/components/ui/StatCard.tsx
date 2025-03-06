import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAnimation } from '@/components/AnimationProvider';
import CountUp from '@/components/ui/CountUp';

interface StatCardProps {
  iconSrc: string;
  iconAlt: string;
  count: number;
  suffix?: string; 
  title: string;
  description: string;
  index: number;
}

export default function StatCard({ 
  iconSrc, 
  iconAlt, 
  count, 
  suffix = '', 
  title, 
  description, 
  index 
}: StatCardProps) {
  const { shouldReduceMotion } = useAnimation();

  return (
    <motion.div 
      className="bg-white rounded-lg p-5 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow text-center relative overflow-hidden h-full"
      whileHover={!shouldReduceMotion ? { 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      } : undefined}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.5 }
        }
      }}
    >
      <motion.div 
        className="flex justify-center mb-4 sm:mb-6 relative z-10"
        whileHover={!shouldReduceMotion ? { 
          scale: 1.1, 
          rotate: [0, -5, 5, -5, 0],
          transition: { 
            scale: { duration: 0.2 },
            rotate: { duration: 0.5, ease: "easeInOut" }
          }
        } : undefined}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-75 blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
            viewport={{ once: true }}
          />
          <Image 
            src={iconSrc} 
            alt={iconAlt} 
            width={80} 
            height={80}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative"
          />
        </div>
      </motion.div>
      
      <h3 className="text-xl sm:text-2xl font-bold text-[#413960] mb-1">
        <span className="whitespace-nowrap">
          <CountUp end={count} suffix={suffix} /> {title}
        </span>
      </h3>
      <motion.p 
        className="text-sm sm:text-base text-[#6C6B6B]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7 + (index * 0.1) }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}