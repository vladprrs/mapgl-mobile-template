'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { useState } from 'react';
import { mockAdviceItems } from '@/__mocks__/advice/mockData';

export default function TestDragExpandedPage() {
  const [currentSnap, setCurrentSnap] = useState(90);
  const [dragStatus, setDragStatus] = useState('');
  
  const handleSnapChange = (snap: number) => {
    setCurrentSnap(snap);
    if (snap !== 90) {
      setDragStatus('✅ Sheet dragged successfully!');
      setTimeout(() => setDragStatus(''), 3000);
    }
  };
  
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        
        {/* Status display */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-40 max-w-xs">
          <h2 className="font-bold text-sm mb-2">Drag Test - Expanded State</h2>
          <p className="text-xs">Current snap: <span className="font-mono">{currentSnap}%</span></p>
          
          <div className="mt-2 space-y-2">
            <div className="text-xs space-y-1">
              <p className="font-semibold">Test Instructions:</p>
              <p>1. Sheet starts at 90% (expanded)</p>
              <p>2. Try dragging down from stories area ✅</p>
              <p>3. Try dragging down from advice cards area</p>
              <p>4. Both should drag the sheet down</p>
            </div>
            
            {dragStatus && (
              <p className="text-xs text-green-600 font-semibold">{dragStatus}</p>
            )}
            
            <div className="text-xs text-gray-600">
              <p className="font-semibold">Expected behavior:</p>
              <p>• Stories: Drag should work ✅</p>
              <p>• Advice: Drag should work (fixed)</p>
              <p>• Cards remain clickable</p>
            </div>
          </div>
        </div>
        
        <MobileMapShell
          snapPoints={[10, 50, 90]}
          initialSnap={90}
          onSnapChange={handleSnapChange}
          items={mockAdviceItems}
        />
      </main>
    </MapProvider>
  );
}