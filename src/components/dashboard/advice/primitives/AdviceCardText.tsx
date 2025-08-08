'use client';

import React from 'react';
import type { AdviceTheme } from './AdviceCardContainer';

interface TitleProps {
  theme?: AdviceTheme;
  children: React.ReactNode;
  className?: string;
}

export function AdviceTitle({ theme = 'Light', className = '', children }: TitleProps) {
  const isLight = theme === 'Light';
  return (
    <h3
      className={`
        font-medium text-[16px] leading-5 tracking-[-0.24px]
        ${isLight ? 'text-[#141414]' : 'text-white'}
        ${className}
      `}
    >
      {children}
    </h3>
  );
}

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AdviceSubtitle({ className = '', children }: SubtitleProps) {
  return (
    <p className={`text-[13px] leading-4 tracking-[-0.234px] text-[#898989] ${className}`}>
      {children}
    </p>
  );
}

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AdviceBodyText({ className = '', children }: BodyTextProps) {
  return (
    <p className={`text-[14px] leading-[18px] tracking-[-0.28px] text-[#898989] ${className}`}>
      {children}
    </p>
  );
}


