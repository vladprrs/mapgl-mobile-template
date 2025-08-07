'use client';

import React from 'react';
import { InterestingProps } from './types';

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
    console.log('Interesting clicked:', { featureId });
    onClick?.();
  };

  const isLight = theme === 'Light';
  // Interesting is always double height (244px) in masonry layout
  const minHeight = 'min-h-[244px]';
  
  return (
    <button
      onClick={handleClick}
      className={`
        relative w-full h-full ${minHeight}
        rounded-xl overflow-hidden
        flex flex-col
        transition-transform active:scale-95
        ${isLight ? 'bg-white' : 'bg-white/[0.06]'}
        ${className}
      `}
      aria-label={`Feature: ${title}`}
      data-feature-id={featureId}
      data-item-id={id}
    >
      {/* Badge if present */}
      {badge && (
        <div className="absolute top-2 right-2 z-10">
          <span className="text-[10px] font-semibold text-white bg-red-500 px-2 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Text content */}
      <div className="flex flex-col items-start px-4 pt-2.5 pb-3">
        <h3 
          className={`
            font-medium text-[16px] leading-5 tracking-[-0.24px] text-left
            ${isLight ? 'text-[#141414]' : 'text-white'}
          `}
        >
          {title}
        </h3>
        <p 
          className="text-[14px] leading-[18px] tracking-[-0.28px] text-[#898989] text-left mt-0.5"
        >
          {description}
        </p>
        {actionText && (
          <span 
            className={`
              text-[14px] font-medium mt-2
              ${isLight ? 'text-blue-600' : 'text-blue-400'}
            `}
          >
            {actionText} →
          </span>
        )}
      </div>

      {/* Image at bottom - takes remaining space */}
      <div 
        className="flex-1 w-full bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
    </button>
  );
}