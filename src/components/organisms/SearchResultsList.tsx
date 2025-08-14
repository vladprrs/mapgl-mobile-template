'use client';

import React from 'react';
import { SearchResultCard, type SearchResultCardProps } from './SearchResultCard';
import { MastersNearbyCard } from './MastersNearbyCard';
import { Text } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
import { mockMastersNearby, mastersNearbyConfig } from '@/__mocks__/masters/nearby';
import useStore from '@/stores';

interface SearchResultsListProps {
  results: SearchResultCardProps[];
  onResultClick?: (result: SearchResultCardProps) => void;
  className?: string;
}

/**
 * SearchResultsList Organism
 * List container for SearchResultCard organisms using design tokens
 * Maintains proper spacing and scrolling within BottomSheet
 */
export function SearchResultsList({
  results,
  onResultClick,
  className = '',
}: SearchResultsListProps) {
  // Get current search query from Zustand store
  const query = useStore((state) => state.search.query);
  
  // Check if we should show Masters Nearby card
  const shouldShowMastersCard = query.toLowerCase().trim() === 'маникюр';

  const handleMastersCardClick = () => {
    console.log('Masters nearby card clicked');
    // TODO: Navigate to masters page or show masters details
  };

  // Empty state
  if (results.length === 0) {
    return (
      <div 
        className={`flex flex-col items-center justify-center ${className}`}
        style={{
          backgroundColor: tokens.colors.background.secondary,
          padding: `${tokens.spacing[12]} ${tokens.spacing[4]}`,
        }}
      >
        <Text size="lg" color="secondary" style={{ textAlign: 'center' }}>
          No results found
        </Text>
        <Text 
          size="sm" 
          color="tertiary" 
          style={{ 
            marginTop: tokens.spacing[2], 
            textAlign: 'center' 
          }}
        >
          Try adjusting your search terms
        </Text>
      </div>
    );
  }

  // Results list with SearchResultCard components
  return (
    <div 
      className={`search-results-list ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing[2], // 8px between cards
        padding: tokens.spacing[4], // 16px container padding
        backgroundColor: tokens.colors.background.secondary,
      }}
      role="list"
      aria-label="Search results"
    >
      {/* Masters Nearby Card - show first for "маникюр" query */}
      {shouldShowMastersCard && (
        <div role="listitem">
          <MastersNearbyCard
            masters={mockMastersNearby}
            extraMastersCount={mastersNearbyConfig.extraMastersCount}
            onClick={handleMastersCardClick}
            className="mb-2"
          />
        </div>
      )}

      {/* Regular search results */}
      {results.map((result) => (
        <div key={result.id} role="listitem">
          <SearchResultCard
            {...result}
            onClick={() => onResultClick?.(result)}
          />
        </div>
      ))}
    </div>
  );
}