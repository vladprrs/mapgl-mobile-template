'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { useState, useEffect, useRef } from 'react';

export default function TestSpacingPage() {
  const [currentSnap, setCurrentSnap] = useState(50);
  const [spacingInfo, setSpacingInfo] = useState('Measuring...');
  const measureRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  useEffect(() => {
    // Measure spacing after render
    if (measureRef.current) {
      clearTimeout(measureRef.current);
    }
    
    measureRef.current = setTimeout(() => {
      // Find SearchBar and QuickAccessPanel elements
      const searchBar = document.querySelector('[aria-label="Search"]')?.closest('.bg-white');
      const quickAccess = document.querySelector('[data-testid="quick-access-panel"]')?.parentElement;
      
      if (searchBar && quickAccess) {
        const searchBarRect = searchBar.getBoundingClientRect();
        const quickAccessRect = quickAccess.getBoundingClientRect();
        const spacing = quickAccessRect.top - searchBarRect.bottom;
        
        setSpacingInfo(`${Math.round(spacing)}px`);
      } else {
        // Try alternative selectors
        const searchContainer = document.querySelector('.pb-2'); // SearchBar container
        const quickContainer = document.querySelector('.pt-2.pb-4'); // QuickAccess container
        
        if (searchContainer && quickContainer) {
          const searchRect = searchContainer.getBoundingClientRect();
          const quickRect = quickContainer.getBoundingClientRect();
          const spacing = quickRect.top - searchRect.bottom;
          
          setSpacingInfo(`${Math.round(spacing)}px`);
        } else {
          setSpacingInfo('Unable to measure');
        }
      }
    }, 500);
    
    return () => {
      if (measureRef.current) {
        clearTimeout(measureRef.current);
      }
    };
  }, [currentSnap]);
  
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        
        {/* Status display */}
        <div className="absolute top-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-40">
          <h2 className="font-bold text-base mb-3">Spacing Test - SearchBar to QuickAccess</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-600">Current snap:</p>
              <p className="text-lg font-mono font-bold">{currentSnap}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Measured spacing:</p>
              <p className={`text-lg font-mono font-bold ${
                spacingInfo === '16px' ? 'text-green-600' : 
                spacingInfo === 'Measuring...' ? 'text-gray-400' : 
                'text-red-600'
              }`}>
                {spacingInfo}
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-semibold mb-1">Expected Spacing:</p>
              <p>• SearchBar bottom padding: 8px (pb-2)</p>
              <p>• QuickAccessPanel top padding: 8px (pt-2)</p>
              <p className="font-semibold mt-1">Total: 16px ✓</p>
            </div>
            
            <div className={`p-2 rounded ${
              spacingInfo === '16px' ? 'bg-green-50 text-green-700' : 
              spacingInfo === 'Measuring...' ? 'bg-gray-50' : 
              'bg-red-50 text-red-700'
            }`}>
              {spacingInfo === '16px' ? (
                '✅ Spacing is correct!'
              ) : spacingInfo === 'Measuring...' ? (
                '⏳ Measuring spacing...'
              ) : (
                `❌ Spacing is ${spacingInfo} (should be 16px)`
              )}
            </div>
            
            <div className="p-2 bg-blue-50 rounded text-blue-700">
              <p className="font-semibold mb-1">Test Dragging:</p>
              <p>• Try dragging from SearchBar area</p>
              <p>• Try dragging from QuickAccess area</p>
              <p>• Verify all areas are draggable</p>
            </div>
          </div>
        </div>
        
        <MobileMapShell
          snapPoints={[10, 50, 90]}
          initialSnap={50}
          onSnapChange={setCurrentSnap}
          items={[]}
        />
      </main>
    </MapProvider>
  );
}