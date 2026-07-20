import React from 'react';
import { motion } from 'framer-motion';

export function BentoGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 max-w-7xl mx-auto p-4 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  delay?: number;
}

export function BentoCard({ children, className = '', colSpan = 'col-span-1', delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`bento-card flex flex-col p-6 ${colSpan} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
