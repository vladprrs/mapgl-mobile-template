'use client';

import React from 'react';
import { MetaItemAdProps } from './types';

/**
 * MetaItemAd Component
 * Advertisement search card that leads to sponsored search results
 * 
 * Design specs from Figma:
 * - Height: 116px fixed
 * - Rounded: 12px (rounded-xl)
 * - Gradient background with mask effect
 * - Title: 16px, Medium, -0.24px tracking
 * - "Реклама" label: 11px, Regular, -0.176px tracking, 30% opacity
 * - Logo: 48px circle in bottom-right
 * - Light theme: White bg, rgba(20,20,20,0.3) ad label, rgba(20,20,20,0.06) border
 * - Dark theme: rgba(255,255,255,0.06) bg, rgba(255,255,255,0.3) ad label, rgba(255,255,255,0.06) border
 */
export function MetaItemAd({
  id,
  title,
  logoUrl,
  gradientColor = '#eb6100',
  gradientMaskUrl,
  searchPhrase,
  advertiserId,
  theme = 'Light',
  isSponsored = true,
  onClick,
  className = '',
}: MetaItemAdProps) {
  const handleClick = () => {
    console.log('MetaItemAd clicked:', { searchPhrase, advertiserId });
    onClick?.();
  };

  const isLight = theme === 'Light';

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-full h-[116px]
        rounded-xl overflow-hidden
        transition-transform active:scale-95
        ${isLight ? 'bg-white' : 'bg-white/[0.06]'}
        ${className}
      `}
      aria-label={`Sponsored: ${title}`}
      data-advertiser-id={advertiserId}
      data-item-id={id}
    >
      {/* Gradient background overlay with mask */}
      {gradientMaskUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: gradientColor,
            WebkitMaskImage: `url('${gradientMaskUrl}')`,
            maskImage: `url('${gradientMaskUrl}')`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskPosition: '0% 0%',
            maskPosition: '0% 0%',
          }}
        />
      )}

      {/* Logo in bottom-right */}
      {logoUrl && (
        <div className="absolute bottom-3 right-4">
          <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-[0.5px] border-[rgba(137,137,137,0.3)]">
            <img 
              src={logoUrl} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Text content */}
      <div className="absolute inset-0 px-4 pt-2.5 pb-[13px] flex flex-col justify-between">
        <h3 
          className={`
            font-medium text-[16px] leading-5 tracking-[-0.24px] text-left
            ${isLight ? 'text-[#141414]' : 'text-white'}
          `}
        >
          {title}
        </h3>
        
        {/* Advertisement label */}
        {isSponsored && (
          <p 
            className={`
              text-[11px] leading-[14px] tracking-[-0.176px] text-left
              ${isLight ? 'text-[rgba(20,20,20,0.3)]' : 'text-white/30'}
            `}
          >
            Реклама
          </p>
        )}
      </div>

      {/* Border */}
      <div 
        className={`
          absolute inset-0 border rounded-xl pointer-events-none
          ${isLight ? 'border-[rgba(20,20,20,0.06)]' : 'border-white/[0.06]'}
        `}
        aria-hidden="true"
      />
    </button>
  );
}