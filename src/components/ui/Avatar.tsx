'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

export default function Avatar({ 
  name,
  src,
  size = 'md',
  className 
}: AvatarProps) {
  const initials = useMemo(() => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, [name]);

  if (src) {
    return (
      <div 
        className={clsx(
          'relative rounded-full overflow-hidden', 
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={src}
          alt={name || 'Avatar'}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        'flex items-center justify-center rounded-full bg-accent-indigo-100 text-accent-indigo font-medium',
        sizeClasses[size],
        className
      )}
    >
      {initials || '?'}
    </div>
  );
} 