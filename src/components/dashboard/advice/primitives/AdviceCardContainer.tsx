'use client';

import React from 'react';

export type AdviceTheme = 'Light' | 'Dark';

interface AdviceCardContainerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: AdviceTheme;
  heightClassName?: string; // e.g. h-[116px], min-h-[244px]
}

export function AdviceCardContainer({
  theme = 'Light',
  className = '',
  heightClassName = '',
  children,
  ...buttonProps
}: AdviceCardContainerProps) {
  const isLight = theme === 'Light';
  return (
    <button
      {...buttonProps}
      className={`
        relative w-full ${heightClassName}
        rounded-xl overflow-hidden
        transition-transform active:scale-95
        ${isLight ? 'bg-white' : 'bg-white/[0.06]'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}


