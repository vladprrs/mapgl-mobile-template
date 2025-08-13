'use client';

import React, { forwardRef } from 'react';

export type InputVariant = 'default' | 'filled' | 'transparent';
export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  inputSize?: InputSize;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default: 'bg-white border border-gray-300 focus:border-blue-500',
  filled: 'bg-gray-100 border-transparent focus:bg-white focus:border-blue-500',
  transparent: 'bg-transparent border-none focus:outline-none',
};

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    variant = 'default',
    inputSize = 'md',
    error = false,
    leftIcon,
    rightIcon,
    className = '',
    ...props
  }, ref) => {
    const baseStyles = 'w-full rounded-lg px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50';
    const variantClass = variantStyles[variant];
    const sizeClass = sizeStyles[inputSize];
    const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
    
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${baseStyles} ${variantClass} ${sizeClass} ${errorClass} ${iconPadding} ${className}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';