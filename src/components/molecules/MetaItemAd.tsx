'use client';

import React from 'react';
import Image from 'next/image';
import { debugLog } from '@/lib/logging';
import { MetaItemAdProps } from './types';
import { AdviceCardContainer, AdviceTitle } from '@/components/molecules';

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
  category,
  companyName,
  subtitle,
  image,
  backgroundColor,
  gradientColors,
  onClick,
  className = '',
  theme = 'light',
}: MetaItemAdProps) {
  const handleClick = () => {
    debugLog('MetaItemAd clicked:', { category, companyName });
    onClick?.();
  };

  const adviceTheme = theme === 'light' ? 'Light' : 'Dark';
  const isLight = theme === 'light';

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={className}
      heightClassName="h-[116px]"
      theme={adviceTheme}
      aria-label={`Sponsored: ${category}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {gradientColors && gradientColors.length >= 2 && (
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
          }}
        />
      )}

      {image && (
        <div className="absolute bottom-3 right-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
            <Image src={image} alt="" width={48} height={48} className="w-full h-full object-cover" unoptimized />
          </div>
        </div>
      )}

      <div className="absolute inset-0 px-4 pt-2.5 pb-[13px] flex flex-col justify-between">
        <div>
          <AdviceTitle theme={adviceTheme} className="text-left">
            {category}
          </AdviceTitle>
          {companyName && (
            <p className="text-[13px] leading-4 tracking-[-0.234px] text-left mt-0.5">
              {companyName}
            </p>
          )}
          {subtitle && (
            <p className="text-[11px] leading-[14px] tracking-[-0.176px] text-left mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <p
          className={`text-[11px] leading-[14px] tracking-[-0.176px] text-left ${
            isLight ? 'text-[rgba(20,20,20,0.3)]' : 'text-white/30'
          }`}
        >
          Реклама
        </p>
      </div>

      <div
        className={`absolute inset-0 border rounded-xl pointer-events-none ${
          isLight ? 'border-[rgba(20,20,20,0.06)]' : 'border-white/[0.06]'
        }`}
        aria-hidden="true"
      />
    </AdviceCardContainer>
  );
}