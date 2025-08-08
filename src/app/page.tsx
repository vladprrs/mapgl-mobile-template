'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { BottomSheetWithDashboard } from '@/components/bottom-sheet/BottomSheetWithDashboard';
import { Dashboard } from '@/components/dashboard';
import { mockAdviceItems } from '@/__mocks__/advice/mockData';

export default function Home() {
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        <BottomSheetWithDashboard snapPoints={[10, 50, 90]}>
          <Dashboard items={mockAdviceItems} />
        </BottomSheetWithDashboard>
      </main>
    </MapProvider>
  );
}
