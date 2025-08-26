export interface SamokatProduct {
  id: string;
  name: string;
  specification: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: 'fitness' | 'grocery' | 'household';
}

export const samokatProducts: SamokatProduct[] = [
  // Fitness products
  {
    id: 'samokat-fitness-1',
    name: 'Штанга Barfits 10 кг',
    specification: '2 блина по 5 кг',
    price: 120,
    oldPrice: 150,
    image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
    category: 'fitness'
  },
  {
    id: 'samokat-fitness-2',
    name: 'Гантели виниловые 2 кг',
    specification: 'Пара, покрытие винил',
    price: 89,
    oldPrice: 119,
    image: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
    category: 'fitness'
  },
  {
    id: 'samokat-fitness-3',
    name: 'Коврик для йоги',
    specification: '173×61×0.4 см',
    price: 59,
    image: '/assets/figma/products/yoga-mat.png',
    category: 'fitness'
  },
  {
    id: 'samokat-fitness-4',
    name: 'Фитбол 65 см',
    specification: 'С насосом',
    price: 79,
    oldPrice: 99,
    image: '/assets/figma/products/fitball.png',
    category: 'fitness'
  },
  {
    id: 'samokat-fitness-5',
    name: 'Эспандер кистевой',
    specification: '20 кг нагрузка',
    price: 19,
    image: '/assets/figma/products/expander.png',
    category: 'fitness'
  },
  {
    id: 'samokat-fitness-6',
    name: 'Скакалка скоростная',
    specification: 'Регулируемая длина',
    price: 39,
    oldPrice: 49,
    image: '/assets/figma/products/jump-rope.png',
    category: 'fitness'
  },
  // Grocery products mixed in
  {
    id: 'samokat-grocery-1',
    name: 'Протеиновый батончик',
    specification: '60 г, шоколад',
    price: 9,
    image: '/assets/figma/products/protein-bar.png',
    category: 'grocery'
  },
  {
    id: 'samokat-grocery-2',
    name: 'Вода минеральная',
    specification: '1.5 л, негазированная',
    price: 4,
    image: '/assets/figma/products/water.png',
    category: 'grocery'
  },
  {
    id: 'samokat-fitness-7',
    name: 'Резинки для фитнеса',
    specification: 'Набор 3 шт',
    price: 49,
    oldPrice: 69,
    image: '/assets/figma/products/resistance-bands.png',
    category: 'fitness'
  },
  {
    id: 'samokat-fitness-8',
    name: 'Утяжелители для ног',
    specification: '2×1 кг',
    price: 69,
    image: '/assets/figma/products/ankle-weights.png',
    category: 'fitness'
  }
];

export function getProductsByCategory(category?: 'fitness' | 'grocery' | 'household'): SamokatProduct[] {
  if (!category) return samokatProducts;
  return samokatProducts.filter(p => p.category === category);
}

export function getProductById(id: string): SamokatProduct | undefined {
  return samokatProducts.find(p => p.id === id);
}