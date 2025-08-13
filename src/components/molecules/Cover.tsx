'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { debugLog } from '@/lib/logging';
import { CoverProps } from './types';

/**
 * Cover Component
 * Featured collection cover showcasing compilations
 * 
 * Design specs from Figma:
 * - Default state: 116px height (single height in masonry)
 * - Big state: 244px height (double height in masonry)
 * - Rounded: 12px (tokens.borders.radius.lg)
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
  variant = 'default',
  onClick,
  className = '',
}: CoverProps) {
  const handleClick = () => {
    debugLog('Cover clicked:', { title });
    onClick?.();
  };

  const isBig = variant === 'big';
  const height = isBig ? 'h-[244px]' : 'h-[116px]';

  // Use first image as background
  const backgroundImage = images.length > 0 ? images[0] : undefined;

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer overflow-hidden ${height} ${className}`}
      style={{
        borderRadius: tokens.borders.radius.lg,
        backgroundColor: variant === 'default' ? tokens.colors.white : 'transparent',
      }}
      aria-label={`Collection: ${title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `url('${backgroundImage}')`,
            borderRadius: tokens.borders.radius.lg,
          }} 
        />
      )}

      {/* Overlay */}
      {variant === 'big' ? (
        <div 
          className="absolute inset-0" 
          style={{
            borderRadius: tokens.borders.radius.lg,
          }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.28) 42.336%, rgba(0, 0, 0, 0) 100%)',
            borderRadius: tokens.borders.radius.lg,
          }}
        />
      )}

      {/* Text Content */}
      <div 
        className="absolute inset-0 flex flex-col"
        style={{
          paddingLeft: tokens.spacing[4],
          paddingRight: tokens.spacing[4],
          paddingTop: '10px', // Figma-specific value (pt-2.5)
          paddingBottom: '0px',
        }}
      >
        <div className="pb-0.5 pt-2.5">
          <h3 
            className="text-left"
            style={{
              fontWeight: tokens.typography.fontWeight.medium,
              fontSize: tokens.typography.fontSize.lg,
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              color: tokens.colors.text.inverse,
            }}
          >
            {title}
          </h3>
        </div>
        {subtitle && (
          <div className="py-px">
            <p 
              className="text-left"
              style={{
                fontWeight: tokens.typography.fontWeight.normal,
                fontSize: tokens.typography.fontSize.sm,
                lineHeight: '16px',
                letterSpacing: '-0.234px',
                color: tokens.colors.text.inverse,
              }}
            >
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Border */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          border: `0.5px solid ${tokens.colors.border.DEFAULT}`,
          borderRadius: tokens.borders.radius.lg,
        }}
        aria-hidden="true" 
      />
    </div>
  );
}