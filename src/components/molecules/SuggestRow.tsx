'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/icons';
import { tokens } from '@/lib/ui/tokens';

// Icons extracted from Figma - unused for now, using Icon component instead
// const SUGGEST_ICONS = {
//   HOME: '/assets/suggest-row/ced74e330ddca8cf8d1b420c665acef342483b60.svg',
//   WORK: '/assets/suggest-row/7cef2d29c06091060ec9aba55a777bbf0fa58460.svg',
//   SEARCH: '/assets/suggest-row/78b4aac2c15552b8c0acc3c49dc2805e66dfdcad.svg',
//   CATEGORY: '/assets/suggest-row/6ebb6bc0605860f895735e08ef4c1b31129c1518.svg',
// } as const;

export enum SuggestType {
  SAVED_ADDRESS = 'saved_address',
  ORGANIZATION = 'organization',
  CATEGORY = 'category',
}

export interface SuggestRowProps {
  type: SuggestType;
  title: string;
  subtitle?: string;
  distance?: string;
  branchCount?: string;
  highlightedText?: string;
  icon?: 'home' | 'work' | 'search' | 'category';
  onClick?: () => void;
}

export function SuggestRow({
  type,
  title,
  subtitle,
  distance,
  branchCount,
  highlightedText,
  icon,
  onClick,
}: SuggestRowProps) {
  // Render highlighted text with bold part
  const renderHighlightedTitle = () => {
    if (!highlightedText) return title;
    
    const index = title.toLowerCase().indexOf(highlightedText.toLowerCase());
    if (index === -1) return title;
    
    const before = title.slice(0, index);
    const highlighted = title.slice(index, index + highlightedText.length);
    const after = title.slice(index + highlightedText.length);
    
    return (
      <>
        {before && <span className="font-medium" style={{ color: tokens.colors.text.primary }}>{before}</span>}
        {highlighted && <span className="font-medium" style={{ color: tokens.colors.text.primary }}>{highlighted}</span>}
        {after && <span className="font-normal" style={{ color: tokens.colors.text.secondary }}>{after}</span>}
      </>
    );
  };

  // Render icon based on type and icon prop
  const renderIcon = () => {
    if (type === SuggestType.SAVED_ADDRESS && icon === 'home') {
      return (
        <Icon name={ICONS.HOME} size={24} color={COLORS.TEXT_PRIMARY} />
      );
    }
    if (type === SuggestType.SAVED_ADDRESS && icon === 'work') {
      return (
        <Icon name={ICONS.WORK} size={24} color={COLORS.TEXT_PRIMARY} />
      );
    }
    if (type === SuggestType.ORGANIZATION || type === SuggestType.CATEGORY) {
      return (
        <Icon name={ICONS.SEARCH} size={24} color={COLORS.TEXT_SECONDARY} />
      );
    }
    return null;
  };

  return (
    <button
      onClick={onClick}
      className="w-full box-border flex flex-row items-start justify-start p-0 relative hover:bg-gray-50 active:bg-gray-100 transition-colors"
      aria-label={`${title}${subtitle ? `, ${subtitle}` : ''}`}
    >
      <div className="flex-1 box-border flex flex-row gap-3 items-start justify-start min-h-px pl-4 pr-0 py-0 relative">
        {/* Icon container */}
        <div className="box-border flex flex-row items-start justify-end pb-0 pt-[19px] px-0 relative shrink-0">
          <div className="shrink-0 size-6 flex items-center justify-center">
            {renderIcon()}
          </div>
        </div>
        
        {/* Content row */}
        <div className="flex-1 bg-transparent box-border flex flex-row gap-2 items-start justify-start min-h-px overflow-clip pb-3 pl-0 pr-4 pt-2.5 relative border-b" style={{ borderColor: tokens.colors.border.DEFAULT }}>
          <div className="flex-1 box-border flex flex-col gap-0.5 items-start justify-start min-h-px p-0 relative">
            {/* Title */}
            <div className="box-border flex flex-row items-start justify-start p-0 relative w-full">
              <div className="flex-1 box-border flex flex-row gap-2 items-start justify-start min-h-px p-0 relative">
                <div className="flex-1 leading-[20px] min-h-px relative text-[16px] text-left tracking-[-0.24px]">
                  {type === SuggestType.SAVED_ADDRESS && (
                    <span className="font-medium" style={{ color: tokens.colors.text.primary }}>{title}</span>
                  )}
                  {type === SuggestType.ORGANIZATION && renderHighlightedTitle()}
                  {type === SuggestType.CATEGORY && (
                    <span className="font-normal" style={{ color: tokens.colors.text.secondary }}>{title}</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Subtitle */}
            {(subtitle || distance || branchCount) && (
              <div className="box-border flex flex-row items-start justify-start p-0 relative w-full">
                <div className="flex-1 box-border flex flex-row gap-2 items-start justify-start leading-[18px] min-h-px p-0 relative text-[14px] text-left tracking-[-0.28px]" style={{ color: tokens.colors.text.secondary }}>
                  {type === SuggestType.SAVED_ADDRESS && (
                    <>
                      <div className="flex-1 min-h-px relative">
                        <span className="font-normal">{subtitle}</span>
                      </div>
                      {distance && (
                        <div className="relative shrink-0 text-nowrap">
                          <span className="font-normal whitespace-pre">{distance}</span>
                        </div>
                      )}
                    </>
                  )}
                  {type === SuggestType.ORGANIZATION && subtitle && (
                    <div className="flex-1 min-h-px relative">
                      <span className="font-normal">{subtitle}</span>
                    </div>
                  )}
                  {type === SuggestType.CATEGORY && (
                    <>
                      {branchCount && (
                        <div className="relative shrink-0 text-nowrap">
                          <span className="font-normal whitespace-pre">{branchCount}</span>
                        </div>
                      )}
                      {highlightedText && (
                        <div className="flex-1 min-h-px relative">
                          {renderHighlightedTitle()}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}