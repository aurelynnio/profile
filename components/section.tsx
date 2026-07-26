'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({
  children,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.4,
      delay,
      ease: 'easeOut',
    }}
    className="mb-6"
    style={{
      willChange: 'opacity, transform',
      transform: 'translateZ(0)',
    }}
  >
    {children}
  </motion.div>
);

export default Section;
