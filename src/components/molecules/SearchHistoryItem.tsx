'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';

interface SearchHistoryItemProps {
  searchText: string;
  subtitle?: string;
  showIcon?: boolean; // Only true for first item to show clock icon
  onClick?: () => void;
}

/**
 * SearchHistoryItem Component
 * Individual search history entry for search history section
 * 
 * Design specs from Figma node 286-221965:
 * - Structure: Icon + title + optional subtitle + bottom border
 * - Typography: 16px Regular for title, 14px Regular for subtitle
 * - Icon: 24px clock icon (green #1BA136) for first item, search icon (secondary color) for others
 * - Spacing: Same as SuggestRow for consistency
 * - Border: Bottom border rgba(137,137,137,0.3)
 */
export function SearchHistoryItem({ 
  searchText, 
  subtitle, 
  showIcon = false,
  onClick 
}: SearchHistoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full box-border flex flex-row items-start justify-start p-0 relative hover:bg-gray-50 active:bg-gray-100 transition-colors"
      aria-label={`Search for ${searchText}${subtitle ? `, ${subtitle}` : ''}`}
    >
      <div className="flex-1 box-border flex flex-row gap-3 items-start justify-start min-h-px pl-4 pr-0 py-0 relative">
        {/* Icon container */}
        <div className="box-border flex flex-row items-start justify-end pb-0 pt-[19px] px-0 relative shrink-0">
          <div className="shrink-0 size-6 flex items-center justify-center">
            {showIcon ? (
              <img
                src="/assets/figma/icons/d326366184afbf1644a0dd7640c14e22f09ebcbf.svg"
                alt="Recent search"
                className="w-6 h-6"
                style={{ color: '#1BA136' }}
              />
            ) : (
              <Icon name={ICONS.SEARCH} size={24} color={COLORS.TEXT_SECONDARY} />
            )}
          </div>
        </div>
        
        {/* Content row */}
        <div 
          className="flex-1 bg-transparent box-border flex flex-row gap-2 items-start justify-start min-h-px overflow-clip pb-3 pl-0 pr-4 pt-2.5 relative border-b" 
          style={{ borderColor: tokens.colors.border.DEFAULT }}
        >
          <div className="flex-1 box-border flex flex-col gap-0.5 items-start justify-start min-h-px p-0 relative">
            {/* Title */}
            <div className="box-border flex flex-row items-start justify-start p-0 relative w-full">
              <div className="flex-1 box-border flex flex-row gap-2 items-start justify-start min-h-px p-0 relative">
                <div 
                  className="flex-1 leading-[20px] min-h-px relative text-[16px] text-left tracking-[-0.24px] font-normal"
                  style={{ color: tokens.colors.text.primary }}
                >
                  {searchText}
                </div>
              </div>
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <div className="box-border flex flex-row items-start justify-start p-0 relative w-full">
                <div 
                  className="flex-1 box-border flex flex-row gap-2 items-start justify-start leading-[18px] min-h-px p-0 relative text-[14px] text-left tracking-[-0.28px] font-normal"
                  style={{ color: tokens.colors.text.secondary }}
                >
                  <div className="flex-1 min-h-px relative">
                    {subtitle}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}