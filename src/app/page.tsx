'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { BottomSheetWithDashboard } from '@/components/bottom-sheet/BottomSheetWithDashboard';
import { useEffect, useState } from 'react';
import type { AdviceItem } from '@/components/dashboard/advice/types';

export default function Home() {
  // Initialize with empty array instead of undefined to prevent layout shift
  const [devItems, setDevItems] = useState<AdviceItem[]>([]);

  useEffect(() => {
    const shouldLoadDemoAdvice =
      process.env.NODE_ENV !== 'production' ||
      process.env.NEXT_PUBLIC_ENABLE_DEMO_ADVICE === 'true';

    if (shouldLoadDemoAdvice) {
      import('@/__mocks__/advice/mockData').then((mod) => {
        setDevItems(mod.mockAdviceItems);
      });
    }
  }, []);

  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        <BottomSheetWithDashboard
          snapPoints={[10, 50, 90]}
          items={devItems}
        />
      </main>
    </MapProvider>
  );
}
