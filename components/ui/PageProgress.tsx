'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(100);
    
    const timer = setTimeout(() => {
      setProgress(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 overflow-hidden"
      initial={{ width: '0%' }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div 
        className="h-full bg-gradient-to-r from-primary to-accent"
        initial={{ opacity: 1 }}
        animate={{ opacity: progress > 0 ? 1 : 0 }}
      />
    </motion.div>
  );
}
