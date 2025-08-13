'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { InterestingProps } from './types';
import { AdviceCardContainer, AdviceTitle, AdviceBodyText, AdviceBadge } from '@/components/molecules';

/**
 * Interesting Component
 * Feature promotion card for app functions or important information
 * Always renders at double height (244px) in masonry layout
 * 
 * Design specs from Figma:
 * - Rounded card (12px) with image at bottom
 * - Title: 16px, Medium font weight, -0.24px tracking
 * - Description: 14px, Regular, -0.28px tracking
 * - Light theme: White background (#FFFFFF)
 * - Dark theme: White/6% background (rgba(255,255,255,0.06))
 * - Navigation: Opens specific app feature
 * - Height: Always 244px (double height in masonry)
 */
export function Interesting({
  title,
  subtitle,
  images = [],
  onClick,
  className = '',
  theme = 'light',
}: InterestingProps) {
  const handleClick = () => {
    debugLog('Interesting clicked:', { title });
    onClick?.();
  };

  const minHeight = 'min-h-[244px]';
  // Convert theme to match AdviceCardContainer's expected format
  const adviceTheme = theme === 'light' ? 'Light' : 'Dark';

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={`flex flex-col ${className}`}
      heightClassName={`h-full ${minHeight}`}
      theme={adviceTheme}
      aria-label={`Feature: ${title}`}
    >
      <div className="flex flex-col items-start px-4 pt-2.5 pb-3">
        <AdviceTitle theme={adviceTheme} className="text-left">
          {title}
        </AdviceTitle>
        {subtitle && (
          <AdviceBodyText className="text-left mt-0.5">{subtitle}</AdviceBodyText>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex-1 w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url('${images[0]}')` }} />
      )}
    </AdviceCardContainer>
  );
}