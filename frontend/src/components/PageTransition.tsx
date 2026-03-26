import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
