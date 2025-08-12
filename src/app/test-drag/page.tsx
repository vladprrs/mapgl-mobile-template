'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { useState } from 'react';

export default function TestDragPage() {
  const [currentSnap, setCurrentSnap] = useState(10);
  
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        
        {/* Status display */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-40">
          <h2 className="font-bold text-sm mb-2">Drag Test Status</h2>
          <p className="text-xs">Current snap: <span className="font-mono">{currentSnap}%</span></p>
          <div className="mt-2 text-xs space-y-1">
            <p className="text-gray-600">
              {currentSnap === 10 && '✅ Drag from anywhere in visible area'}
              {currentSnap === 50 && '⚠️ Drag only from handle'}
              {currentSnap === 90 && '⚠️ Drag only from handle + scrolling enabled'}
            </p>
          </div>
        </div>
        
        <MobileMapShell
          snapPoints={[10, 50, 90]}
          initialSnap={10}
          onSnapChange={setCurrentSnap}
          items={[]}
        />
      </main>
    </MapProvider>
  );
}