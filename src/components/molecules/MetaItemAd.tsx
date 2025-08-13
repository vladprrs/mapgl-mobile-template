'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { debugLog } from '@/lib/logging';
import { MetaItemAdProps } from './types';

/**
 * MetaItemAd Component
 * Advertisement search card that leads to sponsored search results
 * 
 * Design specs from Figma (node: 119-66974):
 * - Height: 116px fixed
 * - Rounded: 12px (rounded-xl)
 * - Gradient background with SVG mask effect
 * - Title: 16px, Medium, -0.24px tracking
 * - "Реклама" label: 11px, Regular, -0.176px tracking, 30% opacity
 * - Logo: 48px circle in bottom-right
 * - Light theme: White bg, rgba(20,20,20,0.3) ad label, rgba(20,20,20,0.06) border
 * - Dark theme: rgba(255,255,255,0.06) bg, rgba(255,255,255,0.3) ad label, rgba(255,255,255,0.06) border
 */
export function MetaItemAd({
  title,
  logoUrl,
  gradientColor,
  gradientMaskUrl,
  searchPhrase,
  advertiserId,
  isSponsored = true,
  backgroundColor,
  onClick,
  className = '',
  theme = 'Light',
}: MetaItemAdProps) {
  const handleClick = () => {
    debugLog('MetaItemAd clicked:', { title, advertiserId, searchPhrase });
    onClick?.();
  };

  const isLight = theme === 'Light';

  // Container styles using design tokens
  const containerStyles = {
    backgroundColor: backgroundColor || (isLight ? tokens.colors.background.primary : 'rgba(255,255,255,0.06)'),
    borderRadius: tokens.borders.radius.xl,
    height: '116px',
  };

  // Text colors using design tokens
  const titleColor = isLight ? tokens.colors.text.primary : tokens.colors.white;
  const adLabelColor = isLight ? 'rgba(20, 20, 20, 0.3)' : 'rgba(255, 255, 255, 0.3)';
  const borderColor = isLight ? 'rgba(20, 20, 20, 0.06)' : 'rgba(255, 255, 255, 0.06)';

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer overflow-hidden ${className}`}
      style={containerStyles}
      aria-label={`Sponsored: ${title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Gradient overlay with mask */}
      {gradientColor && gradientMaskUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: gradientColor,
            maskImage: `url(${gradientMaskUrl})`,
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${gradientMaskUrl})`,
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        />
      )}

      {/* Logo in bottom-right corner */}
      {logoUrl && (
        <div 
          className="absolute bottom-3 right-4"
          style={{
            width: '48px',
            height: '48px',
          }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{ backgroundColor: tokens.colors.white }}
          >
            <Image 
              src={logoUrl} 
              alt={`${title} logo`} 
              width={48} 
              height={48} 
              className="w-full h-full object-cover" 
              unoptimized 
            />
          </div>
        </div>
      )}

      {/* Text content */}
      <div 
        className="absolute inset-0 flex flex-col justify-between"
        style={{
          paddingLeft: tokens.spacing[4],
          paddingRight: tokens.spacing[4],
          paddingTop: '10px', // Exact Figma spec (tokens.spacing[2.5] doesn't exist)
          paddingBottom: '13px', // Exact Figma spec
        }}
      >
        {/* Title */}
        <div className="w-full">
          <h3
            className="text-left leading-5 font-medium"
            style={{
              color: titleColor,
              fontSize: tokens.typography.fontSize.base,
              letterSpacing: '-0.24px',
              margin: 0,
              padding: 0,
            }}
          >
            {title}
          </h3>
        </div>

        {/* "Реклама" label */}
        <div className="w-full">
          <p
            className="text-left leading-[14px] font-normal"
            style={{
              color: adLabelColor,
              fontSize: '11px',
              letterSpacing: '-0.176px',
              margin: 0,
              padding: 0,
            }}
          >
            Реклама
          </p>
        </div>
      </div>

      {/* Border overlay */}
      <div
        className="absolute inset-0 border pointer-events-none"
        style={{
          borderColor: borderColor,
          borderRadius: tokens.borders.radius.xl,
        }}
        aria-hidden="true"
      />
    </div>
  );
}