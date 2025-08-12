import type { AdviceItem } from '@/components/dashboard/advice/types';

/**
 * Mock MetaItem components for category/rubric search cards
 * Extracted from Figma design mockups
 */

export const mockMetaItems: AdviceItem[] = [
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

export const mockMetaItemDark: AdviceItem = {
  type: 'meta-item',
  id: 'pharmacy-dark',
  title: 'Аптеки',
  subtitle: '1234 места',
  iconUrl: '/assets/advice/pharmacy-icon.svg',
  categoryId: 'pharmacy',
  searchQuery: 'аптеки',
  theme: 'Dark',
};

// Export different states for testing
export const emptyMetaItems: AdviceItem[] = [];
export const singleMetaItem: AdviceItem[] = [mockMetaItems[0]];
export const multipleMetaItems: AdviceItem[] = mockMetaItems;