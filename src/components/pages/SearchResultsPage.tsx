'use client';

import React from 'react';
import { SearchResultsList } from '@/components/organisms/SearchResultsList';
import type { SearchResultCardProps } from '@/components/organisms/SearchResultCard';
import { Text } from '@/components/atoms';
import useStore from '@/stores';
import { useActions } from '@/stores';
import { debugLog } from '@/lib/logging';
import { categoryDisplayNames } from '@/__mocks__/search/productAliases';

interface SearchResultsPageProps {
  className?: string;
}

/**
 * SearchResultsPage Component
 * Connected to Zustand store for real search results
 * Uses SearchResultCard organism through SearchResultsList
 */
export function SearchResultsPage({
  className = '',
}: SearchResultsPageProps) {
  // Connect to Zustand store with atomic selectors
  const searchResults = useStore((state) => state.search.filteredResults);
  const isSearching = useStore((state) => state.search.isSearching);
  const searchContext = useStore((state) => state.search.searchContext);
  const actions = useActions();

  const handleResultClick = (result: SearchResultCardProps) => {
    debugLog('Search result selected:', result);
    // Use cross-slice action to handle organization selection
    actions.selectOrganization(result);
  };

  // Show loading state
  if (isSearching) {
    return (
      <div className={`search-results-page min-h-full bg-background-secondary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`search-results-page min-h-full bg-background-secondary ${className}`}>
      {/* Search Context Banner for Product Searches */}
      {searchContext?.type === 'product_search' && (
        <div className="bg-blue-50 p-3 mx-4 mb-2 rounded-lg border border-blue-200">
          <Text className="text-sm text-blue-700 font-medium">
            {searchContext.message}
          </Text>
          {searchContext.categories && searchContext.categories.length > 0 && (
            <Text className="text-xs text-blue-600 mt-1">
              Категории: {searchContext.categories.map(cat => categoryDisplayNames[cat] || cat).join(', ')}
            </Text>
          )}
        </div>
      )}
      
      <SearchResultsList
        results={searchResults}
        onResultClick={handleResultClick}
      />
    </div>
  );
}