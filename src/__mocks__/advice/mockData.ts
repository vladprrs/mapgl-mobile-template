import type { AdviceItem } from '@/components/dashboard/advice/types';

/**
 * Real data from Figma mockup for advice components
 * Extracted from Figma node 162-220899
 */
export const mockAdviceItems: AdviceItem[] = [
  // Left column items
  {
    type: 'interesting',
    id: 'guide-city',
    title: 'Гид по городу',
    description: '37 подборок',
    imageUrl: '/assets/advice/b84cad0c5a3abfaa17c4ee4fbc61536ad9c33781.png',
    featureId: 'city-guide',
    theme: 'Light',
  },
  {
    type: 'meta-item',
    id: 'sunday-brunch',
    title: 'Воскресные бранчи',
    subtitle: '156 мест',
    iconUrl: '/assets/advice/c5443c9b0d39ee0d86a9a663a17b3f2cc5c05af0.svg',
    categoryId: 'brunch',
    searchQuery: 'воскресные бранчи',
    theme: 'Light',
  },
  {
    type: 'meta-item',
    id: 'atm',
    title: 'Банкоматы',
    subtitle: 'Number',
    iconUrl: '/assets/advice/5bbd729c4d66ffe9605baf28fedce95010a165cf.svg',
    categoryId: 'atm',
    searchQuery: 'банкоматы',
    theme: 'Light',
  },
  {
    type: 'cover',
    id: 'repair-goods',
    title: 'Товары для ремонта',
    imageUrl: '/assets/advice/4295bcc0ff3c5fd0b0b5cfe36d50701084688dc5.png',
    collectionId: 'repair-goods',
    itemCount: 13,
    state: 'Default',
  },
  
  // Right column items
  {
    type: 'meta-item-ad',
    id: 'xiaomi-ad',
    title: 'Xiaomi',
    logoUrl: '/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png',
    gradientColor: '#EB6100',
    gradientMaskUrl: '/assets/advice/a81e514928dac622f5cd9e79d6ae0c85e8041eda.svg',
    searchPhrase: 'xiaomi',
    advertiserId: 'xiaomi-corp',
    theme: 'Light',
    isSponsored: true,
  },
  {
    type: 'meta-item',
    id: 'school-uniform',
    title: 'Школьная форма',
    subtitle: '112 мест',
    iconUrl: '/assets/advice/58b4c95e38b9410447b0d379c29667cb42194242.svg',
    categoryId: 'school-uniform',
    searchQuery: 'школьная форма',
    theme: 'Light',
  },
  {
    type: 'rd',
    id: 'geraldine',
    advertiserName: 'Geraldine',
    subtitle: 'Необистро',
    images: [
      '/assets/advice/f24b81b9f69b94fda4e5da97e97749387406ae95.png',
      '/assets/advice/1b05043773971df7e57c1383b3943d78bf6b5aff.png',
    ],
    rating: '4.6',
    distance: '1.4 км',
    address: 'Тверская 32/12, БЦ Апельсин, 1 этаж',
    establishmentIds: ['geraldine-tverskaya'],
    organizationId: 'geraldine-corp',
    theme: 'Light',
    isVerified: true,
  },
  {
    type: 'meta-item',
    id: 'all-categories',
    title: 'Все рубрики',
    subtitle: '3 256 567 мест',
    iconUrl: '/assets/advice/83921c4741ea1c0c421d5b412bf28d8175ca6c61.svg',
    categoryId: 'all',
    searchQuery: '',
    theme: 'Light',
  },
];

export function getFigmaLayoutItems(): {
  leftColumn: AdviceItem[];
  rightColumn: AdviceItem[];
} {
  return {
    leftColumn: [
      mockAdviceItems[0],
      mockAdviceItems[1],
      mockAdviceItems[2],
      mockAdviceItems[3],
    ],
    rightColumn: [
      mockAdviceItems[4],
      mockAdviceItems[5],
      mockAdviceItems[6],
      mockAdviceItems[7],
    ],
  };
}

export function getMixedLayoutItems(): AdviceItem[] {
  return mockAdviceItems;
}


