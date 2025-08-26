import productsData from '../../../products.json';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  url: string;
  category?: string;
  weight?: string;
}

export type ProductCategory = 'swimming' | 'fitness' | 'nutrition' | 'outdoor' | 'home' | 'electronics' | 'other';

// Transform raw product data to our interface
export function transformProduct(rawProduct: typeof productsData[0], index: number): Product {
  // Generate ID from URL slug or fallback to index
  const id = rawProduct.url ? rawProduct.url.split('/').pop() || `product-${index}` : `product-${index}`;
  
  return {
    id,
    title: rawProduct.name,
    image: rawProduct.image,
    price: parseInt(rawProduct.price.current, 10),
    oldPrice: rawProduct.price.old ? parseInt(rawProduct.price.old, 10) : undefined,
    url: rawProduct.url,
    category: categorizeProduct(rawProduct.name),
    weight: extractWeight(rawProduct.name)
  };
}

// Categorize products based on their names
export function categorizeProduct(productName: string): ProductCategory {
  const name = productName.toLowerCase();
  
  if (name.includes('плавани') || name.includes('очки') || name.includes('шапочка') || 
      name.includes('sup') || name.includes('доска') || name.includes('ласты')) {
    return 'swimming';
  }
  
  if (name.includes('фитнес') || name.includes('спорт') || name.includes('гант') || 
      name.includes('штанга') || name.includes('коврик') || name.includes('тренаж')) {
    return 'fitness';
  }
  
  if (name.includes('витамин') || name.includes('протеин') || name.includes('питьев') || 
      name.includes('гель') || name.includes('добавка') || name.includes('коллаген')) {
    return 'nutrition';
  }
  
  if (name.includes('надувн') || name.includes('палатка') || name.includes('рюкзак') || 
      name.includes('велосипед') || name.includes('самокат')) {
    return 'outdoor';
  }
  
  if (name.includes('дом') || name.includes('кухн') || name.includes('быт')) {
    return 'home';
  }
  
  if (name.includes('электр') || name.includes('компьютер') || name.includes('телефон')) {
    return 'electronics';
  }
  
  return 'other';
}

// Extract weight/specification from product name
export function extractWeight(productName: string): string {
  const weightMatches = productName.match(/(\d+(?:\.\d+)?\s*(?:г|кг|мл|л|см|мм|шт))/i);
  if (weightMatches) {
    return weightMatches[1];
  }
  
  // Check for "1 шт." pattern
  if (productName.includes('1 шт')) {
    return '1 шт.';
  }
  
  return '60 г'; // Default weight
}

// Get all products transformed
export function getAllProducts(): Product[] {
  return productsData.map((product, index) => transformProduct(product, index));
}

// Get products for carousel (first 10 from swimming/water sports category)
export function getCarouselProducts(): Product[] {
  const allProducts = getAllProducts();
  const swimmingProducts = allProducts.filter(p => p.category === 'swimming');
  
  // If we don't have enough swimming products, supplement with other categories
  if (swimmingProducts.length < 10) {
    const otherProducts = allProducts.filter(p => p.category !== 'swimming');
    return [...swimmingProducts, ...otherProducts].slice(0, 10);
  }
  
  return swimmingProducts.slice(0, 10);
}

// Get products by category for SamokatProductsPage
export function getCategoryProducts(category: ProductCategory): Product[] {
  const allProducts = getAllProducts();
  return allProducts.filter(p => p.category === category);
}

// Get category products by search query
export function getProductsBySearchQuery(searchQuery: string): Product[] {
  const query = searchQuery.toLowerCase();
  const allProducts = getAllProducts();
  
  // Map search queries to categories
  if (query.includes('фитнес') || query.includes('спорт') || query.includes('тренировк')) {
    return getCategoryProducts('fitness');
  }
  
  if (query.includes('плавани') || query.includes('вод') || query.includes('басейн')) {
    return getCategoryProducts('swimming');
  }
  
  if (query.includes('витамин') || query.includes('питани') || query.includes('здоров')) {
    return getCategoryProducts('nutrition');
  }
  
  if (query.includes('дом') || query.includes('быт')) {
    return getCategoryProducts('home');
  }
  
  // Default to showing all products
  return allProducts.slice(0, 20);
}

// Get recommended products for AI assistant (3-4 products per store)
export function getRecommendedProducts(storeType: 'ozon' | 'samokat' | 'mvideo' = 'samokat'): Product[] {
  switch (storeType) {
    case 'ozon':
      // Electronics and home products for Ozon
      return [...getCategoryProducts('electronics'), ...getCategoryProducts('home')].slice(0, 4);
      
    case 'mvideo':
      // Electronics for MVideo
      return getCategoryProducts('electronics').slice(0, 4);
      
    case 'samokat':
    default:
      // Fitness and nutrition for Samokat
      return [...getCategoryProducts('fitness'), ...getCategoryProducts('nutrition')].slice(0, 4);
  }
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  const allProducts = getAllProducts();
  return allProducts.find(p => p.id === id);
}

// Export types and constants
export const PRODUCT_CATEGORIES: ProductCategory[] = ['swimming', 'fitness', 'nutrition', 'outdoor', 'home', 'electronics', 'other'];