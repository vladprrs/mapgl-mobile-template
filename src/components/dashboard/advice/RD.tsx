'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { RDProps } from './types';
import { AdviceCardContainer, AdviceBodyText, AdviceTitle } from './primitives';

/**
 * RD (РекламоДатель/Advertiser) Component
 * Advertiser card promoting specific establishments with gallery and details
 * Always renders at double height (244px) in masonry layout
 * 
 * Design specs from Figma:
 * - Height: 244px (double height in masonry layout, with gallery)
 * - Rounded: 12px (rounded-xl)
 * - Gallery: horizontal images with counter overlay for additional photos
 * - Title: 16px, Semibold, -0.24px tracking
 * - Subtitle: 14px, Regular, -0.28px tracking
 * - Rating: Star icon with 14px Medium text
 * - Distance: 14px Medium text
 * - Address: 14px Regular text
 * - Verified badge: Crown icon after title
 * - Light theme: White bg, #141414 title, #898989 subtitle
 * - Dark theme: rgba(255,255,255,0.06) bg, white title, #898989 subtitle
 */
export function RD({
  id,
  advertiserName,
  subtitle,
  images = [],
  rating,
  distance,
  address,
  establishmentIds,
  organizationId,
  theme = 'Light',
  isVerified = false,
  onClick,
  className = '',
}: RDProps) {
  const handleClick = () => {
    debugLog('RD clicked:', { organizationId, establishmentIds });
    onClick?.();
  };

  const isLight = theme === 'Light';
  const displayImages = images.slice(0, 2);
  const remainingCount = images.length > 2 ? images.length - 2 : 0;

  // Star icon SVG
  const starIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L10.163 5.379L15 6.089L11.5 9.479L12.326 14.289L8 12.012L3.674 14.289L4.5 9.479L1 6.089L5.837 5.379L8 1Z" 
            fill={isLight ? '#EFA701' : '#FFC94D'}/>
    </svg>
  );

  // Crown/verified badge SVG  
  const crownIcon = isVerified ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
      <path d="M2 10L4 4L8 7L12 4L14 10V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V10Z" 
            fill={isLight ? '#1BA136' : '#26C947'}/>
      <circle cx="8" cy="7" r="1" fill="white"/>
    </svg>
  ) : null;

  return (
    <AdviceCardContainer
      onClick={handleClick}
      className={`${className}`}
      heightClassName="h-[244px]"
      theme={theme}
      aria-label={`Advertiser: ${advertiserName}`}
      data-organization-id={organizationId}
      data-item-id={id}
    >
      {/* Gallery section - exactly 100px height */}
      {displayImages.length > 0 && (
        <div className="absolute top-2 left-2 right-2 h-[100px] flex gap-px">
          {/* First image - takes remaining space */}
          {displayImages[0] && (
            <div className="flex-1 relative rounded-l-lg overflow-hidden">
              <img 
                src={displayImages[0]} 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[0.5px] border-[rgba(137,137,137,0.3)] rounded-l-lg pointer-events-none" />
            </div>
          )}
          
          {/* Second image or counter */}
          {displayImages[1] && (
            <div className="w-12 h-[100px] relative rounded-r-lg overflow-hidden">
              <img 
                src={displayImages[1]} 
                alt="" 
                className="w-full h-full object-cover"
              />
              {remainingCount > 0 && (
                <>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[16px] font-medium tracking-[-0.24px]">
                      {remainingCount > 999 ? '999+' : remainingCount}
                    </span>
                  </div>
                </>
              )}
              <div className="absolute inset-0 border-[0.5px] border-[rgba(137,137,137,0.3)] rounded-r-lg pointer-events-none" />
            </div>
          )}
        </div>
      )}

      {/* Content section - positioned below gallery */}
      <div className={`
        absolute inset-x-0 bottom-0 flex flex-col justify-between
        ${displayImages.length > 0 ? 'top-[116px] pb-3 px-4' : 'top-0 p-4'}
      `}>
        {/* Top section with title and info */}
        <div className="flex-1 flex flex-col">
          {/* Title with verified badge */}
          <div className="flex items-center">
            <AdviceTitle theme={theme} className="font-semibold">
              {advertiserName}
            </AdviceTitle>
            {crownIcon}
          </div>
          
          {/* Subtitle */}
          {subtitle && (
            <AdviceBodyText className="mt-0.5">{subtitle}</AdviceBodyText>
          )}

          {/* Rating and distance row */}
          {(rating || distance) && (
            <div className="flex items-center gap-2 mt-1">
              {rating && (
                <div className="flex items-center gap-1">
                  {starIcon}
                  <span className={`
                    font-medium text-[14px] leading-[18px] tracking-[-0.28px]
                    ${isLight ? 'text-[#141414]' : 'text-white'}
                  `}>
                    {rating}
                  </span>
                </div>
              )}
              {distance && (
                <span className="font-medium text-[14px] leading-[18px] tracking-[-0.28px] text-[#898989]">{distance}</span>
              )}
            </div>
          )}
        </div>

        {/* Address at bottom */}
        {address && (
          <AdviceBodyText>{address}</AdviceBodyText>
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
    </AdviceCardContainer>
  );
}