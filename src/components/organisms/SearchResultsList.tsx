'use client';

import React from 'react';
import { SearchResultCard, type SearchResultCardProps } from './SearchResultCard';
import { MastersNearbyCard } from './MastersNearbyCard';
import { ProductsCarousel } from './ProductsCarousel';
import { Text } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
import { mockMastersNearby, mastersNearbyConfig } from '@/__mocks__/masters/nearby';
import useStore from '@/stores';
import { useActions } from '@/stores';

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
  // Get current search query from Zustand store and actions
  const query = useStore((state) => state.search.query);
  const actions = useActions();
  
  // Check if we should show Masters Nearby card
  const shouldShowMastersCard = query.toLowerCase().trim() === 'маникюр';

  const handleMastersCardClick = () => {
    // Navigate to masters list page
    actions.showMastersList();
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
      {results.map((result, index) => {
        // Insert ProductsCarousel after 3rd result (index 3)
        if (index === 3) {
          return (
            <React.Fragment key={`result-with-carousel-${result.id}`}>
              <div role="listitem">
                <SearchResultCard
                  {...result}
                  onClick={() => onResultClick?.(result)}
                />
              </div>
              <div role="listitem">
                <ProductsCarousel 
                  title="Товары"
                  subtitle="Пригодятся для занятий спортом"
                  products={[]} // Use default mock products
                  onSeeAll={() => console.log('See all products')}
                />
              </div>
            </React.Fragment>
          );
        }
        return (
          <div key={result.id} role="listitem">
            <SearchResultCard
              {...result}
              onClick={() => onResultClick?.(result)}
            />
          </div>
        );
      })}
    </div>
  );
}