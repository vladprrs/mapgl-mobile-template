'use client';

import { MapProvider } from '@/components/map/MapProvider';
import { MapContainer } from '@/components/map/MapContainer';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { PlaceDetails } from '@/components/PlaceDetails';

export default function Home() {
  return (
    <MapProvider>
      <main className="relative w-full h-screen">
        <MapContainer />
        
        <BottomSheet
          snapPoints={[0.15, 0.5, 0.9]}
          defaultSnapPoint={1}
          onSnapChange={(index) => {
            console.log('Snapped to:', index);
          }}
        >
          <PlaceDetails />
        </BottomSheet>
      </main>
    </MapProvider>
  );
}
