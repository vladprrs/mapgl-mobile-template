'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  id: string;
  name: string;
  specification: string;
  price: number;
  oldPrice?: number;
  image: string;
  onAddToCart?: (id: string) => void;
  initialQuantity?: number;
}

/**
 * ProductCard Molecule
 * Based on Figma node-id 430-248630
 * 
 * Features:
 * - Square product image (171x171px)
 * - Product name with 2-line ellipsis
 * - Specification text
 * - Price button with strikethrough old price
 * - Quantity controls after first add
 */
export function ProductCard({
  id,
  name,
  specification,
  price,
  oldPrice,
  image,
  onAddToCart,
  initialQuantity = 0
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  const handleRemove = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
  };

  // Determine button state based on quantity and discount
  const getButtonState = () => {
    if (quantity > 0) return 'added';
    return oldPrice && oldPrice > price ? 'discount' : 'default';
  };

  return (
    <div 
      className="flex flex-col"
      style={{
        width: '171px',
      }}
    >
      {/* Product Image */}
      <div 
        className="relative overflow-hidden mb-2"
        style={{
          width: '171px',
          height: '171px',
          borderRadius: tokens.borders.radius.lg, // rounded-xl (12px)
          backgroundColor: tokens.colors.background.secondary,
        }}
      >
        <Image
          src={image}
          alt={name}
          width={171}
          height={171}
          className="object-cover w-full h-full"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        {/* Product Name */}
        <h3
          className="line-clamp-2"
          style={{
            fontSize: '11px',
            fontWeight: 600, // semibold
            color: '#595959',
            lineHeight: '14px',
            fontFamily: 'SB Sans Text, sans-serif',
            minHeight: '28px', // Ensures consistent height for 2 lines
          }}
        >
          {name}
        </h3>

        {/* Specification */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 400,
            color: '#A6A6A6',
            lineHeight: '14px',
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          {specification}
        </p>
      </div>

      {/* Unified Add to Cart Button */}
      <div className="mt-2">
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