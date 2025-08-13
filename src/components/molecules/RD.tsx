'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { debugLog } from '@/lib/logging';
import { RDProps } from './types';

/**
 * RD (РекламоДатель/Advertiser) Component
 * Advertiser card promoting specific establishments with gallery and details
 * Always renders at double height (244px) in masonry layout
 * 
 * Design specs from Figma (node: 119-66916):
 * - Height: 244px (double height in masonry layout)
 * - Border radius: 12px (tokens.borders.radius.xl)
 * - Gallery: 100px height, 8px padding, flex-1 + 48px layout
 * - Title: 16px Semibold, -0.24px tracking, #141414 (Light) / #FFFFFF (Dark)
 * - Crown badge: Green crown icon for verified businesses
 * - Subtitle: 14px Regular, -0.28px tracking, #898989
 * - Rating: Star icon + 14px Medium text, theme-aware
 * - Distance: 14px Medium text, #898989
 * - Address: 14px Regular text, #898989, positioned at bottom
 * - Light theme: White background (#FFFFFF)
 * - Dark theme: rgba(255,255,255,0.06) background
 */
export function RD({
  advertiserName,
  subtitle,
  rating,
  distance,
  address,
  images = [],
  isVerified = false,
  onClick,
  className = '',
  theme = 'Light',
}: RDProps) {
  const handleClick = () => {
    debugLog('RD clicked:', { advertiserName });
    onClick?.();
  };

  const isLight = theme === 'Light';
  const displayImages = images.slice(0, 2);
  const remainingCount = images.length > 2 ? images.length - 2 : 0;

  // Container styles using design tokens
  const containerStyles = {
    backgroundColor: isLight ? tokens.colors.background.primary : 'rgba(255,255,255,0.06)',
    borderRadius: tokens.borders.radius.xl,
    height: '244px', // Double height from Figma
  };

  // Text colors using design tokens
  const titleColor = isLight ? tokens.colors.text.primary : tokens.colors.text.inverse;
  const ratingColor = isLight ? tokens.colors.text.primary : tokens.colors.text.inverse;

  // Star icon SVG with theme-aware colors
  const starIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L10.163 5.379L15 6.089L11.5 9.479L12.326 14.289L8 12.012L3.674 14.289L4.5 9.479L1 6.089L5.837 5.379L8 1Z" 
            fill={isLight ? '#EFA701' : '#FFC94D'}/>
    </svg>
  );

  // Crown/verified badge SVG with theme-aware colors
  const crownIcon = isVerified ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10L4 4L8 7L12 4L14 10V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V10Z" 
            fill={isLight ? '#1BA136' : '#26C947'}/>
      <circle cx="8" cy="7" r="1" fill="white"/>
    </svg>
  ) : null;

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={containerStyles}
      aria-label={`Advertiser: ${advertiserName}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Gallery section - exactly 100px height, 8px padding */}
      {displayImages.length > 0 && displayImages[0] && (
        <div 
          className="flex gap-px"
          style={{
            height: '100px',
            padding: tokens.spacing[2], // 8px
            paddingTop: tokens.spacing[2], // 8px
            paddingBottom: 0,
          }}
        >
          {/* First image - takes remaining space (flex-1) */}
          <div className="flex-1 relative rounded-bl-lg rounded-tl-lg overflow-hidden">
            <Image
              src={displayImages[0]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
              unoptimized
            />
            <div 
              className="absolute inset-0 pointer-events-none rounded-bl-lg rounded-tl-lg"
              style={{
                border: '0.5px solid rgba(137,137,137,0.3)',
              }}
              aria-hidden="true"
            />
          </div>
          
          {/* Second image - exactly 48px width */}
          {displayImages[1] && (
            <div className="relative rounded-br-lg rounded-tr-lg overflow-hidden" style={{ width: '48px', height: '100px' }}>
              <Image
                src={displayImages[1]}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
                unoptimized
              />
              {remainingCount > 0 && (
                <>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-white font-medium text-center"
                      style={{
                        fontSize: tokens.typography.fontSize.base,
                        lineHeight: '20px',
                        letterSpacing: '-0.24px',
                      }}
                    >
                      {remainingCount > 999 ? '999+' : remainingCount}
                    </span>
                  </div>
                </>
              )}
              <div 
                className="absolute inset-0 pointer-events-none rounded-br-lg rounded-tr-lg"
                style={{
                  border: '0.5px solid rgba(137,137,137,0.3)',
                }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      )}

      {/* Content section - flex-col with justify-between */}
      <div 
        className="flex flex-col justify-between"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: displayImages.length > 0 && displayImages[0] ? '108px' : '0', // 100px gallery + 8px padding
          paddingLeft: tokens.spacing[4], // 16px
          paddingRight: tokens.spacing[4], // 16px
          paddingBottom: tokens.spacing[3], // 12px
          paddingTop: displayImages.length > 0 && displayImages[0] ? tokens.spacing[2] : tokens.spacing[4], // 8px if gallery, 16px if no gallery
        }}
      >
        {/* Top section with title, subtitle, rating, distance */}
        <div className="flex flex-col">
          {/* Title with verified badge */}
          <div className="flex items-center" style={{ paddingBottom: '2px' }}>
            <h3 
              className="text-left"
              style={{
                color: titleColor,
                fontSize: tokens.typography.fontSize.lg,
                fontWeight: tokens.typography.fontWeight.semibold,
                lineHeight: '20px',
                letterSpacing: '-0.24px',
                margin: 0,
                padding: 0,
              }}
            >
              {advertiserName}
            </h3>
            {isVerified && (
              <div style={{ marginLeft: '4px' }}>
                {crownIcon}
              </div>
            )}
          </div>
          
          {/* Subtitle */}
          {subtitle && (
            <p 
              className="font-normal text-left"
              style={{
                color: tokens.colors.text.secondary,
                fontSize: tokens.typography.fontSize.sm,
                lineHeight: '18px',
                letterSpacing: '-0.28px',
                margin: 0,
                padding: 0,
                paddingBottom: '2px',
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Rating and distance row */}
          {(rating || distance) && (
            <div className="flex items-center gap-2" style={{ paddingTop: '6px' }}>
              {rating && (
                <div className="flex items-center gap-1">
                  {starIcon}
                  <span 
                    className="font-medium text-left"
                    style={{
                      color: ratingColor,
                      fontSize: tokens.typography.fontSize.sm,
                      lineHeight: '18px',
                      letterSpacing: '-0.28px',
                    }}
                  >
                    {rating}
                  </span>
                </div>
              )}
              {distance && (
                <span 
                  className="font-medium text-left"
                  style={{
                    color: tokens.colors.text.secondary,
                    fontSize: tokens.typography.fontSize.sm,
                    lineHeight: '18px',
                    letterSpacing: '-0.28px',
                  }}
                >
                  {distance}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Address at bottom */}
        {address && (
          <p 
            className="font-normal text-left"
            style={{
              color: tokens.colors.text.secondary,
              fontSize: tokens.typography.fontSize.sm,
              lineHeight: '18px',
              letterSpacing: '-0.28px',
              margin: 0,
              padding: 0,
              paddingTop: '6px',
            }}
          >
            {address}
          </p>
        )}
      </div>
    </div>
  );
}