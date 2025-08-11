'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { Dashboard } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import type { AdviceItem } from '@/components/dashboard/advice/types';

export default function Home() {
  const [devItems, setDevItems] = useState<AdviceItem[] | undefined>(undefined);

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
        <BottomSheet
          snapPoints={[10, 50, 90]}
        >
          <Dashboard items={devItems} showSearchBar={true} showQuickAccess={true} />
        </BottomSheet>
      </main>
    </MapProvider>
  );
}
