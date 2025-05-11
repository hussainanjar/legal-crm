'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-accent-indigo-50 text-accent-indigo',
  success: 'bg-accent-green-50 text-accent-green',
  warning: 'bg-amber-50 text-amber-600',
  error: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
  default: 'bg-gray-100 text-text-secondary',
};

const dotStyles = {
  primary: 'bg-accent-indigo',
  success: 'bg-accent-green',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  default: 'bg-gray-400',
};

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  dot = false,
  className 
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-2.5 py-0.5': size === 'md',
        },
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            dotStyles[variant]
          )}
        />
      )}
      {children}
    </span>
  );
} 