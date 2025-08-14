'use client';

import React from 'react';
import { SearchHistoryItem } from '@/components/molecules/SearchHistoryItem';
import useStore from '@/stores';
import { useActions } from '@/stores';
import { tokens } from '@/lib/ui/tokens';

interface DefaultSearchItem {
  id: string;
  query: string;
  timestamp: number;
  type: 'service' | 'address' | 'nearby';
}

// Default search history items for new users
const defaultSearchHistory: DefaultSearchItem[] = [
  {
    id: 'default-1',
    query: 'Маникюр',
    timestamp: Date.now() - 86400000, // 1 day ago
    type: 'service'
  },
  {
    id: 'default-2',
    query: 'Фитнес',
    timestamp: Date.now() - 172800000, // 2 days ago
    type: 'service'
  },
  {
    id: 'default-3',
    query: 'Москва Ленина 11',
    timestamp: Date.now() - 259200000, // 3 days ago
    type: 'address'
  },
  {
    id: 'default-4',
    query: 'Кафе рядом',
    timestamp: Date.now() - 345600000, // 4 days ago
    type: 'nearby'
  },
  {
    id: 'default-5',
    query: 'Аптека 24 часа',
    timestamp: Date.now() - 432000000, // 5 days ago
    type: 'service'
  }
];

interface SearchHistorySectionProps {
  className?: string;
  showHeader?: boolean;
}

/**
 * SearchHistorySection Component
 * Complete search history section for empty search state
 * 
 * Design specs from Figma node 286-221965:
 * - Section header "История твоих запросов" or "Попробуй найти"
 * - List of recent search history items or default suggestions
 * - Shows default items for new users, real history for returning users
 * - White background container with rounded corners
 * - Proper spacing between recommendations and history sections
 */
export function SearchHistorySection({ className = '', showHeader = true }: SearchHistorySectionProps) {
  const userHistory = useStore((state) => state.search.history);
  const actions = useActions();

  const handleHistoryClick = (query: string) => {
    // Use cross-slice action to perform search and navigate
    actions.performSearch(query);
  };

  // Determine what to show based on user history
  const hasUserHistory = userHistory.length > 0;

  // Always render section (either with real history or default items)
  const sectionTitle = hasUserHistory ? 'История твоих запросов' : 'Попробуй найти';

  return (
    <div className={`flex flex-col items-start justify-start px-4 py-0 relative w-full ${className}`}>
      {/* Section header - only show when requested */}
      {showHeader && (
        <div 
          className="flex flex-row items-start justify-start p-4 relative w-full"
          style={{
            paddingBottom: tokens.spacing[2], // 8px
          }}
        >
          <h2 
            className="text-left font-medium"
            style={{
              fontSize: tokens.typography.fontSize.lg, // 18px
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.colors.text.primary,
              lineHeight: '22px',
              letterSpacing: '-0.27px',
            }}
          >
            {sectionTitle}
          </h2>
        </div>
      )}

      {/* White rounded container - matches Figma exactly */}
      <div 
        className="bg-white flex flex-col items-start justify-start overflow-clip p-0 relative rounded-xl w-full"
      >
        {/* History items container */}
        <div className="flex flex-col items-start justify-start overflow-clip relative w-full">
          {hasUserHistory 
            ? userHistory.slice(0, 8).map((query, index) => (
                <SearchHistoryItem
                  key={`user-${query}-${index}`}
                  searchText={query}
                  onClick={() => handleHistoryClick(query)}
                />
              ))
            : defaultSearchHistory.map((item) => (
                <SearchHistoryItem
                  key={item.id}
                  searchText={item.query}
                  onClick={() => handleHistoryClick(item.query)}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
}