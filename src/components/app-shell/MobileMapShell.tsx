'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BottomSheet } from '@/components/bottom-sheet';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { ScreenManagerProvider, ScreenRenderer, useScreenManager, ScreenType } from '@/components/screen-manager';
import { debugLog } from '@/lib/logging';
import { useMapGL } from '@/hooks/useMapGL';
import type { AdviceItem } from '@/components/dashboard/advice/types';

interface MobileMapShellProps {
  className?: string;
  snapPoints?: [number, number, number];
  initialSnap?: number;
  onSnapChange?: (snap: number) => void;
  items?: AdviceItem[];
}

// Inner component that uses the ScreenManager context
function MobileMapShellContent({
  className = '',
  snapPoints = [10, 50, 90],
  initialSnap,
  onSnapChange,
  items,
}: MobileMapShellProps) {
  const { screenState, navigateTo } = useScreenManager();
  const { adjustCenterForBottomSheet, map } = useMapGL();
  const [searchQuery, setSearchQuery] = useState(screenState.searchQuery || '');
  const [searchFocused, setSearchFocused] = useState(false);
  const previousSnapRef = useRef<number>(initialSnap ?? snapPoints[1]);
  const pendingAdjustmentRef = useRef<{ old: number; new: number } | null>(null);
  
  // Sync local search query with screen manager state
  useEffect(() => {
    if (screenState.searchQuery !== undefined) {
      setSearchQuery(screenState.searchQuery);
    }
  }, [screenState.searchQuery]);
  
  // Execute pending adjustments when map becomes available
  useEffect(() => {
    if (map && pendingAdjustmentRef.current) {
      adjustCenterForBottomSheet(pendingAdjustmentRef.current.old, pendingAdjustmentRef.current.new);
      pendingAdjustmentRef.current = null;
    }
  }, [map, adjustCenterForBottomSheet]);

  const handleSearch = useCallback((query: string) => {
    debugLog('Search query:', query);
    setSearchQuery(query);
    if (query.trim()) {
      navigateTo(ScreenType.SEARCH_RESULTS, query);
    }
  }, [navigateTo]);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
    navigateTo(ScreenType.SEARCH_SUGGESTIONS, searchQuery);
  }, [navigateTo, searchQuery]);

  const handleSearchBlur = useCallback(() => {
    setSearchFocused(false);
    // Don't navigate away immediately to allow clicking on suggestions
    setTimeout(() => {
      if (!searchFocused && screenState.currentScreen === ScreenType.SEARCH_SUGGESTIONS && !searchQuery) {
        navigateTo(ScreenType.DASHBOARD);
      }
    }, 200);
  }, [navigateTo, screenState.currentScreen, searchQuery, searchFocused]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (screenState.currentScreen === ScreenType.SEARCH_SUGGESTIONS) {
      // Update suggestions as user types
      navigateTo(ScreenType.SEARCH_SUGGESTIONS, value);
    }
  }, [navigateTo, screenState.currentScreen]);

  const handleMenuClick = useCallback(() => {
    debugLog('Menu clicked');
    // Could open a menu screen in the future
  }, []);

  const handleVoiceClick = useCallback(() => {
    debugLog('Voice assistant clicked');
    // Could trigger voice search
  }, []);

  const handleClearSearch = useCallback(() => {
    debugLog('Clear search clicked');
    setSearchQuery('');
    navigateTo(ScreenType.DASHBOARD);
  }, [navigateTo]);

  const handleSnapChange = useCallback((snap: number) => {
    // Adjust map center to keep the same point visible
    if (previousSnapRef.current !== snap) {
      if (map) {
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
  }, [adjustCenterForBottomSheet, onSnapChange, map]);

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

  // Determine header background based on screen
  const getHeaderBackground = () => {
    return screenState.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white';
  };

  return (
    <BottomSheet
      className={className}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      onSnapChange={handleSnapChange}
      headerBackground={getHeaderBackground()}
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
          noTopRadius
          variant={getSearchBarVariant()}
        />
      }
    >
      <ScreenRenderer items={items} />
    </BottomSheet>
  );
}

// Main component that provides the ScreenManager context
export function MobileMapShell(props: MobileMapShellProps) {
  return (
    <ScreenManagerProvider initialScreen={ScreenType.DASHBOARD}>
      <MobileMapShellContent {...props} />
    </ScreenManagerProvider>
  );
}