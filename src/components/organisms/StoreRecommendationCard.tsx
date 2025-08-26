'use client';

import React from 'react';
import { Button, Text, Icon } from '@/components/atoms';
import { StoreHeader, ProductsCarousel } from '@/components/molecules';
import { tokens } from '@/lib/ui/tokens';
import { getRecommendedProducts } from '@/lib/data/products';
import type { StoreRecommendation } from '@/stores/types';

interface StoreRecommendationCardProps {
  store: StoreRecommendation;
  onProductClick?: (productId: string) => void;
  onOrderClick?: (storeId: string) => void;
}

export function StoreRecommendationCard({ 
  store, 
  onProductClick, 
  onOrderClick 
}: StoreRecommendationCardProps) {
  // Get recommended products based on store type
  const storeType = store.id as 'ozon' | 'samokat' | 'mvideo';
  const recommendedProducts = getRecommendedProducts(storeType);
  
  // Transform products to match ProductsCarousel interface
  const carouselProducts = recommendedProducts.map(product => ({
    id: product.id,
    image: product.image,
    title: product.title,
    price: product.price,
    oldPrice: product.oldPrice,
    type: 'product' as const
  }));

  const handleOrderClick = () => {
    if (onOrderClick) {
      onOrderClick(store.id);
    }
  };

  const handleMoreClick = () => {
    // Could open store details or show more products
  };

  // Customize button color based on store
  const getButtonColor = () => {
    switch (store.id) {
      case 'ozon':
        return '#005BFF'; // Ozon blue
      case 'samokat':
        return '#FF6B00'; // Samokat orange
      case 'mvideo':
        return '#E31235'; // MVideo red
      default:
        return '#8257FD'; // Default purple
    }
  };

  // Customize button text based on store
  const getButtonText = () => {
    switch (store.id) {
      case 'ozon':
        return 'Заказать на Ozon';
      case 'samokat':
        return 'Заказать в Самокат';
      case 'mvideo':
        return 'Купить в МВидео';
      default:
        return 'Заказать заказ';
    }
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        border: '1px solid rgba(137,137,137,0.3)',
        borderRadius: tokens.borders.radius.lg, // 12px
        background: store.gradient,
        position: 'relative',
      }}
    >
      {/* Store Header */}
      <StoreHeader
        name={store.name}
        images={store.images}
        deliveryTime={store.deliveryTime}
        rating={store.rating}
        rideTime={store.rideTime}
        hasAward={store.hasAward}
        storeId={store.id}
      />
      
      {/* Products Carousel */}
      <ProductsCarousel
        products={carouselProducts}
        onProductClick={onProductClick}
      />
      
      {/* Description */}
      <div style={{ padding: tokens.spacing[2] }}>
        <Text
          className="leading-[18px] mb-3"
          style={{
            fontSize: '14px',
            fontWeight: 400, // Regular
            color: tokens.colors.text.primary,
          }}
        >
          {store.description}
        </Text>
        
        {/* Action Buttons Row */}
        <div className="flex items-center gap-2">
          {/* Order Button */}
          <Button
            onClick={handleOrderClick}
            className="flex-1"
            style={{
              backgroundColor: getButtonColor(),
              color: 'white',
              border: 'none',
              borderRadius: tokens.borders.radius.md, // 8px
              padding: `${tokens.spacing[2]}px ${tokens.spacing[4]}px`, // 8px 16px
              fontSize: '16px',
              fontWeight: 500, // Medium
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {getButtonText()}
          </Button>
          
          {/* More Options Button */}
          <button
            onClick={handleMoreClick}
            className="flex items-center justify-center active:scale-95 transition-transform"
            style={{
              backgroundColor: 'rgba(20,20,20,0.06)',
              border: 'none',
              borderRadius: tokens.borders.radius.md, // 8px
              width: '40px',
              height: '40px',
              cursor: 'pointer',
            }}
          >
            <Icon 
              name="menu"
              size={16}
              color={tokens.colors.text.primary}
            />
          </button>
        </div>
      </div>
    </div>
  );
}