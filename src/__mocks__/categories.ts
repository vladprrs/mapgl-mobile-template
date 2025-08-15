/**
 * Category definitions for organizations
 * Used for filtering and search functionality
 */

export interface Category {
  id: string;
  name: string;
  icon?: string;
  parentId?: string;
}

export const categories: Category[] = [
  // Food & Dining
  { id: 'food', name: 'Еда и рестораны' },
  { id: 'restaurants', name: 'Рестораны', parentId: 'food' },
  { id: 'cafes', name: 'Кафе', parentId: 'food' },
  { id: 'fast-food', name: 'Быстрое питание', parentId: 'food' },
  { id: 'pizza', name: 'Пиццерии', parentId: 'food' },
  { id: 'japanese', name: 'Японская кухня', parentId: 'food' },
  { id: 'russian', name: 'Русская кухня', parentId: 'food' },
  
  // Shopping
  { id: 'shopping', name: 'Покупки' },
  { id: 'grocery', name: 'Продуктовые магазины', parentId: 'shopping' },
  { id: 'supermarket', name: 'Супермаркеты', parentId: 'shopping' },
  { id: 'electronics', name: 'Электроника', parentId: 'shopping' },
  { id: 'malls', name: 'Торговые центры', parentId: 'shopping' },
  { id: 'department-stores', name: 'Универмаги', parentId: 'shopping' },
  
  // Healthcare
  { id: 'health', name: 'Здоровье' },
  { id: 'hospitals', name: 'Больницы', parentId: 'health' },
  { id: 'clinics', name: 'Клиники', parentId: 'health' },
  { id: 'dentistry', name: 'Стоматология', parentId: 'health' },
  { id: 'laboratories', name: 'Лаборатории', parentId: 'health' },
  { id: 'pharmacies', name: 'Аптеки', parentId: 'health' },
  { id: 'cosmetology', name: 'Косметология', parentId: 'health' },
  
  // Automotive
  { id: 'automotive', name: 'Автомобили' },
  { id: 'car-service', name: 'Автосервисы', parentId: 'automotive' },
  { id: 'car-dealers', name: 'Автосалоны', parentId: 'automotive' },
  { id: 'car-wash', name: 'Автомойки', parentId: 'automotive' },
  { id: 'gas-stations', name: 'АЗС', parentId: 'automotive' },
  
  // Beauty & Wellness
  { id: 'beauty', name: 'Красота' },
  { id: 'beauty-salons', name: 'Салоны красоты', parentId: 'beauty' },
  { id: 'hair-salons', name: 'Парикмахерские', parentId: 'beauty' },
  { id: 'nail-salons', name: 'Ногтевые студии', parentId: 'beauty' },
  { id: 'barbershops', name: 'Барбершопы', parentId: 'beauty' },
  { id: 'spa', name: 'SPA-центры', parentId: 'beauty' },
  
  // Services
  { id: 'services', name: 'Услуги' },
  { id: 'banks', name: 'Банки', parentId: 'services' },
  { id: 'telecom', name: 'Связь', parentId: 'services' },
  { id: 'government', name: 'Госуслуги', parentId: 'services' },
  { id: 'transport', name: 'Транспорт', parentId: 'services' },
  { id: 'taxi', name: 'Такси', parentId: 'services' },
  
  // Entertainment & Culture
  { id: 'entertainment', name: 'Развлечения' },
  { id: 'theatres', name: 'Театры', parentId: 'entertainment' },
  { id: 'cinemas', name: 'Кинотеатры', parentId: 'entertainment' },
  { id: 'museums', name: 'Музеи', parentId: 'entertainment' },
  { id: 'parks', name: 'Парки', parentId: 'entertainment' },
];

/**
 * Get category by ID
 */
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

/**
 * Get subcategories for a parent category
 */
export const getSubcategories = (parentId: string): Category[] => {
  return categories.filter(cat => cat.parentId === parentId);
};

/**
 * Get root categories (no parent)
 */
export const getRootCategories = (): Category[] => {
  return categories.filter(cat => !cat.parentId);
};