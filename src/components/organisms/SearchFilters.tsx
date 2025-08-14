'use client';

import React from 'react';
import { FilterChip } from '@/components/atoms';
import { ICONS } from '@/lib/icons';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';
import { useActions } from '@/stores';

export interface Filter {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SearchFiltersProps {
  className?: string;
}

/**
 * SearchFilters Component
 * Horizontal scrollable filters bar for search results page
 * 
 * Design specs from Figma node 305-222643:
 * - Full width with horizontal scroll when needed
 * - 16px horizontal padding (px-4)
 * - 8px gap between filter chips (gap-2)
 * - 8px vertical padding (py-2)
 * - Gradient fade masks on scroll edges
 * - Background: rgba(236,234,234,0.65) systemThinMaterial
 * - Sticky positioning below search bar
 */
export function SearchFilters({ className = '' }: SearchFiltersProps) {
  const activeFilters = useStore((state) => state.search.activeFilters);
  const availableFilters = useStore((state) => state.search.availableFilters);
  const actions = useActions();

  const handleFilterClick = (filterId: string) => {
    actions.toggleFilter(filterId);
  };

  // Don't render if no filters available
  if (!availableFilters || availableFilters.length === 0) {
    return null;
  }

  return (
    <div 
      className={`relative w-full ${className}`}
      style={{
        backgroundColor: tokens.colors.background.secondary,
        paddingTop: tokens.spacing[2], // 8px
        paddingBottom: tokens.spacing[2], // 8px
      }}
    >
      {/* Fade mask overlay - shows gradient on scroll edges */}
      <div 
        className="absolute bottom-0 left-0 right-0 top-0 pointer-events-none z-10"
        style={{
          // Only show fade if content is scrollable
          opacity: availableFilters.length > 3 ? 1 : 0,
        }}
      >
        {/* Right gradient fade */}
        <div 
          className="absolute bottom-0 right-0 top-0 w-5"
          style={{
            background: `linear-gradient(to left, ${tokens.colors.background.secondary} 5.625%, rgba(241,241,241,0) 100%)`,
          }}
        />
        
        {/* Solid center (invisible, for structure) */}
        <div className="absolute bottom-0 left-5 right-5 top-0 opacity-0" />
        
        {/* Left gradient fade */}
        <div 
          className="absolute bottom-0 left-0 top-0 w-5"
          style={{
            background: `linear-gradient(to right, ${tokens.colors.background.secondary} 5.625%, rgba(241,241,241,0) 100%)`,
          }}
        />
      </div>

      {/* Filters container with proper height matching Figma */}
      <div 
        className="relative w-full"
        style={{ height: '40px' }} // 40px height from Figma
      >
        {/* Scrollable filters container */}
        <div 
          className="absolute flex flex-row items-center justify-start top-1/2 -translate-y-1/2 overflow-x-auto"
          style={{
            left: tokens.spacing[4], // 16px
            right: tokens.spacing[4], // 16px 
            gap: tokens.spacing[2], // 8px
            scrollBehavior: 'smooth',
            // Hide scrollbar while maintaining scroll functionality
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Hide webkit scrollbar */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {availableFilters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              active={activeFilters.includes(filter.id)}
              onClick={() => handleFilterClick(filter.id)}
              icon={filter.icon}
            />
          ))}
          
          {/* Right padding for scroll - ensures last filter has proper spacing */}
          <div className="shrink-0 w-0" />
        </div>
      </div>
    </div>
  );
}