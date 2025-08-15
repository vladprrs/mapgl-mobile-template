import { allOrganizations } from '../organizations';
import { SuggestType } from '@/components/molecules/SuggestRow';
import { 
  productAliases, 
  getMatchingCategories, 
  categoryDisplayNames as productCategoryDisplayNames 
} from './productAliases';

/**
 * Comprehensive search suggestions system
 * Generates suggestions from all mocked organizations
 */

// Suggestion types
export interface OrganizationSuggestion {
  id: string;
  type: 'organization';
  text: string;
  subtitle: string;
  category: string;
  organizationId: string;
  coordinates?: [number, number];
}

export interface CategorySuggestion {
  id: string;
  type: 'category';
  text: string;
  subtitle: string;
  category: string;
  count: number;
}

export interface ChainSuggestion {
  id: string;
  type: 'chain';
  text: string;
  subtitle: string;
  category: string;
  organizationIds: string[];
  count: number;
}

export interface HistorySuggestion {
  id: string;
  type: 'history';
  text: string;
  subtitle?: string;
  category: string;
}

export interface ProductSuggestion {
  id: string;
  type: 'product';
  text: string;
  subtitle: string;
  category: string;
  productCategories: string[];
  count: number;
}

export type SearchSuggestion = OrganizationSuggestion | CategorySuggestion | ChainSuggestion | HistorySuggestion | ProductSuggestion;

// Legacy suggestion types for backwards compatibility
export interface SavedAddressSuggestion {
  type: SuggestType.SAVED_ADDRESS;
  title: string;
  subtitle: string;
  distance: string;
  icon: 'home' | 'work';
}

export interface LegacyOrganizationSuggestion {
  type: SuggestType.ORGANIZATION;
  title: string;
  subtitle: string;
  highlightedText: string;
}

export interface LegacyCategorySuggestion {
  type: SuggestType.CATEGORY;
  title: string;
  branchCount: string;
  highlightedText: string;
}

export type LegacySearchSuggestion = SavedAddressSuggestion | LegacyOrganizationSuggestion | LegacyCategorySuggestion;

// Category display names in Russian
const categoryNames: Record<string, string> = {
  'Продуктовый магазин': 'Продуктовые магазины',
  'Продуктовый магазин здорового питания': 'Магазины здорового питания',
  'Супермаркет': 'Супермаркеты',
  'Магазин цифровой техники': 'Магазины электроники',
  'Магазин бытовой техники': 'Бытовая техника',
  'Компьютерный магазин': 'Компьютерные магазины',
  'Ресторан европейской кухни': 'Рестораны',
  'Пиццерия': 'Пиццерии',
  'Кофейня': 'Кофейни',
  'Кафе': 'Кафе',
  'Медицинская лаборатория': 'Медицинские услуги',
  'Стоматологическая клиника': 'Стоматология',
  'Многопрофильная клиника': 'Клиники',
  'Салон красоты': 'Салоны красоты',
  'Массажный салон': 'Массажные салоны',
  'Автосервис': 'Автосервисы',
  'Шиномонтаж': 'Шиномонтаж',
  'Автомойка': 'Автомойки',
};

// Get display name for category
function getCategoryDisplayName(category: string): string {
  return categoryNames[category] || category;
}

// Count organizations in category
function countInCategory(category: string): number {
  return allOrganizations.filter(org => org.category === category).length;
}

// Extract chains (organizations with same name but different addresses)
function getChains(organizations: typeof allOrganizations) {
  const chainMap = new Map<string, { name: string; ids: string[]; count: number }>();
  
  organizations.forEach(org => {
    const existingChain = chainMap.get(org.name);
    if (existingChain) {
      existingChain.ids.push(org.id);
      existingChain.count++;
    } else {
      chainMap.set(org.name, {
        name: org.name,
        ids: [org.id],
        count: 1
      });
    }
  });
  
  // Return only chains with multiple locations
  return Array.from(chainMap.values()).filter(chain => chain.count > 1);
}

