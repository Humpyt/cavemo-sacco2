import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ children, className, padding = 'md' }) => {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={clsx(
      'bg-white rounded-xl shadow-sm border border-secondary-200 hover:shadow-md transition-shadow duration-200',
      paddingStyles[padding],
      className
    )}>
      {children}
    </div>
  );
};