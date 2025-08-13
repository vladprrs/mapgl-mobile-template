'use client';

import React from 'react';
import { useScreenManager } from './ScreenManagerContext';
import { ScreenType } from './types';
import { SearchSuggestionsPage } from '@/components/pages/SearchSuggestionsPage';
import { SearchResultsPage, type SearchResult } from '@/components/pages/SearchResultsPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { debugLog } from '@/lib/logging';
import type { AdviceItem } from '@/__mocks__/advice/types';

interface ScreenRendererProps {
  items?: AdviceItem[];
  className?: string;
}

export function ScreenRenderer({ items, className = '' }: ScreenRendererProps) {
  const { screenState, searchQuery, navigateTo, isTransitioning } = useScreenManager();
  const { currentScreen } = screenState;

  const handleSelectSuggestion = (suggestion: string) => {
    debugLog('Suggestion selected:', suggestion);
    navigateTo(ScreenType.SEARCH_RESULTS, suggestion);
  };

  const handleSelectResult = (result: SearchResult) => {
    debugLog('Result selected:', result);
    // Handle result selection (e.g., show on map, navigate to details)
    navigateTo(ScreenType.DASHBOARD);
  };

  const handleQuickAction = (actionId: string) => {
    debugLog('Quick action clicked:', actionId);
  };

  // Render screen content with transition wrapper
  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenType.DASHBOARD:
        return (
          <DashboardPage
            items={items}
            showSearchBar={false}
            showQuickAccess={false}
            withinSheet={true}
            className={className}
          />
        );
      
      case ScreenType.SEARCH_SUGGESTIONS:
        return (
          <SearchSuggestionsPage
            query={searchQuery || ''}
            onSelectSuggestion={handleSelectSuggestion}
            className={className}
          />
        );
      
      case ScreenType.SEARCH_RESULTS:
        return (
          <SearchResultsPage
            query={searchQuery || ''}
            onSelectResult={handleSelectResult}
            className=""
          />
        );
      
      default:
        return null;
    }
  };

  // Determine background color based on screen
  const getBackgroundColor = () => {
    return currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'transparent';
  };

  // For search results, apply background directly to content
  if (currentScreen === ScreenType.SEARCH_RESULTS) {
    return (
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}
        style={{ backgroundColor: '#F1F1F1' }}
      >
        {renderScreen()}
      </div>
    );
  }

  // For other screens, include Quick Access Panel if needed
  return (
    <>
      {/* Quick Access Panel - only show on dashboard */}
      {currentScreen === ScreenType.DASHBOARD && (
        <div className="bg-white pt-2 pb-4 relative z-10">
          <QuickAccessPanel onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Screen content with smooth transition */}
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}
      >
        {renderScreen()}
      </div>
    </>
  );
}

// Import QuickAccessPanel here to avoid circular dependency
import { QuickAccessPanel } from '@/components/organisms';