// Generate comprehensive suggestions from all organizations
export const generateSuggestions = (): SearchSuggestion[] => {
  const suggestions: SearchSuggestion[] = [];
  
  // 1. Organization names as suggestions
  allOrganizations.forEach(org => {
    suggestions.push({
      id: `org-${org.id}`,
      type: 'organization',
      text: org.name,
      subtitle: org.address,
      category: org.category,
      organizationId: org.id,
      coordinates: org.coordinates
    });
  });
  
  // 2. Category suggestions (unique categories)
  const categories = [...new Set(allOrganizations.map(o => o.category))];
  categories.forEach(cat => {
    const count = countInCategory(cat);
    suggestions.push({
      id: `cat-${cat.replace(/\s+/g, '-').toLowerCase()}`,
      type: 'category',
      text: getCategoryDisplayName(cat),
      subtitle: `${count} ${count === 1 ? 'место' : count < 5 ? 'места' : 'мест'}`,
      category: cat,
      count
    });
  });
  
  // 3. Chain/brand suggestions (for chains with multiple branches)
  const chains = getChains(allOrganizations);
  chains.forEach(chain => {
    // Get the category from the first organization in the chain
    const firstOrg = allOrganizations.find(org => org.id === chain.ids[0]);
    const category = firstOrg?.category || '';
    
    suggestions.push({
      id: `chain-${chain.name.replace(/\s+/g, '-').toLowerCase()}`,
      type: 'chain',
      text: chain.name,
      subtitle: `Сеть, ${chain.count} ${chain.count < 5 ? 'филиала' : 'филиалов'}`,
      category,
      organizationIds: chain.ids,
      count: chain.count
    });
  });
  
  // 4. Product suggestions (popular products from aliases)
  const popularProducts = [
    'молоко', 'хлеб', 'мясо', 'телевизор', 'холодильник', 'перфоратор', 
    'врач', 'стрижка', 'маникюр', 'шиномонтаж', 'пицца', 'кофе'
  ];
  
  popularProducts.forEach(product => {
    const matchedCategories = getMatchingCategories(product);
    if (matchedCategories.length > 0) {
      // Count organizations that would match this product search
      const count = allOrganizations.filter(org => {
        return matchedCategories.some(cat => {
          const orgCategoriesForProduct = productCategoryDisplayNames[cat] ? 
            Object.entries(productCategoryDisplayNames).find(([, display]) => display === productCategoryDisplayNames[cat]) : null;
          return orgCategoriesForProduct ? 
            org.category.includes(orgCategoriesForProduct[0]) : false;
        });
      }).length;
      
      if (count > 0) {
        suggestions.push({
          id: `product-${product}`,
          type: 'product',
          text: product,
          subtitle: `Найти магазины с товаром "${product}"`,
          category: 'product_search',
          productCategories: matchedCategories,
          count
        });
      }
    }
  });
  
  return suggestions;
};

