'use client';

import React, { useState } from 'react';
import { SearchHistoryItem } from '@/components/molecules/SearchHistoryItem';
import useStore from '@/stores';
import { useActions } from '@/stores';
import { tokens } from '@/lib/ui/tokens';

interface HistoryItem {
  id: string;
  title: string;
  subtitle?: string;
  isDefault?: boolean; // Track if it's a default suggestion
}

// Default suggestions (always present) - persistent suggestions that appear below user history
const defaultSuggestions: HistoryItem[] = [
  { 
    id: 'def-1', 
    title: 'Маникюр', 
    subtitle: 'Услуги',
    isDefault: true
  },
  { 
    id: 'def-2', 
    title: 'Фитнес залы', 
    subtitle: 'Спорт и отдых',
    isDefault: true
  },
  { 
    id: 'def-3', 
    title: 'Ленина 11', 
    subtitle: 'Адрес',
    isDefault: true
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
 * - Combines user history + persistent default suggestions
 * - User history appears first, default suggestions below (never disappear)
 * - First visible item shows clock icon (green #1BA136), others show search icon  
 * - Shows max 3 items initially, rest behind "Смотреть еще" button
 * - Green "Смотреть еще" button expands/collapses full list
 * - Default suggestions: "Маникюр", "Фитнес залы", "Ленина 11"
 */
export function SearchHistorySection({ className = '', showHeader = true }: SearchHistorySectionProps) {
  const userHistory = useStore((state) => state.search.history);
  const actions = useActions();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHistoryClick = (query: string) => {
    // Use cross-slice action to perform search and navigate
    actions.performSearch(query);
  };

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Combine user history with default suggestions
  const hasUserHistory = userHistory.length > 0;
  
  // Convert user history to HistoryItem format
  const userHistoryItems: HistoryItem[] = userHistory.map((query, index) => ({
    id: `user-${index}`,
    title: query,
    subtitle: undefined,
    isDefault: false
  }));

  // Always combine user history + default suggestions (defaults never disappear)
  const allHistoryItems = [...userHistoryItems, ...defaultSuggestions];
  
  // First visible item gets clock icon (regardless if it's user history or default)
  const historyItemsWithIcon = allHistoryItems.map((item, index) => ({
    ...item,
    showIcon: index === 0 // Only first item gets clock icon
  }));

  // Show only first 3 items initially, all when expanded
  const visibleItems = isExpanded ? historyItemsWithIcon : historyItemsWithIcon.slice(0, 3);
  const hasMoreItems = historyItemsWithIcon.length > 3;

  // Section title based on whether user has history
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
          {visibleItems.map((item) => (
            <SearchHistoryItem
              key={item.id}
              searchText={item.title}
              subtitle={item.subtitle}
              showIcon={item.showIcon}
              onClick={() => handleHistoryClick(item.title)}
            />
          ))}
          
          {/* Show more button */}
          {hasMoreItems && (
            <button
              onClick={handleShowMore}
              className="w-full flex flex-row items-center justify-center py-3 px-4 transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: tokens.typography.fontWeight.medium,
                  color: '#1BA136',
                  lineHeight: '20px',
                }}
              >
                {isExpanded ? 'Скрыть' : 'Смотреть еще'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}