'use client';

import React from 'react';
import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { fullAppMockData } from '@/__mocks__';

export default function TestSnapAdjustmentsPage() {
  return (
    <MapProvider>
      <div className="fixed inset-0">
        <MapContainer />
        <MobileMapShell
          snapPoints={[10, 50, 90]}
          items={fullAppMockData.adviceItems}
        />
        
        {/* Debug overlay to show snap adjustment behavior */}
        <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg z-[60] max-w-sm">
          <h3 className="text-sm font-bold mb-2">Snap Point Auto-Adjustment Test</h3>
          <ul className="text-xs space-y-1">
            <li>• Click search → Opens SearchSuggestions → Auto-expands to 90%</li>
            <li>• Type and press Enter → Opens SearchResults → Auto-adjusts to 50%</li>
            <li>• Click X to clear → Returns to Dashboard → Stays at 50%</li>
          </ul>
          <p className="text-xs mt-2 text-yellow-300">
            Watch the bottom sheet automatically adjust its height when navigating between screens!
          </p>
        </div>
      </div>
    </MapProvider>
  );
}