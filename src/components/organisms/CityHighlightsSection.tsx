'use client';

import React from 'react';
import { Cover } from '@/components/molecules/Cover';
import { useActions } from '@/stores';
import { tokens } from '@/lib/ui/tokens';

interface CityHighlight {
  id: string;
  title: string;
  subtitle: string;
  images: string[];
  type: 'collection' | 'place' | 'event';
}

// Mock data matching the Figma design
const cityHighlights: CityHighlight[] = [
  {
    id: '3',
    title: 'Рестораны с летними верандами', 
    subtitle: 'Сезонное меню',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'],
    type: 'collection',
  },
  {
    id: '4',
    title: 'Новые кофейни центра',
    subtitle: '8 заведений',
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop'],
    type: 'collection',
  },
];

interface CityHighlightsSectionProps {
  className?: string;
}

/**
 * CityHighlightsSection Component
 * Featured city content section for empty search state
 * 
 * Design specs from Figma node 286-222026:
 * - Section header "Интересное в городе" (19px Semibold)
 * - Horizontal scrollable list of Cover cards
 * - Cards: 232px wide × 142px height with gradient overlays
 * - Spacing: 24px from previous section, 16px horizontal padding
 * - Background: Inherits from parent (white)
 */
export function CityHighlightsSection({ className = '' }: CityHighlightsSectionProps) {
  const actions = useActions();

  const handleHighlightClick = (highlight: CityHighlight) => {
    // For collections: trigger search with title
    // For places: could navigate to location (future enhancement)
    switch (highlight.type) {
      case 'collection':
        actions.performSearch(highlight.title);
        break;
      case 'place':
        // Future: actions.selectLocation(highlight.coordinates);
        actions.performSearch(highlight.title);
        break;
      case 'event':
        actions.performSearch(highlight.title);
        break;
    }
  };

  return (
    <div 
      className={`flex flex-col items-start justify-start relative w-full ${className}`}
    >
      {/* Section header */}
      <div 
        className="flex flex-col gap-2.5 items-start justify-start pb-0 pl-5 pr-4 pt-4 relative w-full"
      >
        <div className="flex flex-row gap-2 items-start justify-center pb-3 pt-0 px-0 relative w-full">
          <div className="flex-1 flex flex-row items-start justify-start min-h-px p-0 relative">
            <div className="flex-1 flex flex-row items-start justify-start min-h-px pb-px pt-[7px] px-0 relative">
              <h2 
                className="flex-1 text-left font-semibold"
                style={{
                  fontSize: '19px',
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.colors.text.primary,
                  lineHeight: '24px',
                  letterSpacing: '-0.38px',
                }}
              >
                Интересное в городе
              </h2>
            </div>
          </div>
          {/* Arrow icon placeholder - could add navigation later */}
          <div className="flex flex-row h-[0.001px] items-start justify-start pb-0 pt-2 px-0 relative shrink-0">
            <div className="shrink-0 size-6" />
          </div>
        </div>
      </div>

      {/* Horizontal scroll container for highlights */}
      <div 
        className="flex flex-row gap-2 items-start justify-start px-4 py-0 relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        style={{
          scrollBehavior: 'auto',
        }}
      >
        {cityHighlights.map((highlight) => (
          <div
            key={highlight.id}
            className="shrink-0"
            style={{ width: '232px', height: '142px' }}
          >
            <Cover
              title={highlight.title}
              subtitle={highlight.subtitle}
              images={highlight.images}
              variant="default"
              onClick={() => handleHighlightClick(highlight)}
              className="w-full !h-[142px]"
            />
          </div>
        ))}
        
        {/* Right padding for scroll */}
        <div className="shrink-0 w-0" />
      </div>
    </div>
  );
}