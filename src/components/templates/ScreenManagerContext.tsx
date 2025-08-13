'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ScreenType, ScreenState } from './types';
import { debugLog } from '@/lib/logging';

interface ScreenManagerContextValue {
  screenState: ScreenState;
  searchQuery: string;
  searchFocused: boolean;
  
  // Core navigation methods
  navigateTo: (screen: ScreenType, searchQuery?: string) => void;
  navigateBack: () => void;
  clearHistory: () => void;
  
  // Search-specific methods (single source of truth)
  handleSearch: (query: string) => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
  handleSearchChange: (value: string) => void;
  handleClearSearch: () => void;
  
  // Transition state
  isTransitioning: boolean;
}

const ScreenManagerContext = createContext<ScreenManagerContextValue | undefined>(undefined);

interface ScreenManagerProviderProps {
  children: ReactNode;
  initialScreen?: ScreenType;
  initialQuery?: string;
}

export function ScreenManagerProvider({ 
  children, 
  initialScreen = ScreenType.DASHBOARD,
  initialQuery = ''
}: ScreenManagerProviderProps) {
  const [screenState, setScreenState] = useState<ScreenState>({
    currentScreen: initialScreen,
    previousScreen: null,
    history: [initialScreen],
  });
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Core navigation method
  const navigateTo = useCallback((screen: ScreenType, query?: string) => {
    setIsTransitioning(true);
    
    // Update search query if provided
    if (query !== undefined) {
      setSearchQuery(query);
    }
    
    setScreenState(prev => ({
      currentScreen: screen,
      previousScreen: prev.currentScreen,
      history: [...prev.history, screen],
    }));
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  }, [searchQuery]);

  const navigateBack = useCallback(() => {
    setScreenState(prev => {
      if (prev.history.length <= 1) {
        return prev;
      }
      
      const newHistory = [...prev.history];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
      
      return {
        currentScreen: previousScreen,
        previousScreen: prev.currentScreen,
        history: newHistory,
      };
    });
  }, [searchQuery]);

  const clearHistory = useCallback(() => {
    setScreenState({
      currentScreen: ScreenType.DASHBOARD,
      previousScreen: null,
      history: [ScreenType.DASHBOARD],
    });
    setSearchQuery('');
  }, []);

  // Search-specific navigation handlers (consolidated from MobileMapShell)
  const handleSearch = useCallback((query: string) => {
    debugLog('Search query:', query);
    setSearchQuery(query);
    if (query.trim()) {
      navigateTo(ScreenType.SEARCH_RESULTS, query);
    }
  }, [navigateTo]);

  const handleSearchFocus = useCallback(() => {
    debugLog('Search focused');
    setSearchFocused(true);
    navigateTo(ScreenType.SEARCH_SUGGESTIONS, searchQuery);
  }, [navigateTo, searchQuery]);

  const handleSearchBlur = useCallback(() => {
    debugLog('Search blurred');
    setSearchFocused(false);
    // Don't navigate away immediately to allow clicking on suggestions
    setTimeout(() => {
      if (!searchFocused && screenState.currentScreen === ScreenType.SEARCH_SUGGESTIONS && !searchQuery) {
        navigateTo(ScreenType.DASHBOARD);
      }
    }, 200);
  }, [navigateTo, screenState.currentScreen, searchQuery, searchFocused]);

  const handleSearchChange = useCallback((value: string) => {
    debugLog('Search changed:', value);
    setSearchQuery(value);
    if (screenState.currentScreen === ScreenType.SEARCH_SUGGESTIONS) {
      // Update suggestions as user types (don't trigger full navigation, just update query)
      setScreenState(prev => ({
        ...prev,
        searchQuery: value,
      }));
    }
  }, [screenState.currentScreen]);

  const handleClearSearch = useCallback(() => {
    debugLog('Search cleared');
    setSearchQuery('');
    navigateTo(ScreenType.DASHBOARD, '');
  }, [navigateTo]);

  const value: ScreenManagerContextValue = {
    screenState,
    searchQuery,
    searchFocused,
    navigateTo,
    navigateBack,
    clearHistory,
    handleSearch,
    handleSearchFocus,
    handleSearchBlur,
    handleSearchChange,
    handleClearSearch,
    isTransitioning,
  };

  return (
    <ScreenManagerContext.Provider value={value}>
      {children}
    </ScreenManagerContext.Provider>
  );
}

export function useScreenManager() {
  const context = useContext(ScreenManagerContext);
  if (!context) {
    throw new Error('useScreenManager must be used within a ScreenManagerProvider');
  }
  return context;
}