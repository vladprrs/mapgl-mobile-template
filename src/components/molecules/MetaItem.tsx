'use client';

import React from 'react';
import Image from 'next/image';
import { debugLog } from '@/lib/logging';
import { MetaItemProps } from './types';
import { AdviceCardContainer, AdviceTitle, AdviceSubtitle } from '@/components/molecules';

/**
 * MetaItem Component
 * Category/rubric search card that leads to filtered search results
 * 
 * Design specs from Figma:
 * - Height: 116px fixed
 * - Rounded: 12px (rounded-xl)
 * - Title: 16px, Medium, -0.24px tracking, 2 lines max
 * - Subtitle: 13px, Regular, -0.234px tracking
 * - Icon: 48px circle with 32px icon inside, bottom-right position
 * - Light theme: White background, rgba(20,20,20,0.06) icon bg
 * - Dark theme: rgba(255,255,255,0.06) background and icon bg
 */
export function MetaItem({
  category,
  count,
  image,
  backgroundColor,
  onClick,
  className = '',
  theme = 'light',
}: MetaItemProps) {
  const handleClick = () => {
    debugLog('MetaItem clicked:', { category, count });
    onClick?.();
  };

  const adviceTheme = theme === 'light' ? 'Light' : 'Dark';
  const isLight = theme === 'light';

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={`flex flex-col justify-between px-4 pb-3 pt-2.5 ${className}`}
      heightClassName="h-[116px]"
      theme={adviceTheme}
      aria-label={`Search in ${category}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="flex flex-col items-start">
        <AdviceTitle theme={adviceTheme} className="text-left line-clamp-2">
          {category}
        </AdviceTitle>
        {count > 0 && (
          <AdviceSubtitle className="text-left mt-0.5">
            {count} {count === 1 ? 'место' : count < 5 ? 'места' : 'мест'}
          </AdviceSubtitle>
        )}
      </div>

      {image && (
        <div className="flex justify-end">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isLight ? 'bg-[rgba(20,20,20,0.06)]' : 'bg-[rgba(255,255,255,0.06)]'
          }`}>
            <Image src={image} alt="" width={32} height={32} className="w-8 h-8" unoptimized />
          </div>
        </div>
      )}
    </AdviceCardContainer>
  );
}