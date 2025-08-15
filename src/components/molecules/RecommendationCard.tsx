'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

interface RecommendationCardProps {
  id: string;
  icon: string; // Now represents image path instead of emoji
  title: string;
  onClick?: () => void;
  theme?: 'Light' | 'Dark';
}

/**
 * RecommendationCard Component
 * Horizontal recommendation card for search suggestions empty state
 * 
 * Design specs from Figma node 286-221899:
 * - Size: 88px width × 96px height (h-24)
 * - Background: rgba(20,20,20,0.06) (gray)
 * - Border radius: 12px (rounded-xl)
 * - Icon: 32px in white circle with 8px padding
 * - Text: 11px Medium, #141414, 14px line-height, -0.176px tracking
 * - Text padding: 8px horizontal, 3px top, 9px bottom
 */
export function RecommendationCard({ 
  id, 
  icon, 
  title, 
  onClick, 
  theme = 'Light' 
}: RecommendationCardProps) {
  const isLight = theme === 'Light';
  
  const containerBg = isLight ? 'rgba(20,20,20,0.06)' : 'rgba(255,255,255,0.06)';
  const iconBg = isLight ? tokens.colors.white : 'rgba(255,255,255,0.06)';
  const textColor = isLight ? tokens.colors.text.primary : tokens.colors.text.inverse;

  return (
    <div
      onClick={onClick}
      className="flex flex-col h-24 items-start justify-between p-0 relative rounded-xl shrink-0 w-[88px] cursor-pointer"
      style={{
        backgroundColor: containerBg,
      }}
      aria-label={`Search for ${title}`}
    >
      {/* Icon Section */}
      <div className="flex flex-row gap-2.5 items-start justify-start pb-0 pl-2 pr-0 pt-2 relative shrink-0 w-full">
        <div 
          className="flex flex-row items-center justify-center p-2 relative rounded-[26px] shrink-0"
          style={{
            backgroundColor: iconBg,
          }}
        >
          <div className="overflow-clip relative shrink-0 size-8 flex items-center justify-center">
            <img
              src={icon}
              alt={title}
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-start justify-start overflow-clip px-2 py-0 relative rounded-xl shrink-0 w-full">
        <div className="flex flex-row items-start justify-start pb-[9px] pt-[3px] px-0 relative shrink-0 w-full">
          <div 
            className="basis-0 grow min-h-px min-w-px relative shrink-0 text-left"
            style={{
              fontSize: '11px',
              fontWeight: tokens.typography.fontWeight.medium,
              color: textColor,
              letterSpacing: '-0.176px',
              lineHeight: '14px',
            }}
          >
            <p className="block leading-[14px]">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}