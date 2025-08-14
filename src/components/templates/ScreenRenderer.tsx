'use client';

import React from 'react';
import useStore from '@/stores';
import { ScreenType } from './types';
import { SearchSuggestionsPage } from '@/components/pages/SearchSuggestionsPage';
import { SearchResultsPage } from '@/components/pages/SearchResultsPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { OrganizationPage } from '@/components/pages/OrganizationPage';
import { AddressPage } from '@/components/pages/AddressPage';
import { MasterDetailsPage } from '@/components/pages/MasterDetailsPage';
import { MastersListPage } from '@/components/pages/MastersListPage';
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
  const currentScreen = ui.currentScreen;

  const handleSelectSuggestion = (suggestion: string) => {
    debugLog('Suggestion selected:', suggestion);
    search.setQuery(suggestion);
    ui.navigateTo(ScreenType.SEARCH_RESULTS);
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
            onSelectSuggestion={handleSelectSuggestion}
            className={className}
          />
        );
      
      case ScreenType.SEARCH_RESULTS:
        return (
          <SearchResultsPage />
        );
      
      case ScreenType.ORGANIZATION_DETAILS:
        return (
          <OrganizationPage />
        );
      
      case ScreenType.ADDRESS_DETAILS:
        return (
          <AddressPage />
        );
      
      case ScreenType.MASTER_DETAILS:
        return (
          <MasterDetailsPage />
        );
      
      case ScreenType.MASTERS_LIST:
        return (
          <MastersListPage />
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