'use client';

import React from 'react';
import Image from 'next/image';
import { debugLog } from '@/lib/logging';
import { MetaItemAdProps } from './types';
import { AdviceCardContainer, AdviceTitle, AdviceLogoCircle } from './primitives';

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
    debugLog('MetaItemAd clicked:', { searchPhrase, advertiserId });
    onClick?.();
  };

  const isLight = theme === 'Light';

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={className}
      heightClassName="h-[116px]"
      theme={theme}
      aria-label={`Sponsored: ${title}`}
      data-advertiser-id={advertiserId}
      data-item-id={id}
    >
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

      {logoUrl && (
        <div className="absolute bottom-3 right-4">
          <AdviceLogoCircle>
            <Image src={logoUrl} alt="" width={48} height={48} className="w-full h-full object-cover" unoptimized />
          </AdviceLogoCircle>
        </div>
      )}

      <div className="absolute inset-0 px-4 pt-2.5 pb-[13px] flex flex-col justify-between">
        <AdviceTitle theme={theme} className="text-left">
          {title}
        </AdviceTitle>
        {isSponsored && (
          <p
            className={`text-[11px] leading-[14px] tracking-[-0.176px] text-left ${
              isLight ? 'text-[rgba(20,20,20,0.3)]' : 'text-white/30'
            }`}
          >
            Реклама
          </p>
        )}
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