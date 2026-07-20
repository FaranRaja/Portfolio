import React from 'react';
import { motion } from 'framer-motion';

interface LinkButtonProps {
  href?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
  featured?: boolean;
}

export function LinkButton({ href, title, subtitle, icon, delay = 0, featured = false }: LinkButtonProps) {
  const content = (
    <div className={`
      relative flex items-center p-4 w-full rounded-2xl
      border transition-all duration-300
      ${featured 
        ? 'bg-white/5 border-white/20 hover:border-white/50 hover:bg-white/10' 
        : 'bg-transparent border-white/10 hover:border-white/30 hover:bg-white/5'}
    `}>
      {/* Icon Container */}
      {icon && (
        <div className={`
          flex items-center justify-center w-12 h-12 rounded-xl mr-4 flex-shrink-0
          ${featured ? 'bg-white text-black' : 'bg-white/10 text-white'}
        `}>
          {icon}
        </div>
      )}
      
      {/* Text Container */}
      <div className="flex flex-col flex-grow items-start text-left">
        <span className={`font-display font-bold text-lg ${featured ? 'text-white' : 'text-text'}`}>
          {title}
        </span>
        {subtitle && (
          <span className="font-body text-sm text-muted mt-0.5 line-clamp-1">
            {subtitle}
          </span>
        )}
      </div>

      {/* Hover Arrow/Chevron */}
      <div className="ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block w-full group outline-none"
    >
      {content}
    </motion.a>
  );
}
