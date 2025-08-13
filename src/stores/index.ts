'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import { enableMapSet } from 'immer';

enableMapSet();
import type { AppStore } from './types';
import { createMapSlice } from './slices/mapSlice';
import { createSearchSlice } from './slices/searchSlice';
import { createUISlice } from './slices/uiSlice';
import { createActions } from './slices/actions';

const useStore = create<AppStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get, api) => ({
          map: createMapSlice(set, get, api),
          search: createSearchSlice(set, get, api),
          ui: createUISlice(set, get, api),
          actions: createActions(set, get, api),
        }))
      ),
      {
        name: '2gis-storage',
        partialize: (state) => ({
          searchHistory: state.search.history,
          bottomSheetSnap: state.ui.bottomSheet.snapPoint,
        }),
        skipHydration: true,
      }
    ),
    { 
      name: '2gis-store',
      trace: true,
    }
  )
);

export default useStore;

export const useMapStore = () => useStore((state) => state.map);
export const useSearchStore = () => useStore((state) => state.search);
export const useUIStore = () => useStore((state) => state.ui);
export const useActions = () => useStore((state) => state.actions);

if (typeof window !== 'undefined') {
  useStore.persist.rehydrate();
}