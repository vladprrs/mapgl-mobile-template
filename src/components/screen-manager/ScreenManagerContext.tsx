'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ScreenType, ScreenState } from './types';

interface ScreenManagerContextValue {
  screenState: ScreenState;
  navigateTo: (screen: ScreenType, searchQuery?: string) => void;
  navigateBack: () => void;
  clearHistory: () => void;
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
    screenHistory: [initialScreen],
    searchQuery: initialQuery,
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = useCallback((screen: ScreenType, searchQuery?: string) => {
    setIsTransitioning(true);
    
    setScreenState(prev => ({
      currentScreen: screen,
      previousScreen: prev.currentScreen,
      searchQuery: searchQuery ?? prev.searchQuery,
      screenHistory: [...prev.screenHistory, screen],
    }));
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const navigateBack = useCallback(() => {
    setScreenState(prev => {
      if (prev.screenHistory.length <= 1) {
        return prev;
      }
      
      const newHistory = [...prev.screenHistory];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
      
      return {
        currentScreen: previousScreen,
        previousScreen: prev.currentScreen,
        searchQuery: prev.searchQuery,
        screenHistory: newHistory,
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setScreenState({
      currentScreen: ScreenType.DASHBOARD,
      screenHistory: [ScreenType.DASHBOARD],
    });
  }, []);

  const value: ScreenManagerContextValue = {
    screenState,
    navigateTo,
    navigateBack,
    clearHistory,
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