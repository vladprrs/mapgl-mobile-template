'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BottomSheet, BottomSheetRef, SearchBar } from '@/components/organisms';
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
        // Set to 50% to show both results and map
        targetSnap = 50;
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
      default:
        return 'dashboard';
    }
  };

  // Determine header background based on screen - use solid color to prevent artifacts
  const getHeaderBackground = () => {
    return screenState.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white';
  };

  // Determine content background based on screen
  const getContentBackground = () => {
    return screenState.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white';
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
      stickyHeader={
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
      }
    >
      <ScreenRenderer items={items} />
    </BottomSheet>
  );
}

