'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

type TextVariant = 'body' | 'heading' | 'caption' | 'label' | 'title';
type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'inherit';

interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  children: React.ReactNode;
  truncate?: boolean;
  className?: string;
}

const variantDefaults: Record<TextVariant, { as: TextProps['as']; size: TextSize; weight: TextWeight }> = {
  body: { as: 'p', size: 'base', weight: 'normal' },
  heading: { as: 'h2', size: 'xl', weight: 'semibold' },
  caption: { as: 'span', size: 'sm', weight: 'normal' },
  label: { as: 'label', size: 'sm', weight: 'medium' },
  title: { as: 'h3', size: 'lg', weight: 'medium' },
};

const colorMap: Record<TextColor, string> = {
  primary: tokens.colors.text.primary,
  secondary: tokens.colors.text.secondary,
  tertiary: tokens.colors.text.tertiary,
  inverse: tokens.colors.text.inverse,
  inherit: 'inherit',
};

const sizeMap: Record<TextSize, string> = {
  xs: tokens.typography.fontSize.xs,
  sm: tokens.typography.fontSize.sm,
  base: tokens.typography.fontSize.base,
  md: tokens.typography.fontSize.md,
  lg: tokens.typography.fontSize.lg,
  xl: tokens.typography.fontSize.xl,
  '2xl': tokens.typography.fontSize['2xl'],
};

const weightMap: Record<TextWeight, string> = {
  normal: tokens.typography.fontWeight.normal,
  medium: tokens.typography.fontWeight.medium,
  semibold: tokens.typography.fontWeight.semibold,
  bold: tokens.typography.fontWeight.bold,
};

export function Text({
  as,
  variant = 'body',
  size,
  weight,
  color = 'primary',
  children,
  truncate = false,
  className = '',
  style,
  ...props
}: TextProps) {
  const defaults = variantDefaults[variant];
  const Component = (as || defaults.as) as React.ElementType;
  const textSize = size || defaults.size;
  const textWeight = weight || defaults.weight;

  const elementProps = {
    className: `${truncate ? 'truncate' : ''} ${className}`,
    style: {
      fontSize: sizeMap[textSize],
      fontWeight: weightMap[textWeight],
      color: colorMap[color],
      lineHeight: tokens.typography.lineHeight.normal,
      ...style,
    },
    ...props,
  };

  return React.createElement(Component, elementProps, children);
}