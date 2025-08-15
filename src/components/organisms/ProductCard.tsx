'use client';

import React from 'react';
import { ProductImage } from '@/components/atoms/ProductImage';
import { AddToCartButton } from '@/components/molecules/AddToCartButton';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  weight?: string;
  quantity?: number;
  onAddToCart?: () => void;
  onUpdateQuantity?: (quantity: number) => void;
}

export function ProductCard({
  id,
  image,
  title,
  price,
  oldPrice,
  quantity = 0,
  onAddToCart = () => {},
  onUpdateQuantity = () => {}
}: ProductCardProps) {
  // Determine button state based on quantity
  const getButtonState = () => {
    if (quantity > 0) return 'added';
    if (oldPrice) return 'discount';
    return 'default';
  };

  const handleAdd = () => {
    if (quantity === 0) {
      onAddToCart();
    } else {
      // Increment quantity
      onUpdateQuantity(quantity + 1);
    }
  };

  const handleRemove = () => {
    if (quantity > 0) {
      onUpdateQuantity(quantity - 1);
    }
  };
  
  console.log('ProductCard rendering:', { id, image, title, price, oldPrice, quantity });
  
  // Placeholder image if image doesn't exist
  const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="142" height="142" fill="%23f1f1f1"%3E%3Crect width="142" height="142" /%3E%3Ctext x="71" y="71" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="12" fill="%23898989"%3ENo Image%3C/text%3E%3C/svg%3E';
  
  return (
    <div className="flex flex-col w-[142px]" data-testid={`product-card-${id}`}>
      <ProductImage 
        src={image || PLACEHOLDER} 
        alt={title} 
        size={142} 
      />
      
      <div className="pt-1.5 pb-0.5">
        <p 
          className="text-[14px] leading-[18px] text-[#141414] overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontFamily: 'SB Sans Text, sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.28px',
          }}
        >
          {title}
        </p>
      </div>
      
      <div className="pt-2">
        <AddToCartButton
          price={price}
          oldPrice={oldPrice}
          quantity={quantity}
          state={getButtonState()}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}