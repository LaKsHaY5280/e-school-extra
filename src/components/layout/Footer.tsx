"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

type FooterLinkGroup = {
  title: string;
  links: string[];
};

const footerLinks: FooterLinkGroup[] = [
  {
    title: "Course",
    links: ['Graphic Design', 'Web Design', 'Business', 'Marketing', 'Engineering']
  },
  {
    title: "Terms",
    links: ['Graphic Design', 'Web Design', 'Business', 'Marketing', 'Engineering']
  },
  {
    title: "Useful Link",
    links: ['Graphic Design', 'Web Design', 'Business', 'Marketing', 'Engineering']
  }
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  return (
    <footer ref={footerRef} className="bg-[#282531] text-white py-12 sm:py-14 md:py-16">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-8 md:gap-y-10 gap-x-6 md:gap-x-8">
          {/* Column 1 - About */}
          <div className="footer-column md:col-span-2 lg:col-span-5">
            <motion.p 
              className="max-w-md text-base sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Millions of people of all ages and from around
              the world are improving their lives with us
            </motion.p>
          </div>
          
          {/* Columns 2-4: Dynamic footer links */}
          {footerLinks.map((group, groupIndex) => (
            <div key={group.title} className="footer-column md:col-span-1 lg:col-span-2">
              <motion.h4 
                className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {group.title}
              </motion.h4>
              
              <ul className="space-y-1 sm:space-y-2">
                {group.links.map((item, i) => (
                  <motion.li 
                    key={`${group.title}-${item}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i + (0.2 * groupIndex) }}
                    viewport={{ once: true }}
                  >
                    <motion.div whileHover={{ x: 5, color: "#21B573" }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="text-sm sm:text-base">{item}</Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12 sm:mt-14 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm text-gray-400">Copyright © 2020 Rokomari.com</p>
        </motion.div>
      </div>
    </footer>
  );
}
