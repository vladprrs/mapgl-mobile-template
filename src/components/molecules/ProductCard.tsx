'use client';

import React from 'react';
import { ProductImage } from '@/components/atoms';

interface ProductCardProps {
  id: string;
  image?: string;
  image2?: string; // For "all products" variant with stacked images
  title: string;
  price?: number;
  oldPrice?: number;
  type?: 'product' | 'all';
  onClick?: (productId: string) => void;
  className?: string;
}

export function ProductCard({ 
  id, 
  image, 
  image2,
  title, 
  price, 
  oldPrice, 
  type = 'product',
  onClick,
  className = ''
}: ProductCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const isAllProductsCard = type === 'all';

  return (
    <button
      onClick={handleClick}
      className={`flex flex-row gap-1 items-center p-2 bg-[rgba(20,20,20,0.06)] rounded-xl w-72 h-[88px] shrink-0 border-none cursor-pointer active:scale-95 transition-transform text-left ${className}`}
    >
      {/* Product Image or Stacked Images */}
      <div className="w-[72px] h-[72px] shrink-0 relative">
        {isAllProductsCard && image && image2 ? (
          // Stacked images for "All products" card
          <>
            {/* Back image with dark overlay and rotation */}
            <div 
              className="absolute inset-0"
              style={{ 
                transform: 'rotate(355deg)',
                zIndex: 1,
              }}
            >
              <div className="relative w-full h-full">
                <ProductImage src={image2} alt="" size={72} />
                {/* Dark overlay */}
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(20,20,20,0.3)',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>
            
            {/* Front image with rotation */}
            <div 
              className="absolute inset-0"
              style={{ 
                transform: 'rotate(5deg)',
                zIndex: 2,
              }}
            >
              <ProductImage src={image} alt={title} size={72} />
            </div>
          </>
        ) : (
          // Single image for regular product cards
          <ProductImage src={image || ''} alt={title} size={72} />
        )}
      </div>
      
      {/* Text container */}
      <div className="flex flex-col flex-grow px-2 min-w-0">
        {/* Product title */}
        <div className="font-medium text-base text-[#141414] truncate">
          {title}
        </div>
        
        {/* Price (only for regular product cards) */}
        {!isAllProductsCard && price !== undefined && (
          <div className="flex items-center gap-2">
            <div className="font-medium text-[19px] text-[#141414] leading-6">
              {price} ₽
            </div>
            {oldPrice && (
              <div className="text-sm text-[#898989] line-through">
                {oldPrice} ₽
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
}