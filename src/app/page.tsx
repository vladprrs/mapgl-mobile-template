'use client';

import { MapProvider, MapContainer } from '@/components/organisms';
import { MobileMapShell } from '@/components/templates';
import { useEffect, useState } from 'react';
import type { AdviceItem } from '@/__mocks__/advice/types';

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
