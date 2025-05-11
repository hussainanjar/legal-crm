'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  href?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    iconLeft, 
    iconRight, 
    href, 
    fullWidth = false,
    isLoading = false,
    className,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = clsx(
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'bg-transparent text-text-primary border border-border hover:bg-gray-50 focus:ring-gray-200': variant === 'outline',
        'bg-transparent text-text-primary hover:bg-gray-50 focus:ring-gray-200': variant === 'ghost',
        'bg-transparent text-accent-indigo hover:underline focus:ring-0': variant === 'link',
        'px-2.5 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-5 py-2.5 text-lg': size === 'lg',
        'w-full': fullWidth,
        'opacity-70 cursor-not-allowed': disabled || isLoading,
      },
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {iconLeft && !isLoading && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 