// Smart suggestion matching with synonyms
export const getSuggestions = (query: string): SearchSuggestion[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase().trim();
  const allSuggestions = generateSuggestions();
  
  // Common search terms and their category mappings
  const synonyms: Record<string, string[]> = {
    'еда': ['ресторан', 'кафе', 'пицца', 'кофе'],
    'магазин': ['продуктовый', 'супермаркет', 'электроника', 'техника'],
    'врач': ['медицин', 'клиника', 'стоматолог', 'лаборатория'],
    'красота': ['салон красоты', 'массаж', 'спа'],
    'авто': ['автосервис', 'шиномонтаж', 'автомойка'],
    'продукты': ['продуктовый', 'супермаркет', 'пятёрочка', 'магнит'],
    'техника': ['электроника', 'цифровой', 'компьютер', 'бытовая'],
    'ремонт': ['автосервис', 'сервис'],
    'здоровье': ['медицин', 'клиника', 'врач'],
    'покупки': ['магазин', 'супермаркет', 'торговый']
  };
  
  return allSuggestions.filter(suggestion => {
    // Direct text match
    if (suggestion.text.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Category match
    if (suggestion.category && suggestion.category.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Subtitle match (for addresses)
    if ('subtitle' in suggestion && suggestion.subtitle && suggestion.subtitle.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Synonym matching
    for (const [term, categories] of Object.entries(synonyms)) {
      if (lowerQuery.includes(term)) {
        const categoryLower = suggestion.category.toLowerCase();
        if (categories.some(cat => categoryLower.includes(cat))) {
          return true;
        }
      }
    }
    
    // Chain name partial matching (e.g., "пятер" → "Пятёрочка")
    if (suggestion.type === 'chain' || suggestion.type === 'organization') {
      const textLower = suggestion.text.toLowerCase();
      // More flexible matching for chain names
      if (lowerQuery.length >= 3) {
        const queryChars = lowerQuery.split('');
        let matchCount = 0;
        let lastIndex = -1;
        
        for (const char of queryChars) {
          const index = textLower.indexOf(char, lastIndex + 1);
          if (index !== -1) {
            matchCount++;
            lastIndex = index;
          }
        }
        
        // If most characters match in sequence, consider it a match
        if (matchCount >= Math.min(3, queryChars.length)) {
          return true;
        }
      }
    }
    
    // Product matching - check if query matches any product
    if (suggestion.type === 'product') {
      const matchedCategories = getMatchingCategories(lowerQuery);
      if (matchedCategories.length > 0) {
        // Check if this product suggestion is relevant to the query
        return suggestion.productCategories.some(cat => matchedCategories.includes(cat));
      }
    }
    
    // Enhanced product search - suggest products for partial matches
    const matchedProductCategories = getMatchingCategories(lowerQuery);
    if (matchedProductCategories.length > 0 && suggestion.type === 'product') {
      return suggestion.productCategories.some(cat => matchedProductCategories.includes(cat));
    }
    
    return false;
  }).slice(0, 10); // Limit to top 10 suggestions
};

// Default suggestions for empty search
export const getDefaultSuggestions = (): SearchSuggestion[] => {
  const allSuggestions = generateSuggestions();
  
  // Prioritize popular chains and categories
  const popularChains = allSuggestions.filter(s => 
    s.type === 'chain' && ['Пятёрочка', 'Магнит', 'ВкусВилл'].includes(s.text)
  );
  
  const popularCategories = allSuggestions.filter(s =>
    s.type === 'category' && s.text.includes('Продуктовые')
  );
  
  return [...popularChains, ...popularCategories].slice(0, 5);
};

// Legacy mock data for backwards compatibility
export const mockSavedAddresses: SavedAddressSuggestion[] = [
  {
    type: SuggestType.SAVED_ADDRESS,
    title: 'Дом',
    subtitle: 'Красный проспект, 49',
    distance: '5 км',
    icon: 'home',
  },
  {
    type: SuggestType.SAVED_ADDRESS,
    title: 'Работа',
    subtitle: 'Октябрьская, 42',
    distance: '12 км',
    icon: 'work',
  },
];

export const mockOrganizations: LegacyOrganizationSuggestion[] = [
  {
    type: SuggestType.ORGANIZATION,
    title: 'МЕСТО, инвест-апарты',
    subtitle: 'Красный проспект, 49',
    highlightedText: 'МЕС',
  },
  {
    type: SuggestType.ORGANIZATION,
    title: 'Место встречи, кафе',
    subtitle: 'Ленина, 21',
    highlightedText: 'Мес',
  },
];

export const mockCategories: LegacyCategorySuggestion[] = [
  {
    type: SuggestType.CATEGORY,
    title: 'Аквапарки/Водные аттракционы',
    branchCount: '6 филиалов',
    highlightedText: 'Места отдыха',
  },
  {
    type: SuggestType.CATEGORY,
    title: 'Рестораны',
    branchCount: '124 филиала',
    highlightedText: '',
  },
];

export const mockAllSuggestions: LegacySearchSuggestion[] = [
  ...mockSavedAddresses,
  ...mockOrganizations,
  ...mockCategories,
];

// Helper functions for backwards compatibility
export const emptySuggestions: LegacySearchSuggestion[] = [];
export const onlySavedAddresses: LegacySearchSuggestion[] = mockSavedAddresses;
export const onlyOrganizations: LegacySearchSuggestion[] = mockOrganizations;
export const onlyCategories: LegacySearchSuggestion[] = mockCategories;

export function filterSuggestions(query: string, suggestions: LegacySearchSuggestion[] = mockAllSuggestions): LegacySearchSuggestion[] {
  if (!query) {
    return mockSavedAddresses;
  }
  
  const lowerQuery = query.toLowerCase();
  return suggestions.filter(s => {
    if ('subtitle' in s && s.subtitle) {
      return s.title.toLowerCase().includes(lowerQuery) || 
             s.subtitle.toLowerCase().includes(lowerQuery);
    }
    return s.title.toLowerCase().includes(lowerQuery);
  });
}