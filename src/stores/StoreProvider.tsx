'use client';

import React, { useEffect } from 'react';
import useStore from './index';
import type { Map } from '@2gis/mapgl/global';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const setMapInstance = useStore((state) => state.map.setMapInstance);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __setMapInstance: (map: Map) => void }).__setMapInstance = (mapInstance: Map) => {
        setMapInstance(mapInstance);
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as unknown as { __setMapInstance?: unknown }).__setMapInstance;
      }
    };
  }, [setMapInstance]);
  
  return <>{children}</>;
}