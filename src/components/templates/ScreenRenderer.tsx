'use client';

import React from 'react';
import useStore from '@/stores';
import { ScreenType } from './types';
import { SearchSuggestionsPage } from '@/components/pages/SearchSuggestionsPage';
import { SearchResultsPage } from '@/components/pages/SearchResultsPage';
import type { SearchResultItemProps } from '@/components/molecules/SearchResultItem';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { debugLog } from '@/lib/logging';
// tokens import removed - not used
import type { AdviceItem } from '@/__mocks__/advice/types';

interface ScreenRendererProps {
  items?: AdviceItem[];
  className?: string;
}

export function ScreenRenderer({ items, className = '' }: ScreenRendererProps) {
  const ui = useStore((state) => state.ui);
  const search = useStore((state) => state.search);
  const searchQuery = search.query;
  const currentScreen = ui.currentScreen;

  const handleSelectSuggestion = (suggestion: string) => {
    debugLog('Suggestion selected:', suggestion);
    search.setQuery(suggestion);
    ui.navigateTo(ScreenType.SEARCH_RESULTS);
  };

  const handleSelectResult = (result: SearchResultItemProps) => {
    debugLog('Result selected:', result);
    // Handle result selection (e.g., show on map, navigate to details)
    ui.navigateTo(ScreenType.DASHBOARD);
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
          />
        );
      
      default:
        return null;
    }
  };


  // For other screens, include Quick Access Panel if needed
  return (
    <>
      {/* Quick Access Panel - only show on dashboard */}
      {currentScreen === ScreenType.DASHBOARD && (
        <div className="bg-white pt-2 pb-4 relative z-10">
          <QuickAccessPanel onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Screen content */}
      <div className="flex-1">
        {renderScreen()}
      </div>
    </>
  );
}

// Import QuickAccessPanel here to avoid circular dependency
import { QuickAccessPanel } from '@/components/organisms';