'use client';

import React from 'react';
import { MetaItemProps } from './types';

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
    <button
      onClick={handleClick}
      className={`
        relative w-full h-[116px]
        rounded-xl
        flex flex-col justify-between
        px-4 pb-3 pt-2.5
        transition-transform active:scale-95
        ${isLight ? 'bg-white' : 'bg-white/[0.06]'}
        ${className}
      `}
      aria-label={`Search in ${title}`}
      data-category-id={categoryId}
      data-item-id={id}
    >
      {/* Text content */}
      <div className="flex flex-col items-start">
        <h3 
          className={`
            font-medium text-[16px] leading-5 tracking-[-0.24px] text-left
            line-clamp-2
            ${isLight ? 'text-[#141414]' : 'text-white'}
          `}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-[13px] leading-4 tracking-[-0.234px] text-[#898989] text-left mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Icon in bottom-right */}
      {iconUrl && (
        <div className="flex justify-end">
          <div 
            className={`
              w-12 h-12 rounded-full
              flex items-center justify-center
              ${isLight ? 'bg-[rgba(20,20,20,0.06)]' : 'bg-white/[0.06]'}
            `}
          >
            <img 
              src={iconUrl} 
              alt="" 
              className="w-8 h-8"
            />
          </div>
        </div>
      )}
    </button>
  );
}