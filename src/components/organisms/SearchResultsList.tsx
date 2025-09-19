'use client';

import React from 'react';
import { SearchResultCard, type SearchResultCardProps } from './SearchResultCard';
import { MastersNearbyCard } from './MastersNearbyCard';
import { AISearchHelper } from './AISearchHelper';
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
  // Get current search query, search context, actions, and chat from Zustand store
  const query = useStore((state) => state.search.query);
  const searchContext = useStore((state) => state.search.searchContext);
  const actions = useActions();
  const chat = useStore((state) => state.chat);
  
  // Check if we should show Masters Nearby card
  const shouldShowMastersCard = query.toLowerCase().trim() === 'маникюр';

  const handleMastersCardClick = () => {
    // Navigate to masters list page
    actions.showMastersList();
  };

  const handleAISearchHelperClick = () => {
    // Same behavior as Salute button - open chat and add search query as user message
    const currentQuery = query.trim();
    
    // Open chat overlay
    actions.openChat();
    
    // Add search query as first user message if it exists
    if (currentQuery) {
      chat.addMessage({
        text: currentQuery,
        sender: 'user',
      });
    }
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
      {/* Product search banner - blue banner with search context message */}
      {searchContext?.type === 'product_search' && searchContext.message && (
        <div role="listitem">
          <div
            style={{
              backgroundColor: '#E3F2FD', // Light blue background
              borderLeft: `4px solid ${tokens.colors.primary.DEFAULT}`, // Blue left border
              borderRadius: tokens.borders.radius.DEFAULT,
              padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`, // 12px top/bottom, 16px left/right
              marginBottom: tokens.spacing[2], // 8px margin bottom
            }}
          >
            <Text
              size="sm"
              style={{
                color: tokens.colors.primary.DEFAULT,
                fontWeight: '500',
                lineHeight: '1.4',
              }}
            >
              {searchContext.message}
            </Text>
          </div>
        </div>
      )}

      {/* AI Search Helper - show only for product/alias searches */}
      {query.trim() && searchContext?.type === 'product_search' && (
        <div role="listitem">
          <AISearchHelper
            searchQuery={query.trim()}
            onClick={handleAISearchHelperClick}
            className="mb-2"
          />
        </div>
      )}

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
                  onSeeAll={() => {}}
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