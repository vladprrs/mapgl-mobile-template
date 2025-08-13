'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'default' | 'light' | 'dark';

interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  className?: string;
  style?: React.CSSProperties;
}

const variantMap: Record<DividerVariant, string> = {
  default: tokens.colors.border.DEFAULT,
  light: tokens.colors.border.light,
  dark: tokens.colors.border.dark,
};

export function Divider({ 
  orientation = 'horizontal',
  variant = 'default',
  className = '',
  style
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div
      className={className}
      style={{
        width: isHorizontal ? '100%' : tokens.borders.width.DEFAULT,
        height: isHorizontal ? tokens.borders.width.DEFAULT : '100%',
        backgroundColor: variantMap[variant],
        ...style,
      }}
      role="separator"
      aria-orientation={orientation}
    />
  );
}