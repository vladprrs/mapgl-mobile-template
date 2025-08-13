'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { InterestingProps } from './types';
import { AdviceCardContainer, AdviceTitle, AdviceBodyText, AdviceBadge } from './primitives';

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
  id,
  title,
  description,
  imageUrl,
  featureId,
  theme = 'Light',
  actionText,
  badge,
  onClick,
  className = '',
}: InterestingProps) {
  const handleClick = () => {
    debugLog('Interesting clicked:', { featureId });
    onClick?.();
  };

  const isLight = theme === 'Light';
  const minHeight = 'min-h-[244px]';

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={`flex flex-col ${className}`}
      heightClassName={`h-full ${minHeight}`}
      theme={theme}
      aria-label={`Feature: ${title}`}
      data-feature-id={featureId}
      data-item-id={id}
    >
      {badge && (
        <div className="absolute top-2 right-2 z-10">
          <AdviceBadge text={badge} />
        </div>
      )}

      <div className="flex flex-col items-start px-4 pt-2.5 pb-3">
        <AdviceTitle theme={theme} className="text-left">
          {title}
        </AdviceTitle>
        <AdviceBodyText className="text-left mt-0.5">{description}</AdviceBodyText>
        {actionText && (
          <span className={`text-[14px] font-medium mt-2 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
            {actionText} →
          </span>
        )}
      </div>

      <div className="flex-1 w-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url('${imageUrl}')` }} />
    </AdviceCardContainer>
  );
}