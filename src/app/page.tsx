'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { BottomSheet } from '@/components/bottom-sheet';
import { LocationList } from '@/components/LocationList';

export default function Home() {
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        <BottomSheet snapPoints={[10, 50, 90]}>
          <LocationList />
        </BottomSheet>
      </main>
    </MapProvider>
  );
}
