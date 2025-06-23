import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = '', 
  size = 'md', 
  className = '',
  children 
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ${sizeClasses[size as keyof typeof sizeClasses]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-600 font-medium">
          {children || alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};
