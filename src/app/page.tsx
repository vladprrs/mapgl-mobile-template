'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { BottomSheetWithDashboard } from '@/components/bottom-sheet/BottomSheetWithDashboard';
import { Dashboard } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import type { AdviceItem } from '@/components/dashboard/advice/types';

export default function Home() {
  const [devItems, setDevItems] = useState<AdviceItem[] | undefined>(undefined);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('@/__mocks__/advice/mockData').then((mod) => {
        setDevItems(mod.mockAdviceItems);
      });
    }
  }, []);

  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        <BottomSheetWithDashboard snapPoints={[10, 50, 90]}>
          <Dashboard items={devItems} />
        </BottomSheetWithDashboard>
      </main>
    </MapProvider>
  );
}
