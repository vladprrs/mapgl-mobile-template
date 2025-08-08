'use client';

import React from 'react';
import { MetaItemProps } from './types';
import { AdviceCardContainer, AdviceIconCircle, AdviceTitle, AdviceSubtitle } from './primitives';

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
  id,
  title,
  subtitle,
  iconUrl,
  categoryId,
  searchQuery,
  theme = 'Light',
  onClick,
  className = '',
}: MetaItemProps) {
  const handleClick = () => {
    console.log('MetaItem clicked:', { categoryId, searchQuery });
    onClick?.();
  };

  const isLight = theme === 'Light';

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={`flex flex-col justify-between px-4 pb-3 pt-2.5 ${className}`}
      heightClassName="h-[116px]"
      theme={theme}
      aria-label={`Search in ${title}`}
      data-category-id={categoryId}
      data-item-id={id}
    >
      <div className="flex flex-col items-start">
        <AdviceTitle theme={theme} className="text-left line-clamp-2">
          {title}
        </AdviceTitle>
        {subtitle && (
          <AdviceSubtitle className="text-left mt-0.5">{subtitle}</AdviceSubtitle>
        )}
      </div>

      {iconUrl && (
        <div className="flex justify-end">
          <AdviceIconCircle isLight={isLight}>
            <img src={iconUrl} alt="" className="w-8 h-8" />
          </AdviceIconCircle>
        </div>
      )}
    </AdviceCardContainer>
  );
}