'use client';

import type { AppStore } from '../types';
import { ScreenType } from '@/components/templates/types';
import useStore from '../index';

export const selectCurrentScreen = (state: AppStore) => state.ui.currentScreen;
export const selectPreviousScreen = (state: AppStore) => state.ui.previousScreen;
export const selectScreenHistory = (state: AppStore) => state.ui.screenHistory;
export const selectBottomSheetSnap = (state: AppStore) => state.ui.bottomSheet.snapPoint;
export const selectBottomSheetSnapPoints = (state: AppStore) => state.ui.bottomSheet.snapPoints;
export const selectIsBottomSheetTransitioning = (state: AppStore) => state.ui.bottomSheet.isTransitioning;
export const selectIsBottomSheetDragging = (state: AppStore) => state.ui.bottomSheet.isDragging;
export const selectScrollEnabled = (state: AppStore) => state.ui.scrollEnabled;

export const selectIsScreen = (screen: ScreenType) => (state: AppStore) =>
  state.ui.currentScreen === screen;

export const selectCanGoBack = (state: AppStore) =>
  state.ui.screenHistory.length > 1;

export const selectBottomSheetState = (state: AppStore) => {
  const snap = state.ui.bottomSheet.snapPoint;
  const snapPoints = state.ui.bottomSheet.snapPoints;
  const index = snapPoints.indexOf(snap as 10 | 50 | 90);
  
  if (index === 0) return 'collapsed';
  if (index === snapPoints.length - 1) return 'expanded';
  return 'half';
};

export const selectSearchBarVariant = (state: AppStore) => {
  switch (state.ui.currentScreen) {
    case ScreenType.SEARCH_RESULTS:
      return 'results';
    case ScreenType.SEARCH_SUGGESTIONS:
      return 'suggest';
    default:
      return 'dashboard';
  }
};

export const selectHeaderBackground = (state: AppStore) =>
  state.ui.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white';

export const selectContentBackground = (state: AppStore) =>
  state.ui.currentScreen === ScreenType.SEARCH_RESULTS ? '#F1F1F1' : 'white';

export const useCurrentScreen = () => useStore(selectCurrentScreen);
export const useBottomSheetSnap = () => useStore(selectBottomSheetSnap);
export const useScrollEnabled = () => useStore(selectScrollEnabled);
export const useSearchBarVariant = () => useStore(selectSearchBarVariant);
export const useHeaderBackground = () => useStore(selectHeaderBackground);
export const useContentBackground = () => useStore(selectContentBackground);