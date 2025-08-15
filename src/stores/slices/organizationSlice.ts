'use client';

import type { StateCreator } from 'zustand';
import type { AppStore, OrganizationSlice, SearchResult } from '../types';
import { debugLog } from '@/lib/logging';
import { allOrganizations } from '@/__mocks__/organizations';

export const createOrganizationSlice: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  OrganizationSlice
> = (set, get) => ({
  currentOrganization: null,
  isLoading: false,
  activeTab: 'overview', // Default to 'overview' tab
  
  setCurrentOrganization: (organization: SearchResult) => {
    debugLog('Setting current organization:', organization);
    set((state) => {
      state.organization.currentOrganization = organization;
      state.organization.isLoading = false;
    });
  },

  loadOrganizationById: async (id: string) => {
    debugLog('Loading organization by ID:', id);
    set((state) => {
      state.organization.isLoading = true;
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const organization = allOrganizations.find(org => org.id === id);
      
      if (organization) {
        set((state) => {
          state.organization.currentOrganization = organization;
          state.organization.isLoading = false;
        });
      } else {
        throw new Error(`Organization with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Failed to load organization:', error);
      set((state) => {
        state.organization.isLoading = false;
      });
    }
  },

  clearCurrentOrganization: () => {
    set((state) => {
      state.organization.currentOrganization = null;
      state.organization.isLoading = false;
    });
  },

  setLoading: (loading: boolean) => {
    set((state) => {
      state.organization.isLoading = loading;
    });
  },

  setActiveTab: (tabId: string) => {
    debugLog('Setting active tab:', tabId);
    set((state) => {
      state.organization.activeTab = tabId;
    });
  },
});