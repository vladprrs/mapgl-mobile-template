'use client';

import React from 'react';

interface AdviceIconCircleProps {
  isLight?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AdviceIconCircle({ isLight = true, className = '', children }: AdviceIconCircleProps) {
  return (
    <div
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${isLight ? 'bg-[rgba(20,20,20,0.06)]' : 'bg-white/[0.06]'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface AdviceLogoCircleProps {
  children: React.ReactNode;
  className?: string;
}

export function AdviceLogoCircle({ className = '', children }: AdviceLogoCircleProps) {
  return (
    <div className={`w-12 h-12 bg-white rounded-full overflow-hidden border-[0.5px] border-[rgba(137,137,137,0.3)] ${className}`}>
      {children}
    </div>
  );
}

interface BackgroundImageProps {
  imageUrl: string;
  className?: string;
}

export function BackgroundImage({ imageUrl, className = '' }: BackgroundImageProps) {
  return (
    <div className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${className}`} style={{ backgroundImage: `url('${imageUrl}')` }} />
  );
}


