import type { Story } from '@/components/organisms/StoriesPanel';
import type { SearchResult } from '@/__mocks__/search/results';
import type { AdviceItem } from '@/__mocks__/advice/types';

/**
 * Generator functions for creating dynamic mock data
 * Use these for performance testing or when you need large datasets
 */

/**
 * Generate mock stories with random viewed states
 */
export function generateMockStories(count: number, viewedRatio = 0.3): Story[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `story-${i}`,
    imageUrl: `/assets/stories/story${(i % 5) + 1}.png`,
    label: `Story ${i + 1}`,
    isViewed: Math.random() < viewedRatio,
  }));
}

/**
 * Generate mock map markers within Moscow bounds
 */
export function generateMockMarkers(count: number) {
  const moscowBounds = {
    minLng: 37.3,
    maxLng: 37.9,
    minLat: 55.5,
    maxLat: 55.9,
  };
  
  return Array.from({ length: count }, (_, i) => ({
    id: `marker-${i}`,
    coordinates: [
      moscowBounds.minLng + Math.random() * (moscowBounds.maxLng - moscowBounds.minLng),
      moscowBounds.minLat + Math.random() * (moscowBounds.maxLat - moscowBounds.minLat),
    ],
    title: `Location ${i + 1}`,
    type: ['restaurant', 'cafe', 'shop', 'pharmacy', 'clinic'][i % 5],
  }));
}

/**
 * Generate mock search results
 */
export function generateMockSearchResults(count: number): SearchResult[] {
  const types = ['Ресторан', 'Кафе', 'Магазин', 'Аптека', 'Клиника'];
  const streets = ['Тверская', 'Арбат', 'Никольская', 'Петровка', 'Мясницкая'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `result-${i}`,
    name: `${types[i % types.length]} №${i + 1}`,
    category: `${types[i % types.length]}`,
    address: `ул. ${streets[i % streets.length]}, ${(i % 100) + 1}`,
    distance: `${(Math.random() * 5).toFixed(1)} км`,
    rating: Number((3 + Math.random() * 2).toFixed(1)),
  }));
}

/**
 * Generate mock advice items
 */
export function generateMockAdviceItems(count: number): AdviceItem[] {
  const types: AdviceItem['type'][] = ['meta-item', 'cover', 'interesting', 'rd', 'meta-item-ad'];
  const titles = ['Аптеки', 'Рестораны', 'Кафе', 'Магазины', 'Парки'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    const baseItem = {
      id: `advice-${i}`,
      theme: 'Light' as const,
    };
    
    switch (type) {
      case 'meta-item':
        return {
          ...baseItem,
          type,
          title: titles[i % titles.length],
          subtitle: `${Math.floor(Math.random() * 1000)} мест`,
          iconUrl: `/assets/advice/icon-${i}.svg`,
          categoryId: `category-${i}`,
          searchQuery: titles[i % titles.length].toLowerCase(),
        };
      case 'cover':
        return {
          ...baseItem,
          type,
          title: `Подборка ${i + 1}`,
          imageUrl: `/assets/advice/cover-${i}.png`,
          collectionId: `collection-${i}`,
          itemCount: Math.floor(Math.random() * 50) + 5,
          state: 'Default',
        };
      case 'interesting':
        return {
          ...baseItem,
          type,
          title: `Интересное ${i + 1}`,
          description: `${Math.floor(Math.random() * 100)} подборок`,
          imageUrl: `/assets/advice/interesting-${i}.png`,
          featureId: `feature-${i}`,
        };
      case 'rd':
        return {
          ...baseItem,
          type,
          advertiserName: `Заведение ${i + 1}`,
          subtitle: 'Ресторан',
          images: [`/assets/advice/rd-${i}-1.png`, `/assets/advice/rd-${i}-2.png`],
          rating: (3 + Math.random() * 2).toFixed(1),
          distance: `${(Math.random() * 5).toFixed(1)} км`,
          address: `Улица ${i + 1}, дом ${(i % 50) + 1}`,
          establishmentIds: [`establishment-${i}`],
          organizationId: `org-${i}`,
          isVerified: Math.random() > 0.5,
        };
      case 'meta-item-ad':
        return {
          ...baseItem,
          type,
          title: `Реклама ${i + 1}`,
          logoUrl: `/assets/advice/ad-logo-${i}.png`,
          gradientColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          gradientMaskUrl: `/assets/advice/gradient-mask.svg`,
          searchPhrase: `ad-${i}`,
          advertiserId: `advertiser-${i}`,
          isSponsored: true,
        };
      default:
        return baseItem as AdviceItem;
    }
  });
}

/**
 * Generate random Russian street names
 */
export function generateStreetName(): string {
  const streets = [
    'Тверская', 'Арбат', 'Никольская', 'Петровка', 'Мясницкая',
    'Большая Дмитровка', 'Малая Дмитровка', 'Пречистенка', 'Остоженка',
    'Большая Ордынка', 'Малая Ордынка', 'Пятницкая', 'Большая Полянка',
  ];
  return streets[Math.floor(Math.random() * streets.length)];
}

/**
 * Generate random coordinates within a city
 */
export function generateCoordinates(
  center: [number, number] = [37.618423, 55.751244],
  radius = 0.05
): [number, number] {
  const angle = Math.random() * 2 * Math.PI;
  const r = Math.random() * radius;
  return [
    center[0] + r * Math.cos(angle),
    center[1] + r * Math.sin(angle),
  ];
}