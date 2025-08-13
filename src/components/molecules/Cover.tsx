'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { CoverProps } from './types';
import { AdviceCardContainer } from '@/components/molecules';

/**
 * Cover Component
 * Featured collection cover showcasing compilations
 * 
 * Design specs from Figma:
 * - Default state: 116px height (single height in masonry)
 * - Big state: 244px height (double height in masonry)
 * - Rounded: 12px (rounded-xl)
 * - Background image with gradient overlay
 * - Title: 16px, Medium, -0.24px tracking, white
 * - Subtitle: 13px, Regular, -0.234px tracking, white
 * - Gradient: from rgba(0,0,0,0.6) to transparent via rgba(0,0,0,0.28) at 42%
 * - Border: 0.5px rgba(137,137,137,0.3)
 * - Light theme only (always white text on image)
 */
export function Cover({
  title,
  subtitle,
  images = [],
  isGoodAdvisor = false,
  isHorizontal = false,
  onClick,
  className = '',
}: CoverProps) {
  const handleClick = () => {
    debugLog('Cover clicked:', { title });
    onClick?.();
  };

  const isBig = isHorizontal;
  const height = isBig ? 'h-[244px]' : 'h-[116px]';

  // Use first image as background
  const backgroundImage = images.length > 0 ? images[0] : undefined;

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={`${className}`}
      heightClassName={height}
      aria-label={`Collection: ${title}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${backgroundImage}')` }} />
      )}

      {isBig ? (
        <div className="absolute inset-0 rounded-xl bg-black/40" />
      ) : (
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.28) 42.336%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      )}

      <div className="absolute inset-0 px-4 pt-2.5 pb-0 flex flex-col">
        <h3 className="font-medium text-[16px] leading-5 tracking-[-0.24px] text-white text-left">{title}</h3>
        {subtitle && (
          <p className="text-[13px] leading-4 tracking-[-0.234px] text-white text-left mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="absolute inset-0 border-[0.5px] border-[rgba(137,137,137,0.3)] rounded-xl pointer-events-none" aria-hidden="true" />
    </AdviceCardContainer>
  );
}