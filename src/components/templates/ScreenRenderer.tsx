'use client';

import React from 'react';
import { useScreenManager } from './ScreenManagerContext';
import { ScreenType } from './types';
import { SearchSuggestionsPage } from '@/components/pages/SearchSuggestionsPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { debugLog } from '@/lib/logging';
import { tokens } from '@/lib/ui/tokens';
import type { AdviceItem } from '@/__mocks__/advice/types';

interface ScreenRendererProps {
  items?: AdviceItem[];
  className?: string;
}

export function ScreenRenderer({ items, className = '' }: ScreenRendererProps) {
  const { screenState, searchQuery, navigateTo } = useScreenManager();
  const { currentScreen } = screenState;

  const handleSelectSuggestion = (suggestion: string) => {
    debugLog('Suggestion selected:', suggestion);
    // Temporarily redirect to dashboard until search results are rebuilt
    navigateTo(ScreenType.DASHBOARD, suggestion);
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
        // Temporarily show placeholder until search results are rebuilt
        return (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-gray-600 text-base">Search results coming soon</p>
            <p className="mt-2 text-gray-400 text-sm">Rebuilding with clean architecture</p>
          </div>
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