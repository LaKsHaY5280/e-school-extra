import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useAnimation } from '../AnimationProvider';
import Button from '../ui/Button';

export default function Header() {
  const { shouldReduceMotion } = useAnimation();
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Link animation variants
  const linkVariants = {
    hover: { y: -2, color: "#21B573", transition: { duration: 0.2 } },
    tap: { y: 0 }
  };
  
  // Mobile menu animation variants
  const menuVariants = {
    closed: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2, ease: "easeOut" }
      }
    },
    open: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeIn", delay: 0.1 }
      }
    }
  };
  
  // Mobile menu item animation variants
  const menuItemVariants = {
    closed: { y: 0, opacity: 0 },
    open: (i: number) => ({ 
      y: 10, 
      opacity: 1,
      transition: { 
        delay: 0.05 * i,
        duration: 0.25
      }
    })
  };
  
  const links = [
    { title: "Books", href: "#" },
    { title: "Courses", href: "#" },
    { title: "Others", href: "#" },
    { title: "Blog", href: "#" }
  ];
  
  return (
    <header ref={headerRef} className="container mx-auto max-w-[1200px] py-4 sm:py-5 md:py-6 flex justify-between items-center relative z-50">
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src="/logo.png" 
          alt="E-School Logo" 
          width={48} 
          height={48} 
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
        <span className="text-xl sm:text-2xl font-bold text-[#413960]">E-School</span>
      </motion.div>
      
      {/* Mobile menu button */}
      <motion.button 
        className="md:hidden text-[#413960] focus:outline-none"
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </motion.button>
      
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden md:flex items-center gap-6 lg:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {links.map((link) => (
          <motion.div key={link.title} variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link href={link.href} className="text-[#413960] text-sm lg:text-base">{link.title}</Link>
          </motion.div>
        ))}
        
        <Button variant="primary" className="text-sm lg:text-base py-2 px-4 lg:px-6">Sign in</Button>
      </motion.nav>
      
      {/* Mobile Navigation Menu with AnimatePresence */}
      <div className="md:hidden absolute top-full left-0 right-0 z-50 w-full">
        <motion.div 
          className="bg-white shadow-lg overflow-hidden origin-top"
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <div className="py-4 px-8 flex flex-col gap-4">
            {links.map((link, i) => (
              <motion.div 
                key={link.title}
                custom={i}
                variants={menuItemVariants}
              >
                <Link 
                  href={link.href} 
                  className="text-[#413960] py-2 border-b border-gray-100 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
            <motion.div
              custom={4}
              variants={menuItemVariants}
            >
              <Button 
                variant="primary" 
                className="mt-2 w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
