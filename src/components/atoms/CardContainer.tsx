'use client';

import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

interface CardContainerProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border border-gray-200',
  filled: 'bg-gray-50',
};

const paddingStyles = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

const radiusStyles = {
  none: '',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

export function CardContainer({
  children,
  variant = 'default',
  className = '',
  onClick,
  padding = 'md',
  radius = 'lg',
}: CardContainerProps) {
  const baseStyles = 'transition-all';
  const variantClass = variantStyles[variant];
  const paddingClass = paddingStyles[padding];
  const radiusClass = radiusStyles[radius];
  const interactiveClass = onClick ? 'cursor-pointer hover:shadow-md active:scale-95' : '';
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={`${baseStyles} ${variantClass} ${paddingClass} ${radiusClass} ${interactiveClass} ${className}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Component>
  );
}