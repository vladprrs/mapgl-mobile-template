'use client';

import { useState } from 'react';
import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { ScreenManagerProvider, useScreenManager, ScreenType } from '@/components/screen-manager';

function TestContent() {
  const { navigateTo } = useScreenManager();
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <>
      {/* Control panel */}
      <div className="absolute top-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-40">
        <h2 className="font-bold text-base mb-3">Search Suggestions & SearchBar Test</h2>
        
        <div className="space-y-2">
          <button
            onClick={() => {
              setShowSuggestions(true);
              navigateTo(ScreenType.SEARCH_SUGGESTIONS, '');
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Empty Search (Saved Addresses)
          </button>
          
          <button
            onClick={() => {
              setShowSuggestions(true);
              navigateTo(ScreenType.SEARCH_SUGGESTIONS, 'мес');
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search for &quot;мес&quot; (Organizations)
          </button>
          
          <button
            onClick={() => {
              setShowSuggestions(true);
              navigateTo(ScreenType.SEARCH_SUGGESTIONS, 'аква');
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search for &quot;аква&quot; (Categories)
          </button>
          
          <button
            onClick={() => {
              setShowSuggestions(false);
              navigateTo(ScreenType.DASHBOARD);
            }}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
          <p className="font-semibold mb-1">SearchBar Features:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Dashboard mode: Menu burger icon on right</li>
            <li>Suggest mode: X/Clear button on right</li>
            <li>Clear button clears search and returns to dashboard</li>
            <li>Identical padding/spacing in both modes</li>
          </ul>
          <p className="font-semibold mt-2 mb-1">SuggestRow Features:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Three variants: Saved Address, Organization, Category</li>
            <li>Icons for home/work saved addresses</li>
            <li>Search highlighting in organization names</li>
            <li>Distance and branch count display</li>
          </ul>
        </div>
      </div>
      
      <MobileMapShell
        snapPoints={[10, 50, 90]}
        initialSnap={showSuggestions ? 90 : 50}
        items={[]}
      />
    </>
  );
}

export default function TestSuggestionsPage() {
  return (
    <MapProvider>
      <ScreenManagerProvider>
        <main className="relative w-full h-screen">
          <MapContainer />
          <TestContent />
        </main>
      </ScreenManagerProvider>
    </MapProvider>
  );
}