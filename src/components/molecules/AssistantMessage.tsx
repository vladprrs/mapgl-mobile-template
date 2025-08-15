'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { StoreRecommendationCard } from '@/components/organisms';
import type { StoreRecommendation } from '@/stores/types';

interface AssistantMessageProps {
  text: string;
  stores?: StoreRecommendation[];
  onProductClick?: (productId: string, storeId: string) => void;
  onOrderClick?: (storeId: string) => void;
}

/**
 * AssistantMessage Molecule
 * 
 * Rich AI assistant message component that can display store recommendations
 * Based on Figma design node-id 357-237859
 * 
 * Features:
 * - Text response from AI assistant
 * - Store cards with gradient backgrounds
 * - Horizontal scrollable product carousels
 * - Interactive product cards and order buttons
 * - Left-aligned assistant styling
 */
export function AssistantMessage({ 
  text, 
  stores, 
  onProductClick, 
  onOrderClick 
}: AssistantMessageProps) {
  return (
    <div className="flex flex-col gap-3 max-w-[80%] mr-auto">
      {/* Assistant text message */}
      <div 
        className="rounded-2xl p-4"
        style={{
          backgroundColor: '#C1E4FF',
          color: tokens.colors.text.primary,
        }}
      >
        <p 
          style={{
            fontFamily: 'SB Sans Text, sans-serif',
            fontSize: '15px',
            lineHeight: '20px',
          }}
        >
          {text}
        </p>
      </div>

      {/* Store recommendations */}
      {stores && stores.length > 0 && (
        <div className="flex flex-col gap-3">
          {stores.map((store) => (
            <StoreRecommendationCard
              key={store.id}
              store={store}
              onProductClick={onProductClick ? (productId) => onProductClick(productId, store.id) : undefined}
              onOrderClick={onOrderClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}