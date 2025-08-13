'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'primary' | 'secondary' | 'white';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const colorMap: Record<SpinnerColor, string> = {
  primary: tokens.colors.primary.DEFAULT,
  secondary: tokens.colors.text.secondary,
  white: tokens.colors.text.inverse,
};

export function Spinner({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: SpinnerProps) {
  const dimension = sizeMap[size];
  const spinnerColor = colorMap[color];

  return (
    <div
      className={`inline-block animate-spin ${className}`}
      style={{
        width: dimension,
        height: dimension,
      }}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={spinnerColor}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.25"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={spinnerColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}