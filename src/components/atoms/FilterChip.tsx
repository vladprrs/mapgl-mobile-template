'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

/**
 * FilterChip Component
 * Individual filter button/chip for SearchFilters organism
 * 
 * Design specs from Figma node 263-221476:
 * - Height: 40px (py-2.5 = 10px top/bottom + 20px line height)
 * - Padding: px-[9px] py-2.5 (9px horizontal, 10px vertical)
 * - Border radius: rounded-lg (8px)
 * - Font: SB Sans Text Medium, 15px, line-height 20px
 * - Background: rgba(20,20,20,0.06) for inactive
 * - Text color: #141414
 * - Active state: primary color background with white text
 */
export function FilterChip({ 
  label, 
  active = false, 
  onClick,
  icon 
}: FilterChipProps) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer shrink-0 flex flex-row items-center justify-center rounded-lg"
      style={{
        backgroundColor: active 
          ? tokens.colors.primary.DEFAULT 
          : 'rgba(20, 20, 20, 0.06)',
        transition: tokens.transitions.duration.fast,
      }}
    >
      {/* Main button content */}
      <div 
        className="flex flex-row items-start justify-start relative"
        style={{
          paddingLeft: icon ? '14px' : '9px', // More padding if icon
          paddingRight: '9px',
          paddingTop: '10px',
          paddingBottom: '10px',
          gap: icon ? '5px' : '0px',
        }}
      >
        {/* Icon container if provided */}
        {icon && (
          <div className="flex flex-row items-center justify-center h-5 w-6 shrink-0">
            {icon}
          </div>
        )}
        
        {/* Label */}
        <div className="flex flex-row items-start justify-center">
          <span
            className="text-center whitespace-nowrap font-medium"
            style={{
              color: active ? tokens.colors.text.inverse : '#141414',
              fontSize: '15px',
              lineHeight: '20px',
              letterSpacing: '-0.3px',
              fontFamily: 'SB Sans Text, sans-serif',
            }}
          >
            {label}
          </span>
        </div>
      </div>

    </div>
  );
}