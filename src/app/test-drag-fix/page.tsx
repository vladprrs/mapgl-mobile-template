'use client';

import React from 'react';
import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';

export default function TestDragFixPage() {
  return (
    <div className="relative h-screen w-full">
      <MapProvider>
        <MapContainer />
        <MobileMapShell 
          snapPoints={[10, 50, 90]} 
          onSnapChange={(snap) => {
            console.log(`Sheet snapped to: ${snap}%`);
          }}
        />
      </MapProvider>
      
      {/* Test instructions overlay */}
      <div className="fixed top-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg z-[60] max-w-md">
        <h2 className="font-bold mb-2">Test Both Features:</h2>
        <ol className="text-sm space-y-1">
          <li>1. ✅ Manual drag: Try dragging sheet to 10%, 50%, 90%</li>
          <li>2. ✅ Auto-adjust: Click search → goes to 90% for suggestions</li>
          <li>3. ✅ Auto-adjust: Type & search → goes to 50% for results</li>
          <li>4. ✅ Manual after auto: Drag after auto-adjustment works</li>
          <li>5. ✅ Clear search (X) → returns to dashboard at 50%</li>
        </ol>
        <p className="text-xs mt-2 text-gray-300">Check console for snap logs</p>
      </div>
    </div>
  );
}