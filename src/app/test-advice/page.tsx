'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { AdviceSection } from '@/components/dashboard/advice';
import { Interesting } from '@/components/dashboard/advice/Interesting';
import { MetaItem } from '@/components/dashboard/advice/MetaItem';
import { MetaItemAd } from '@/components/dashboard/advice/MetaItemAd';
import { RD } from '@/components/dashboard/advice/RD';
import { Cover } from '@/components/dashboard/advice/Cover';
import { mockAdviceItems } from '@/components/dashboard/advice/mockData';

export default function TestAdvicePage() {
  
  const interestingLight = {
    type: 'interesting' as const,
    id: 'test-1',
    title: 'Туристический слой',
    description: 'Лучшие места города на карте',
    imageUrl: '/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png',
    featureId: 'tourist-layer',
    theme: 'Light' as const,
  };

  const interestingDark = {
    type: 'interesting' as const,
    id: 'test-2',
    title: 'Туристический слой',
    description: 'Лучшие места города на карте',
    imageUrl: '/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png',
    featureId: 'tourist-layer',
    theme: 'Dark' as const,
  };

  const interestingWithBadge = {
    type: 'interesting' as const,
    id: 'test-3',
    title: 'Туристический слой',
    description: 'Лучшие места города на карте',
    imageUrl: '/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png',
    featureId: 'tourist-layer',
    theme: 'Light' as const,
    badge: 'NEW',
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Advice Components Test Page</h1>
      
      {/* Exact Figma Layout Section - Mobile view at top */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">📱 Exact Figma Layout (Mobile 343px)</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <div className="w-[343px] mx-auto">
            <AdviceSection
              items={mockAdviceItems}
              layout="mixed"
              title="Советы к месту"
              onItemClick={(item) => debugLog('Figma layout item clicked:', item)}
            />
          </div>
        </div>
      </section>

      {/* Responsive Figma Layout */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">🖥️ Responsive Figma Layout</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="max-w-4xl mx-auto">
            <AdviceSection
              items={mockAdviceItems}
              layout="mixed"
              title="Советы к месту"
              onItemClick={(item) => debugLog('Responsive item clicked:', item)}
            />
          </div>
        </div>
      </section>
      
      {/* Test MetaItem Component variants */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">MetaItem Component Variants</h2>
        
        <div className="space-y-8">
          {/* Light theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Light Theme</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <MetaItem
                  id="meta-light-1"
                  title={'Катки\nи ледовые арены'}
                  subtitle="23 места"
                  iconUrl="/assets/advice/d09f29e90c1485808c9c5f19153fbd5bde35b060.svg"
                  categoryId="ice-rinks"
                  searchQuery="катки"
                  theme="Light"
                  onClick={() => debugLog('MetaItem Light clicked')}
                />
                <MetaItem
                  id="meta-light-2"
                  title="Аптеки"
                  subtitle="1243 места"
                  iconUrl="/assets/advice/18f5b1e0152b51de3ce4cf9f463c841f262c2a6a.svg"
                  categoryId="pharmacy"
                  searchQuery="аптека"
                  theme="Light"
                  onClick={() => debugLog('MetaItem Light 2 clicked')}
                />
              </div>
            </div>
          </div>

          {/* Dark theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Dark Theme</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <MetaItem
                  id="meta-dark-1"
                  title={'Катки\nи ледовые арены'}
                  subtitle="23 места"
                  iconUrl="/assets/advice/18f5b1e0152b51de3ce4cf9f463c841f262c2a6a.svg"
                  categoryId="ice-rinks"
                  searchQuery="катки"
                  theme="Dark"
                  onClick={() => debugLog('MetaItem Dark clicked')}
                />
                <MetaItem
                  id="meta-dark-2"
                  title="Аптеки"
                  subtitle="1243 места"
                  iconUrl="/assets/advice/d09f29e90c1485808c9c5f19153fbd5bde35b060.svg"
                  categoryId="pharmacy"
                  searchQuery="аптека"
                  theme="Dark"
                  onClick={() => debugLog('MetaItem Dark 2 clicked')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test MetaItemAd Component variants */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">MetaItemAd Component Variants</h2>
        
        <div className="space-y-8">
          {/* Light theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Light Theme</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <MetaItemAd
                  id="ad-light-1"
                  title="Xiaomi"
                  logoUrl="/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png"
                  gradientColor="#eb6100"
                  gradientMaskUrl="/assets/advice/a81e514928dac622f5cd9e79d6ae0c85e8041eda.svg"
                  searchPhrase="xiaomi"
                  advertiserId="xiaomi"
                  theme="Light"
                  onClick={() => debugLog('MetaItemAd Light clicked')}
                />
                <MetaItemAd
                  id="ad-light-2"
                  title="Samsung"
                  logoUrl="/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png"
                  gradientColor="#1428A0"
                  searchPhrase="samsung"
                  advertiserId="samsung"
                  theme="Light"
                  onClick={() => debugLog('MetaItemAd Light 2 clicked')}
                />
              </div>
            </div>
          </div>

          {/* Dark theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Dark Theme</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <MetaItemAd
                  id="ad-dark-1"
                  title="Xiaomi"
                  logoUrl="/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png"
                  gradientColor="#eb6100"
                  gradientMaskUrl="/assets/advice/8a864d910be8ae51e64885c1673c28f86d3a82d6.svg"
                  searchPhrase="xiaomi"
                  advertiserId="xiaomi"
                  theme="Dark"
                  onClick={() => debugLog('MetaItemAd Dark clicked')}
                />
                <MetaItemAd
                  id="ad-dark-2"
                  title="Apple"
                  logoUrl="/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png"
                  gradientColor="#000000"
                  searchPhrase="apple"
                  advertiserId="apple"
                  theme="Dark"
                  isSponsored={false}
                  onClick={() => debugLog('MetaItemAd Dark 2 clicked')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Test Interesting Component variants */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Interesting Component Variants</h2>
        
        <div className="space-y-8">
          {/* Light theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Light Theme</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <Interesting
                  id="light-1"
                  title="Туристический слой"
                  description="Лучшие места города на карте"
                  imageUrl="/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png"
                  featureId="tourist-layer"
                  theme="Light"
                  onClick={() => debugLog('Light theme clicked')}
                />
                <Interesting
                  id="light-2"
                  title="Туристический слой"
                  description="Лучшие места города на карте"
                  imageUrl="/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png"
                  featureId="tourist-layer"
                  theme="Light"
                  badge="NEW"
                  onClick={() => debugLog('Light with badge clicked')}
                />
              </div>
            </div>
          </div>

          {/* Dark theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Dark Theme</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <Interesting
                  id="dark-1"
                  title="Туристический слой"
                  description="Лучшие места города на карте"
                  imageUrl="/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png"
                  featureId="tourist-layer"
                  theme="Dark"
                  onClick={() => debugLog('Dark theme clicked')}
                />
                <Interesting
                  id="dark-2"
                  title="Туристический слой"
                  description="Лучшие места города на карте"
                  imageUrl="/assets/advice/e54c37b478c3fbeeadd3e7ff6c943f19ac03e375.png"
                  featureId="tourist-layer"
                  theme="Dark"
                  badge="HOT"
                  onClick={() => debugLog('Dark with badge clicked')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test RD Component variants */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">RD (Advertiser) Component Variants</h2>
        
        <div className="space-y-8">
          {/* Light theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Light Theme</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <RD
                  id="rd-light-1"
                  advertiserName="Geraldine"
                  subtitle="Необистро"
                  images={[
                    '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                    '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                    '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                    '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                  ]}
                  rating="4.6"
                  distance="1.4 км"
                  address="Тверская 32/12, 1 этаж"
                  organizationId="geraldine"
                  establishmentIds={['est-1', 'est-2', 'est-3']}
                  theme="Light"
                  isVerified={true}
                  onClick={() => debugLog('RD Light clicked')}
                />
                <RD
                  id="rd-light-2"
                  advertiserName="Реактор"
                  subtitle="Сеть ресторанов быстрого питания"
                  rating="4.2"
                  distance="0.8 км"
                  address="Пушкинская 15"
                  organizationId="reaktor"
                  theme="Light"
                  onClick={() => debugLog('RD Light 2 clicked')}
                />
              </div>
            </div>
          </div>

          {/* Dark theme */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Dark Theme</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <RD
                  id="rd-dark-1"
                  advertiserName="Geraldine"
                  subtitle="Необистро"
                  images={[
                    '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                    '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                  ]}
                  rating="4.6"
                  distance="1.4 км"
                  address="Тверская 32/12, БЦ Апельсин, 1 этаж"
                  organizationId="geraldine"
                  establishmentIds={['est-1', 'est-2', 'est-3', 'est-4', 'est-5']}
                  theme="Dark"
                  isVerified={true}
                  onClick={() => debugLog('RD Dark clicked')}
                />
                <RD
                  id="rd-dark-2"
                  advertiserName="Бургер Кинг"
                  subtitle="Быстрое питание"
                  rating="3.9"
                  distance="2.1 км"
                  address="Ленинградский проспект 35"
                  organizationId="burgerking"
                  theme="Dark"
                  onClick={() => debugLog('RD Dark 2 clicked')}
                />
              </div>
            </div>
          </div>

          {/* With many images showing counter */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">With Image Counter</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="max-w-[220px]">
                <RD
                  id="rd-counter"
                  advertiserName="Geraldine"
                  subtitle="Необистро"
                  images={Array(826).fill('/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png')}
                  rating="4.6"
                  distance="1.4 км"
                  address="Тверская 32/12, БЦ Апельсин, 1 этаж"
                  organizationId="geraldine"
                  theme="Light"
                  isVerified={true}
                  onClick={() => debugLog('RD with counter clicked')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Cover Component variants */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Cover Component Variants</h2>
        
        <div className="space-y-8">
          {/* Default state */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Default State (142px height)</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="max-w-md">
                <Cover
                  id="cover-default-1"
                  title="Лучшие кофейни Москвы"
                  subtitle="Где выпить идеальный капучино"
                  imageUrl="/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png"
                  collectionId="best-coffee"
                  itemCount={25}
                  author="2GIS"
                  state="Default"
                  onClick={() => debugLog('Cover Default clicked')}
                />
              </div>
            </div>
          </div>

          {/* Big state */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Big State (200px height)</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="max-w-md">
                <Cover
                  id="cover-big-1"
                  title="Рестораны с панорамным видом"
                  subtitle="Ужин с видом на город"
                  imageUrl="/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png"
                  collectionId="panoramic-restaurants"
                  itemCount={42}
                  author="Редакция 2GIS"
                  state="Big"
                  onClick={() => debugLog('Cover Big clicked')}
                />
              </div>
            </div>
          </div>

          {/* Minimal content */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Minimal Content</h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
              <div className="max-w-md">
                <Cover
                  id="cover-minimal"
                  title="Новые места"
                  imageUrl="/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png"
                  collectionId="new-places"
                  onClick={() => debugLog('Cover Minimal clicked')}
                />
              </div>
            </div>
          </div>

          {/* Multiple variants */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Multiple Variants</h3>
            <div className="bg-[#F1F1F1] p-4 rounded-lg">
              <div className="space-y-3 max-w-md">
                <Cover
                  id="cover-var-1"
                  title="Веганские рестораны"
                  itemCount={18}
                  imageUrl="/assets/stories/b6cf4c456a85f7e948e7ac6ab6ddc6e6efe96e76.png"
                  collectionId="vegan"
                  onClick={() => debugLog('Cover Vegan clicked')}
                />
                <Cover
                  id="cover-var-2"
                  title="Круглосуточные аптеки"
                  subtitle="Работают 24/7"
                  imageUrl="/assets/stories/f4e2c0e3f51acee018dd3f5c72d9b1a2b46bc227.png"
                  collectionId="24h-pharmacy"
                  onClick={() => debugLog('Cover Pharmacy clicked')}
                />
                <Cover
                  id="cover-var-3"
                  title="Детские развлечения"
                  subtitle="Куда пойти с детьми"
                  itemCount={156}
                  author="Семейный гид"
                  imageUrl="/assets/stories/e5a6e067f14eefc08013c9c9e866cd30e6e74baf.png"
                  collectionId="kids-entertainment"
                  state="Big"
                  onClick={() => debugLog('Cover Kids clicked')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Advice Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Full Advice Section</h2>
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted, #F1F1F1)' }}>
          <AdviceSection
            items={[
              interestingLight,
              interestingDark,
              interestingWithBadge,
              {
                type: 'meta-item',
                id: 'meta-1',
                title: 'Рестораны',
                subtitle: 'Лучшие места для ужина',
                categoryId: 'restaurants',
                searchQuery: 'рестораны рядом',
              },
              {
                type: 'cover',
                id: 'cover-1',
                title: 'Лучшие кофейни Москвы',
                subtitle: 'Где выпить идеальный капучино',
                imageUrl: '/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png',
                collectionId: 'best-coffee',
                itemCount: 25,
                author: '2GIS',
              },
              {
                type: 'rd',
                id: 'rd-section-1',
                advertiserName: 'Geraldine',
                subtitle: 'Необистро',
                images: [
                  '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                  '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                  '/assets/advice/eae313a48883a46e7a2a60ee806e73a8052191be.png',
                ],
                rating: '4.6',
                distance: '1.4 км',
                address: 'Тверская 32/12, БЦ Апельсин, 1 этаж',
                organizationId: 'geraldine',
                isVerified: true,
              },
            ]}
            layout="mixed"
            onItemClick={(item) => debugLog('Item clicked:', item)}
          />
        </div>
      </section>
    </div>
  );
}