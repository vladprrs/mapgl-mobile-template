'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { debugLog } from '@/lib/logging';
import { InterestingProps } from './types';

/**
 * Interesting Component
 * Feature promotion card for app functions or important information
 * 
 * Design specs from Figma (node: 119-67257):
 * - Container: Full size with rounded-xl (12px), theme-specific background
 * - Light theme: White background (#FFFFFF)
 * - Dark theme: rgba(255,255,255,0.06) background
 * - Text section: 16px left/right padding
 * - Title: 16px Medium, #141414 (Light) / #FFFFFF (Dark), -0.24px tracking
 * - Subtitle: 14px Regular, #898989, -0.28px tracking
 * - Image: Background image fills remaining space, centered, contained
 */
export function Interesting({
  title,
  subtitle,
  imageUrl,
  featureId,
  onClick,
  className = '',
  theme = 'Light',
}: InterestingProps) {
  const handleClick = () => {
    debugLog('Interesting clicked:', { title, featureId });
    onClick?.();
  };

  const isLight = theme === 'Light';

  // Container styles using design tokens
  const containerStyles = {
    backgroundColor: isLight ? tokens.colors.background.primary : 'rgba(255,255,255,0.06)',
    borderRadius: tokens.borders.radius.xl,
  };

  // Text colors using design tokens
  const titleColor = isLight ? tokens.colors.text.primary : tokens.colors.white;
  const subtitleColor = tokens.colors.text.secondary;

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col h-full overflow-hidden cursor-pointer ${className}`}
      style={containerStyles}
      aria-label={`Feature: ${title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Text section */}
      <div
        className="flex flex-col items-start"
        style={{
          paddingLeft: tokens.spacing[4],
          paddingRight: tokens.spacing[4],
          paddingTop: '10px', // Exact Figma spec (pt-2.5)
          paddingBottom: '12px', // Exact Figma spec (pb-3)
        }}
      >
        {/* Title */}
        <h3
          className="text-left leading-5 font-medium"
          style={{
            color: titleColor,
            fontSize: tokens.typography.fontSize.base,
            letterSpacing: '-0.24px',
            margin: 0,
            padding: 0,
            paddingBottom: '2px', // Small gap between title and subtitle
          }}
        >
          {title}
        </h3>
        
        {/* Subtitle */}
        {subtitle && (
          <p
            className="text-left leading-[18px] font-normal"
            style={{
              color: subtitleColor,
              fontSize: tokens.typography.fontSize.sm,
              letterSpacing: '-0.28px',
              margin: 0,
              padding: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Image section */}
      {imageUrl && (
        <div
          className="flex-1 w-full bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}