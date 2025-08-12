'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { useState } from 'react';
import { mockAdviceItems } from '@/__mocks__/advice/mockData';

export default function TestDragAllPage() {
  const [currentSnap, setCurrentSnap] = useState(50);
  const [lastDragTime, setLastDragTime] = useState<string>('');
  const [dragSource, setDragSource] = useState<string>('');
  
  const handleSnapChange = (snap: number) => {
    const prevSnap = currentSnap;
    setCurrentSnap(snap);
    
    if (snap !== prevSnap) {
      const time = new Date().toLocaleTimeString();
      setLastDragTime(time);
      
      // Determine drag direction and source
      const direction = snap < prevSnap ? 'down' : 'up';
      setDragSource(`Dragged ${direction} from ${prevSnap}% to ${snap}%`);
    }
  };
  
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        
        {/* Status display */}
        <div className="absolute top-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-40">
          <h2 className="font-bold text-base mb-3">Universal Drag Test - All Snap Points</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-600">Current snap:</p>
              <p className="text-lg font-mono font-bold">{currentSnap}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Last drag:</p>
              <p className="text-xs font-mono">{lastDragTime || 'Not yet'}</p>
            </div>
          </div>
          
          {dragSource && (
            <div className="mb-3 p-2 bg-green-50 rounded text-xs text-green-700">
              ✅ {dragSource}
            </div>
          )}
          
          <div className="space-y-3">
            <div className="text-xs">
              <p className="font-semibold mb-1">🎯 Expected Behavior (ALL snap points):</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Can drag from SearchBar area</li>
                <li>• Can drag from any dashboard content</li>
                <li>• Can drag from empty space between elements</li>
                <li>• Can drag from the handle bar</li>
                <li>• Interactive elements (buttons, inputs) remain clickable</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className={`p-2 rounded ${currentSnap === 10 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
                <p className="font-semibold">10% (Collapsed)</p>
                <p className="text-[10px] mt-1">✓ Drag from anywhere</p>
                <p className="text-[10px]">✗ No scrolling</p>
              </div>
              <div className={`p-2 rounded ${currentSnap === 50 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
                <p className="font-semibold">50% (Half)</p>
                <p className="text-[10px] mt-1">✓ Drag from anywhere</p>
                <p className="text-[10px]">✗ No scrolling</p>
              </div>
              <div className={`p-2 rounded ${currentSnap === 90 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
                <p className="font-semibold">90% (Expanded)</p>
                <p className="text-[10px] mt-1">✓ Drag when at top</p>
                <p className="text-[10px]">✓ Scroll when not at top</p>
              </div>
            </div>
            
            <div className="text-[10px] text-gray-500 border-t pt-2">
              <p>Test: Try dragging from different areas at each snap point</p>
              <p>All areas should be draggable, not just the handle</p>
            </div>
          </div>
        </div>
        
        <MobileMapShell
          snapPoints={[10, 50, 90]}
          initialSnap={50}
          onSnapChange={handleSnapChange}
          items={mockAdviceItems}
        />
      </main>
    </MapProvider>
  );
}