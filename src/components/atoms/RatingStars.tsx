'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

interface RatingStarsProps {
  rating: number; // e.g., 4.6
  maxStars?: number; // default 5
  size?: number; // default 16px (matches Figma 16x16)
  showNumber?: boolean;
  reviewCount?: number;
  theme?: 'Light' | 'Dark';
}

export function RatingStars({ 
  rating, 
  maxStars = 5, 
  size = 16, 
  showNumber = true, 
  reviewCount,
  theme = 'Light' 
}: RatingStarsProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  const starColor = '#efa701'; // Exact from Figma
  const emptyColor = 'rgba(20,20,20,0.09)'; // Exact from Figma
  const textColor = theme === 'Light' ? tokens.colors.text.primary : tokens.colors.text.inverse;
  const secondaryTextColor = theme === 'Light' ? tokens.colors.text.secondary : tokens.colors.text.tertiary;

  return (
    <div className="flex flex-row gap-2 items-start justify-start">
      {/* Stars container */}
      <div className="flex flex-row items-start justify-start">
        {Array.from({ length: maxStars }, (_, index) => {
          const isFilled = index < filledStars;
          const isHalf = index === filledStars && hasHalfStar;
          
          return (
            <div 
              key={index}
              className="relative shrink-0"
              style={{ width: size, height: size }}
            >
              {/* Star background container */}
              <div 
                className="absolute left-0 top-0"
                style={{ width: size, height: size }}
              />
              
              {/* Left half of star */}
              <div
                className="absolute bottom-0 left-0 top-0"
                style={{ 
                  right: '50%',
                  backgroundColor: isFilled || isHalf ? starColor : emptyColor 
                }}
              />
              
              {/* Right half of star */}
              <div
                className="absolute bottom-0 top-0"
                style={{ 
                  left: '50%',
                  right: 0,
                  backgroundColor: isFilled ? starColor : emptyColor 
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Rating number and review count */}
      {showNumber && (
        <div className="basis-0 flex flex-row gap-1.5 grow items-start justify-start min-h-px min-w-px">
          <div className="flex flex-row items-start justify-start px-0 py-0.5">
            <div
              className="font-['SB_Sans_Text:Medium',_sans-serif] leading-[0] not-italic text-[14px] text-left text-nowrap tracking-[-0.28px]"
              style={{ color: textColor }}
            >
              <p className="adjustLetterSpacing block leading-[18px] whitespace-pre">
                {rating.toFixed(1)}
              </p>
            </div>
          </div>
          
          {reviewCount && (
            <div className="basis-0 flex flex-row grow items-start justify-start min-h-px min-w-px px-0 py-0.5">
              <div
                className="font-['SB_Sans_Text:Regular',_sans-serif] leading-[0] not-italic text-[14px] text-left text-nowrap tracking-[-0.28px]"
                style={{ color: secondaryTextColor }}
              >
                <p className="adjustLetterSpacing block leading-[18px] whitespace-pre">
                  {reviewCount} оценок
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}