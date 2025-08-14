'use client';

import type { StateCreator } from 'zustand';
import type { AppStore, UISlice } from '../types';
import { ScreenType } from '@/components/templates/types';
import { debugLog } from '@/lib/logging';

export const createUISlice: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  UISlice
> = (set, get) => ({
  currentScreen: ScreenType.DASHBOARD,
  previousScreen: null,
  screenHistory: [ScreenType.DASHBOARD],
  bottomSheet: {
    snapPoint: 50,
    snapPoints: [10, 50, 90] as [number, number, number],
    isTransitioning: false,
    isDragging: false,
  },
  scrollEnabled: true,

  navigateTo: (screen: ScreenType) => {
    debugLog('Navigating to:', screen);
    
    set((state) => {
      state.ui.previousScreen = state.ui.currentScreen;
      state.ui.currentScreen = screen;
      state.ui.screenHistory.push(screen);
      
      let targetSnap = state.ui.bottomSheet.snapPoint;
      
      switch (screen) {
        case ScreenType.SEARCH_SUGGESTIONS:
          targetSnap = 90;
          break;
        case ScreenType.SEARCH_RESULTS:
          targetSnap = 50;
          break;
        case ScreenType.ORGANIZATION_DETAILS:
          targetSnap = 90;
          break;
        case ScreenType.DASHBOARD:
        default:
          targetSnap = 50;
          break;
      }
      
      if (targetSnap !== state.ui.bottomSheet.snapPoint) {
        state.ui.bottomSheet.snapPoint = targetSnap;
        state.ui.bottomSheet.isTransitioning = true;
      }
    });
  },

  navigateBack: () => {
    const history = get().ui.screenHistory;
    if (history.length <= 1) {
      debugLog('Cannot navigate back - at root');
      return;
    }

    set((state) => {
      state.ui.screenHistory.pop();
      const previousScreen = state.ui.screenHistory[state.ui.screenHistory.length - 1];
      state.ui.previousScreen = state.ui.currentScreen;
      state.ui.currentScreen = previousScreen;
    });
  },

  setBottomSheetSnap: (snap: number) => {
    debugLog('Setting bottom sheet snap to:', snap);
    
    const validSnap = get().ui.bottomSheet.snapPoints.includes(snap as 10 | 50 | 90) 
      ? snap 
      : get().ui.bottomSheet.snapPoints[1];
    
    set((state) => {
      const oldSnap = state.ui.bottomSheet.snapPoint;
      state.ui.bottomSheet.snapPoint = validSnap;
      state.ui.bottomSheet.isTransitioning = false;
      
      const mapSlice = get().map;
      if (mapSlice.instance) {
        mapSlice.adjustCenterForBottomSheet(oldSnap, validSnap);
      }
    });
  },

  setBottomSheetDragging: (dragging: boolean) => {
    set((state) => {
      state.ui.bottomSheet.isDragging = dragging;
      state.ui.scrollEnabled = !dragging;
    });
  },

  setBottomSheetTransitioning: (transitioning: boolean) => {
    set((state) => {
      state.ui.bottomSheet.isTransitioning = transitioning;
    });
  },

  setScrollEnabled: (enabled: boolean) => {
    set((state) => {
      state.ui.scrollEnabled = enabled;
    });
  },

  resetNavigation: () => {
    debugLog('Resetting navigation to dashboard');
    
    set((state) => {
      state.ui.currentScreen = ScreenType.DASHBOARD;
      state.ui.previousScreen = null;
      state.ui.screenHistory = [ScreenType.DASHBOARD];
      state.ui.bottomSheet.snapPoint = 50;
      state.ui.bottomSheet.isTransitioning = false;
      state.ui.bottomSheet.isDragging = false;
      state.ui.scrollEnabled = true;
    });
  },
});