'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { debugLog } from '@/lib/logging';
import { MetaItemProps } from './types';

/**
 * MetaItem Component
 * Category/rubric search card that leads to filtered search results
 * 
 * Design specs from Figma node 119-67226:
 * - Height: 116px fixed
 * - Border radius: 12px (tokens.borders.radius.lg)
 * - Title: 16px Medium, #141414 (light) / #FFFFFF (dark), 20px line-height, -0.24px tracking, max 2 lines
 * - Subtitle: 13px Regular, #898989, 16px line-height, -0.234px tracking
 * - Icon: 48px circle (p-[8px]) with 32px icon inside, bottom-right position
 * - Light theme: White background, rgba(20,20,20,0.06) icon bg
 * - Dark theme: rgba(255,255,255,0.06) background and icon bg
 */
export function MetaItem({
  title,
  subtitle,
  iconUrl,
  backgroundColor,
  onClick,
  className = '',
  theme = 'Light',
}: MetaItemProps) {
  const handleClick = () => {
    debugLog('MetaItem clicked:', { title, subtitle });
    onClick?.();
  };

  const isLight = theme === 'Light';

  const containerStyles = {
    backgroundColor: backgroundColor || (isLight ? tokens.colors.white : 'rgba(255,255,255,0.06)'),
    borderRadius: tokens.borders.radius.lg,
    height: '116px',
  };

  const titleColor = isLight ? tokens.colors.text.primary : tokens.colors.text.inverse;
  const iconBgColor = isLight ? tokens.colors.background.overlay : 'rgba(255,255,255,0.06)';

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-clip cursor-pointer ${className}`}
      style={containerStyles}
      aria-label={`Search in ${title}`}
    >
      <div 
        className="absolute inset-0 flex flex-col justify-between items-start overflow-clip"
        style={{
          paddingLeft: tokens.spacing[4],
          paddingRight: tokens.spacing[4], 
          paddingBottom: tokens.spacing[3],
          paddingTop: 0,
          borderRadius: tokens.borders.radius.lg,
        }}
      >
        {/* Text Section */}
        <div className="flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
          {/* Title Block */}
          <div 
            className="flex flex-row items-start justify-start relative shrink-0 w-full"
            style={{
              paddingTop: '10px', // pt-2.5 from Figma
              paddingBottom: '2px', // pb-0.5 from Figma
            }}
          >
            <div 
              className="basis-0 grow min-h-px min-w-px relative shrink-0 leading-[0] text-left"
              style={{
                fontSize: tokens.typography.fontSize.lg,
                fontWeight: tokens.typography.fontWeight.medium,
                color: titleColor,
                letterSpacing: '-0.24px',
                fontStyle: 'normal',
              }}
            >
              <p 
                className="block line-clamp-2"
                style={{ lineHeight: '20px' }}
              >
                {title}
              </p>
            </div>
          </div>
          
          {/* Subtitle Block */}
          {subtitle && (
            <div 
              className="flex flex-row items-start justify-start relative shrink-0 w-full"
              style={{
                paddingTop: '1px', // py-px from Figma
                paddingBottom: '1px', // py-px from Figma
              }}
            >
              <div 
                className="basis-0 grow min-h-px min-w-px relative shrink-0 leading-[0] text-left"
                style={{
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.normal,
                  color: tokens.colors.text.secondary,
                  letterSpacing: '-0.234px',
                  fontStyle: 'normal',
                }}
              >
                <p 
                  className="block"
                  style={{ lineHeight: '16px' }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Icon Section */}
        {iconUrl && (
          <div className="flex flex-row h-px items-end justify-end p-0 relative shrink-0 w-full">
            <div 
              className="flex flex-row items-center justify-center relative shrink-0"
              style={{
                backgroundColor: iconBgColor,
                borderRadius: tokens.borders.radius.full,
                padding: tokens.spacing[2], // 8px
              }}
            >
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
                  <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-8">
                    <Image 
                      src={iconUrl} 
                      alt="" 
                      width={32} 
                      height={32} 
                      className="block max-w-none size-full" 
                      unoptimized 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}