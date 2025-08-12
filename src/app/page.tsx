'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { MobileMapShell } from '@/components/app-shell';
import { useEffect, useState } from 'react';
import type { AdviceItem } from '@/components/dashboard/advice/types';

// Inner component that has access to MapContext
function MapWithBottomSheet() {
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
    <main className="relative w-full h-screen">
      <MapContainer />
      <MobileMapShell
        snapPoints={[10, 50, 90]}
        items={devItems}
      />
    </main>
  );
}

export default function Home() {
  return (
    <MapProvider>
      <MapWithBottomSheet />
    </MapProvider>
  );
}
