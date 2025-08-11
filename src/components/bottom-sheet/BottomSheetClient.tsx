'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Loading placeholder that maintains layout during SSR
const BottomSheetPlaceholder = () => (
  <div 
    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50"
    style={{
      height: '50vh', // Default middle position
      transform: 'translateY(0)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}
    data-testid="bottom-sheet-placeholder"
  >
    <div className="flex justify-center py-2">
      <div className="w-12 h-1 rounded-full bg-gray-300" />
    </div>
    <div className="p-4">
      {/* Content will be loaded after hydration */}
    </div>
  </div>
);

// Dynamically import the BottomSheet component with no SSR
export const BottomSheetClient = dynamic(
  () => import('./BottomSheet'),
  {
    ssr: false,
    loading: () => <BottomSheetPlaceholder />,
  }
);