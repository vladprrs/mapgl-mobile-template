'use client';

import React from 'react';
import { CardContainer, Text, Badge, Button, Icon, ICONS, COLORS } from '@/components/atoms';

export interface SearchResultItemProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  distance?: string;
  rating?: number;
  address?: string;
  onClick?: () => void;
  onActionClick?: () => void;
}

/**
 * SearchResultItem Component
 * A clean, flat molecule component for displaying individual search results
 * Composed entirely from atomic components with design tokens
 */
export function SearchResultItem({
  title,
  description,
  category,
  distance,
  rating,
  address,
  onClick,
  onActionClick,
}: SearchResultItemProps) {
  return (
    <div 
      role="article" 
      aria-label={`Search result: ${title}`}
      onClick={onClick}
      className="cursor-pointer"
    >
      <CardContainer
        variant="outlined"
        padding="md"
        radius="lg"
        className="hover:bg-background-tertiary"
      >
      {/* Header with title and category */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <Text size="lg" weight="semibold" className="truncate">
            {title}
          </Text>
          <Badge variant="default" size="sm" className="mt-1">
            {category}
          </Badge>
        </div>
        
        {/* Action button */}
        {onActionClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick();
            }}
            aria-label="Navigate to location"
          >
            <Icon name={ICONS.LOCATION} size={20} color={COLORS.TEXT_PRIMARY} />
          </Button>
        )}
      </div>

      {/* Description */}
      {description && (
        <Text size="sm" color="secondary" className="mb-2 line-clamp-2">
          {description}
        </Text>
      )}

      {/* Metadata row */}
      <div className="flex items-center gap-4 text-sm">
        {rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <Text size="sm" weight="medium">
              {rating.toFixed(1)}
            </Text>
          </div>
        )}
        
        {distance && (
          <Text size="sm" color="secondary">
            {distance}
          </Text>
        )}
        
        {address && (
          <Text size="sm" color="secondary" className="flex-1 truncate">
            {address}
          </Text>
        )}
      </div>
      </CardContainer>
    </div>
  );
}