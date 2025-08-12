'use client';

import React, { useEffect } from 'react';
import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { ScreenManagerProvider, useScreenManager, ScreenType } from '@/components/screen-manager';

function TestContent() {
  const { navigateTo } = useScreenManager();
  
  useEffect(() => {
    // Automatically navigate to SearchResults to test the border fix
    setTimeout(() => {
      navigateTo(ScreenType.SEARCH_RESULTS, 'test query');
    }, 1000);
  }, [navigateTo]);
  
  return (
    <MobileMapShell 
      snapPoints={[10, 50, 90]} 
      onSnapChange={(snap) => {
        console.log(`Sheet snapped to: ${snap}%`);
      }}
    />
  );
}

export default function TestBorderFixPage() {
  return (
    <div className="relative h-screen w-full">
      <MapProvider>
        <MapContainer />
        <ScreenManagerProvider initialScreen={ScreenType.DASHBOARD}>
          <TestContent />
        </ScreenManagerProvider>
      </MapProvider>
      
      {/* Test instructions overlay */}
      <div className="fixed top-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg z-[60] max-w-md">
        <h2 className="font-bold mb-2">Border Fix Test:</h2>
        <ol className="text-sm space-y-1">
          <li>1. ✅ Auto-navigates to SearchResults after 1 second</li>
          <li>2. ✅ Check: No gray lines between SearchBar and cards</li>
          <li>3. ✅ Only clean padding/spacing should be visible</li>
          <li>4. ✅ Background should be seamless gray (#F1F1F1)</li>
          <li>5. ✅ Try dragging - should still work smoothly</li>
        </ol>
        <p className="text-xs mt-2 text-gray-300">
          The page will automatically show SearchResults screen.<br/>
          There should be NO visible borders or lines, only spacing.
        </p>
      </div>
    </div>
  );
}