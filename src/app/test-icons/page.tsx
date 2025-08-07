'use client';

import { Icon, ICONS, COLORS } from '@/components/icons';

export default function TestIconsPage() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Icon Test Page</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Icons in 24x24 containers (with grid)</h2>
          <div className="flex gap-4 items-center">
            {Object.entries(ICONS).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="border border-gray-300 bg-gray-50 p-2 inline-block">
                  <div className="relative">
                    {/* Grid lines to show 24x24 boundary */}
                    <div className="absolute inset-0 border border-red-200" style={{ width: 24, height: 24 }} />
                    <Icon name={value} size={24} color={COLORS.TEXT_PRIMARY} />
                  </div>
                </div>
                <p className="text-xs mt-1">{key}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Icons at different sizes</h2>
          <div className="space-y-4">
            {[16, 20, 24, 32, 40].map(size => (
              <div key={size} className="flex gap-4 items-center">
                <span className="w-20 text-sm">{size}px:</span>
                {Object.entries(ICONS).map(([key, value]) => (
                  <div key={key} className="border border-gray-200 inline-block">
                    <Icon name={value} size={size} color={COLORS.TEXT_PRIMARY} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Icons with different colors</h2>
          <div className="flex gap-4 items-center">
            <Icon name={ICONS.HOME} size={24} color={COLORS.TEXT_PRIMARY} />
            <Icon name={ICONS.HOME} size={24} color={COLORS.TEXT_SECONDARY} />
            <Icon name={ICONS.HOME} size={24} color={COLORS.TRAFFIC_HEAVY} />
            <Icon name={ICONS.HOME} size={24} color={COLORS.TRAFFIC_MODERATE} />
            <Icon name={ICONS.HOME} size={24} color={COLORS.TRAFFIC_LIGHT} />
          </div>
        </section>
      </div>
    </div>
  );
}