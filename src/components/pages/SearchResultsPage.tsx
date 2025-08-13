'use client';

import React from 'react';
import { SearchResultsList } from '@/components/organisms/SearchResultsList';
import type { SearchResultItemProps } from '@/components/molecules/SearchResultItem';
import { debugLog } from '@/lib/logging';

interface SearchResultsPageProps {
  query: string;
  onSelectResult?: (result: SearchResultItemProps) => void;
  className?: string;
}

// Mock data for testing
const mockSearchResults: SearchResultItemProps[] = [
  {
    id: '1',
    title: 'Кофейня "Чашка"',
    description: 'Уютная кофейня с авторскими напитками и десертами',
    category: 'Кафе',
    distance: '250 м',
    rating: 4.8,
    address: 'ул. Ленина, 25',
  },
  {
    id: '2',
    title: 'Ресторан "Сибирская корона"',
    description: 'Традиционная сибирская кухня в современной подаче',
    category: 'Ресторан',
    distance: '1.2 км',
    rating: 4.5,
    address: 'пр. Красный, 45',
  },
  {
    id: '3',
    title: 'Пиццерия "Маргарита"',
    description: 'Итальянская пицца на дровах',
    category: 'Пиццерия',
    distance: '500 м',
    rating: 4.6,
    address: 'ул. Мира, 12',
  },
  {
    id: '4',
    title: 'Столовая №1',
    description: 'Домашняя кухня, бизнес-ланчи',
    category: 'Столовая',
    distance: '300 м',
    rating: 4.2,
    address: 'ул. Советская, 8',
  },
  {
    id: '5',
    title: 'Суши-бар "Токио"',
    description: 'Японская кухня, свежие роллы и суши',
    category: 'Суши-бар',
    distance: '1.5 км',
    rating: 4.7,
    address: 'пр. Карла Маркса, 67',
  },
  {
    id: '6',
    title: 'Бургерная "Black Star"',
    description: 'Авторские бургеры и крафтовое пиво',
    category: 'Бургерная',
    distance: '800 м',
    rating: 4.4,
    address: 'ул. Гоголя, 23',
  },
];

/**
 * SearchResultsPage Component
 * Clean page component using only templates and organisms
 * No direct styling, all composition through atomic design hierarchy
 */
export function SearchResultsPage({
  query,
  onSelectResult,
  className = '',
}: SearchResultsPageProps) {
  // Filter results based on query (mock implementation)
  const filteredResults = query.trim() 
    ? mockSearchResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase()) ||
        result.description?.toLowerCase().includes(query.toLowerCase())
      )
    : mockSearchResults;

  const handleResultClick = (result: SearchResultItemProps) => {
    debugLog('Search result selected:', result);
    onSelectResult?.(result);
  };

  const handleActionClick = (result: SearchResultItemProps) => {
    debugLog('Search result action clicked:', result);
    // Handle navigation or other action
  };

  return (
    <div className={`search-results-page min-h-full ${className}`}>
      <SearchResultsList
        results={filteredResults}
        onResultClick={handleResultClick}
        onActionClick={handleActionClick}
      />
    </div>
  );
}