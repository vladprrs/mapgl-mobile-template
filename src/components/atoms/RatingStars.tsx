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

  // Create proper star shape using CSS clip-path
  const starPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';

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
              {/* Full star shape with clip-path */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: starPath,
                  backgroundColor: isFilled || isHalf ? starColor : emptyColor
                }}
              />
              
              {/* Half star overlay for partial ratings */}
              {isHalf && (
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: starPath,
                    background: `linear-gradient(90deg, ${starColor} 50%, ${emptyColor} 50%)`,
                  }}
                />
              )}
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