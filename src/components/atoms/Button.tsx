'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200',
  icon: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 p-2',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  isActive = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClass = variantStyles[variant];
  const sizeClass = variant === 'icon' ? '' : sizeStyles[size];
  const activeClass = isActive ? 'ring-2 ring-blue-500' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantClass} ${sizeClass} ${activeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}