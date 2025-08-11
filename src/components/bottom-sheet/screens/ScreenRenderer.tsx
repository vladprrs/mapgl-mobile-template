'use client';

import React from 'react';
import { useScreenManager } from './ScreenManagerContext';
import { ScreenType } from './types';
import { SearchSuggestions } from './SearchSuggestions';
import { SearchResults, type SearchResult } from './SearchResults';
import { Dashboard } from '@/components/dashboard';
import { debugLog } from '@/lib/logging';
import type { AdviceItem } from '@/components/dashboard/advice/types';

interface ScreenRendererProps {
  items?: AdviceItem[];
  className?: string;
}

export function ScreenRenderer({ items, className = '' }: ScreenRendererProps) {
  const { screenState, navigateTo, isTransitioning } = useScreenManager();
  const { currentScreen, searchQuery } = screenState;

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
          <Dashboard
            items={items}
            showSearchBar={false}
            showQuickAccess={false}
            withinSheet={true}
            className={className}
          />
        );
      
      case ScreenType.SEARCH_SUGGESTIONS:
        return (
          <SearchSuggestions
            query={searchQuery || ''}
            onSelectSuggestion={handleSelectSuggestion}
            className={className}
          />
        );
      
      case ScreenType.SEARCH_RESULTS:
        return (
          <SearchResults
            query={searchQuery || ''}
            onSelectResult={handleSelectResult}
            className={className}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quick Access Panel - only show on dashboard with fade transition */}
      <div 
        className={`bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          currentScreen === ScreenType.DASHBOARD 
            ? 'pt-2 pb-4 opacity-100 max-h-20' 
            : 'opacity-0 max-h-0'
        }`}
      >
        <QuickAccessPanel onActionClick={handleQuickAction} />
      </div>

      {/* Screen content with smooth transition */}
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}
      >
        {renderScreen()}
      </div>
    </div>
  );
}

// Import QuickAccessPanel here to avoid circular dependency
import { QuickAccessPanel } from '@/components/dashboard/QuickAccessPanel';