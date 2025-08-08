'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { SimpleBottomSheet } from '@/components/bottom-sheet/SimpleBottomSheet';
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
        <SimpleBottomSheet
          snapPoints={[10, 50, 90]}
          header={
            <div className="bg-white">
              {/* Keep header simple; Dashboard internal bars are disabled below */}
            </div>
          }
        >
          <Dashboard items={devItems} showSearchBar={false} showQuickAccess={false} />
        </SimpleBottomSheet>
      </main>
    </MapProvider>
  );
}
