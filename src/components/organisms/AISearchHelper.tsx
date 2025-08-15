'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface AISearchHelperProps {
  searchQuery: string;
  onClick?: () => void;
  className?: string;
}

/**
 * AISearchHelper Component
 * AI helper card for search results - based on MastersNearbyCard but simplified
 * 
 * Design specs from Figma node 364-243412:
 * - White background with rounded corners (12px)
 * - AI icon (stars) in header
 * - Dynamic title: "Помогу найти {search_phrase}"
 * - NO friends avatars section (removed completely)
 * - Action button: "Найти лучшее предложение" with gradient
 * - Background blur effect (same as MastersNearbyCard)
 * - Height: auto, full width minus padding
 */
export function AISearchHelper({
  searchQuery,
  onClick,
  className = ''
}: AISearchHelperProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        backgroundColor: '#ffffff', // Exact white from Figma
        borderRadius: '12px', // rounded-xl from Figma
        paddingBottom: tokens.spacing[4], // 16px
        // Add subtle backdrop effects for complex design
        backdropFilter: 'blur(0.5px)', // Subtle blur for depth
        WebkitBackdropFilter: 'blur(0.5px)', // Safari support
      }}
    >
      {/* Background blur effect - SAME as MastersNearbyCard */}
      <div 
        className="absolute overflow-hidden"
        style={{ 
          height: '74px',
          left: 0,
          top: 0,
          width: '100%', // Full width like Figma
        }}
      >
        <div 
          className="absolute flex items-center justify-center"
          style={{
            height: '0px',
            width: '0px',
            top: '-131.26px',
            left: 'calc(50% - 128.199px)',
            transform: 'translateX(-50%)', // Center alignment from Figma
          }}
        >
          <div 
            className="flex-none"
            style={{ transform: 'rotate(135deg)' }}
          >
            <div
              className="relative"
              style={{
                height: '130.333px',
                width: '134.018px',
              }}
            >
              <div 
                className="absolute"
                style={{
                  inset: '-34.36% -54.83% -41.56% -16.11%', // Exact inset from Figma
                }}
              >
                <Image
                  alt="Background blur effect"
                  className="block max-w-none w-full h-full"
                  src="/assets/1d8cfc174e2159901a95d3ffc6692b6eadafbc8f.svg"
                  width={134}
                  height={130}
                  unoptimized
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header section - NO friends avatars */}
      <div 
        className="relative"
        style={{
          height: tokens.spacing[12], // 48px
          paddingLeft: tokens.spacing[4], // 16px
          paddingRight: tokens.spacing[4], // 16px
          paddingTop: tokens.spacing[4], // 16px
        }}
      >
        <div className="flex items-center gap-3">
          {/* AI Stars icon - SAME as MastersNearbyCard */}
          <div 
            className="overflow-hidden relative shrink-0"
            style={{
              width: tokens.spacing[6], // 24px
              height: tokens.spacing[6], // 24px
            }}
          >
            <div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '22px',
                height: '22px',
              }}
            >
              <Image
                alt="AI Stars"
                className="block max-w-none w-full h-full"
                src="/assets/3bf54109c4ca889133ecdfe5283cc2568df7e1f1.svg"
                width={22}
                height={22}
                unoptimized
              />
            </div>
          </div>

          {/* Dynamic title with search query */}
          <div className="flex-1">
            <h3
              className="font-semibold text-left"
              style={{
                color: tokens.colors.text.primary,
                fontSize: tokens.typography.fontSize.lg, // 16px
                lineHeight: '20px',
                letterSpacing: '-0.24px',
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              Помогу найти {searchQuery}
            </h3>
          </div>
        </div>
      </div>

      {/* Action button with gradient */}
      <div 
        className="relative"
        style={{
          paddingLeft: tokens.spacing[4], // 16px
          paddingRight: tokens.spacing[4], // 16px
          paddingTop: tokens.spacing[2], // 8px
        }}
      >
        <button
          onClick={onClick}
          className="w-full cursor-pointer flex items-center justify-center relative"
          style={{
            // Exact gradient from Figma CSS
            background: 'linear-gradient(136deg, #71F891 6.94%, #47E285 28.87%, #3588FD 72.48%, #2C7BE3 93.1%), rgba(20, 20, 20, 0.06)',
            border: '1px solid #51E081', // Exact border from Figma
            borderRadius: '8px', // Exact border-radius from Figma
            paddingTop: '10px', // py-2.5 from Figma (2.5 * 4 = 10px)
            paddingBottom: '10px',
            paddingLeft: '14px', // px-3.5 from Figma (3.5 * 4 = 14px)
            paddingRight: '14px',
          }}
        >
          <span
            className="font-semibold text-center whitespace-nowrap"
            style={{
              color: '#ffffff', // White text for gradient background visibility
              fontSize: '15px', // Exact from Figma: text-[15px]
              lineHeight: '20px', // Exact from Figma: leading-[0] -> leading-[20px]
              letterSpacing: '-0.3px', // Exact from Figma: tracking-[-0.3px]
              fontFamily: 'SB Sans Text, sans-serif', // Exact from Figma: font-['SB_Sans_Text:Semibold',_sans-serif]
            }}
          >
            Найти лучшее предложение
          </span>
        </button>
      </div>
    </div>
  );
}