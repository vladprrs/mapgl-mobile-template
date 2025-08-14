'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BottomSheet, BottomSheetRef, SearchBar, SearchFilters } from '@/components/organisms';
import { ScreenRenderer } from '@/components/templates';
import { ScreenType } from '@/components/templates/types';
import { debugLog } from '@/lib/logging';
// tokens import removed - not used
import type { AdviceItem } from '@/__mocks__/advice/types';
import useStore from '@/stores';
import { useActions } from '@/stores';

interface MobileMapShellProps {
  className?: string;
  snapPoints?: [number, number, number];
  initialSnap?: number;
  onSnapChange?: (snap: number) => void;
  items?: AdviceItem[];
}

export function MobileMapShell({
  className = '',
  snapPoints = [10, 50, 90],
  initialSnap,
  onSnapChange,
  items,
}: MobileMapShellProps) {
  // Get state and actions directly from Zustand store
  const search = useStore((state) => state.search);
  const ui = useStore((state) => state.ui);
  const map = useStore((state) => state.map);
  const actions = useActions();
  
  // Create screen state object for compatibility
  const screenState = {
    currentScreen: ui.currentScreen,
    previousScreen: ui.previousScreen,
    history: ui.screenHistory,
  };
  
  const searchQuery = search.query;
  const adjustCenterForBottomSheet = map.adjustCenterForBottomSheet;
  
  // Action handlers
  const handleSearch = actions.performSearch;
  const handleSearchFocus = actions.focusSearchBar;
  const handleSearchBlur = actions.blurSearchBar;
  const handleSearchChange = search.setQuery;
  const handleClearSearch = () => {
    search.clearSearch();
    ui.navigateTo(ScreenType.DASHBOARD);
  };
  const [currentSnap, setCurrentSnap] = useState<number>(initialSnap ?? snapPoints[1]);
  const previousSnapRef = useRef<number>(initialSnap ?? snapPoints[1]);
  const pendingAdjustmentRef = useRef<{ old: number; new: number } | null>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const previousScreenRef = useRef<ScreenType>(screenState.currentScreen);
  const isAutoSnappingRef = useRef<boolean>(false);
  
  // Automatically adjust snap point ONLY when screen changes
  useEffect(() => {
    // Only trigger automatic snap if the screen actually changed
    if (previousScreenRef.current === screenState.currentScreen) {
      return;
    }
    
    previousScreenRef.current = screenState.currentScreen;
    
    let targetSnap: number;
    
    switch (screenState.currentScreen) {
      case ScreenType.SEARCH_SUGGESTIONS:
        // Expand to 90% for better visibility of suggestions
        targetSnap = 90;
        break;
      case ScreenType.SEARCH_RESULTS:
        // Expand to 90% for better visibility of search results
        targetSnap = 90;
        break;
      case ScreenType.ORGANIZATION_DETAILS:
        // Expand to 90% for organization details page
        targetSnap = 90;
        break;
      case ScreenType.ADDRESS_DETAILS:
        // Expand to 90% for address details page (same as organization)
        targetSnap = 90;
        break;
      case ScreenType.MASTER_DETAILS:
        // Expand to 90% for master details page
        targetSnap = 90;
        break;
      case ScreenType.MASTERS_LIST:
        // Expand to 90% for masters list page
        targetSnap = 90;
        break;
      case ScreenType.DASHBOARD:
      default:
        // Keep at 50% for dashboard (or use current position)
        targetSnap = 50;
        break;
    }
    
    // Only snap if the target is different from current position
    if (targetSnap !== currentSnap && bottomSheetRef.current) {
      debugLog(`Auto-adjusting snap point to ${targetSnap}% for ${screenState.currentScreen}`);
      isAutoSnappingRef.current = true;
      bottomSheetRef.current.snapTo(targetSnap);
      // Don't update currentSnap here - let handleSnapChange do it
    }
  }, [screenState.currentScreen, currentSnap]); // Include currentSnap but only use it for comparison
  
  // Execute pending adjustments when map becomes available
  useEffect(() => {
    if (map.instance && pendingAdjustmentRef.current) {
      adjustCenterForBottomSheet(pendingAdjustmentRef.current.old, pendingAdjustmentRef.current.new);
      pendingAdjustmentRef.current = null;
    }
  }, [map.instance, adjustCenterForBottomSheet]);

  const handleMenuClick = useCallback(() => {
    debugLog('Menu clicked');
    // Could open a menu screen in the future
  }, []);

  const handleVoiceClick = useCallback(() => {
    debugLog('Voice assistant clicked');
    // Could trigger voice search
  }, []);

  const handleSnapChange = useCallback((snap: number) => {
    // Update current snap state
    setCurrentSnap(snap);
    
    // Check if this was an automatic snap (triggered by screen change)
    if (isAutoSnappingRef.current) {
      isAutoSnappingRef.current = false;
      // For automatic snaps, we still want to adjust the map center
    }
    
    // Adjust map center to keep the same point visible
    if (previousSnapRef.current !== snap) {
      if (map.instance) {
        adjustCenterForBottomSheet(previousSnapRef.current, snap);
      } else {
        // Queue adjustment for when map becomes available
        pendingAdjustmentRef.current = { old: previousSnapRef.current, new: snap };
      }
      previousSnapRef.current = snap;
    }
    
    // Call the original onSnapChange if provided
    if (onSnapChange) {
      onSnapChange(snap);
    }
  }, [adjustCenterForBottomSheet, onSnapChange, map.instance]);

  // Determine the search bar variant based on current screen
  const getSearchBarVariant = () => {
    switch (screenState.currentScreen) {
      case ScreenType.SEARCH_RESULTS:
        return 'results';
      case ScreenType.SEARCH_SUGGESTIONS:
        return 'suggest';
      case ScreenType.ORGANIZATION_DETAILS:
      case ScreenType.ADDRESS_DETAILS:
      case ScreenType.MASTER_DETAILS:
      case ScreenType.MASTERS_LIST:
        return 'results'; // Hide search bar for organization/address/master details and masters list
      default:
        return 'dashboard';
    }
  };

  // Determine header background based on screen - use solid color to prevent artifacts
  const getHeaderBackground = () => {
    return (screenState.currentScreen === ScreenType.SEARCH_RESULTS || 
            screenState.currentScreen === ScreenType.ORGANIZATION_DETAILS ||
            screenState.currentScreen === ScreenType.ADDRESS_DETAILS ||
            screenState.currentScreen === ScreenType.MASTER_DETAILS ||
            screenState.currentScreen === ScreenType.MASTERS_LIST) ? '#F1F1F1' : 'white';
  };

  // Determine content background based on screen
  const getContentBackground = () => {
    return (screenState.currentScreen === ScreenType.SEARCH_RESULTS || 
            screenState.currentScreen === ScreenType.ORGANIZATION_DETAILS ||
            screenState.currentScreen === ScreenType.ADDRESS_DETAILS ||
            screenState.currentScreen === ScreenType.MASTER_DETAILS ||
            screenState.currentScreen === ScreenType.MASTERS_LIST) ? '#F1F1F1' : 'white';
  };

  // Determine header content based on screen
  const getHeaderContent = () => {
    // No header for ORGANIZATION_DETAILS or ADDRESS_DETAILS - pages handle their own headers
    return null;
  };

  // Determine sticky header content based on screen
  const getStickyHeaderContent = () => {
    if (screenState.currentScreen === ScreenType.ORGANIZATION_DETAILS || 
        screenState.currentScreen === ScreenType.ADDRESS_DETAILS ||
        screenState.currentScreen === ScreenType.MASTER_DETAILS ||
        screenState.currentScreen === ScreenType.MASTERS_LIST) {
      return null;
    }
    return (
      <div className="sticky-header-content">
        <SearchBar
          onSearch={handleSearch}
          onMenuClick={handleMenuClick}
          onVoiceClick={handleVoiceClick}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          value={searchQuery}
          variant={getSearchBarVariant()}
        />
        {screenState.currentScreen === ScreenType.SEARCH_RESULTS && (
          <SearchFilters />
        )}
      </div>
    );
  };

  // Use BottomSheet wrapper for all screens for consistency
  return (
    <BottomSheet
      ref={bottomSheetRef}
      className={className}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      onSnapChange={handleSnapChange}
      headerBackground={getHeaderBackground()}
      contentBackground={getContentBackground()}
      header={getHeaderContent()}
      stickyHeader={getStickyHeaderContent()}
    >
      <ScreenRenderer items={items} />
    </BottomSheet>
  );
}

