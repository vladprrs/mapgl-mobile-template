'use client';

import React from 'react';
import { ProductPreviewCard } from './ProductPreviewCard';

interface Product {
  id: string;
  image?: string;
  image2?: string; // For "all products" variant
  title: string;
  price?: number;
  oldPrice?: number;
  type?: 'product' | 'all';
}

interface ProductsCarouselProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
}

export function ProductsCarousel({ products, onProductClick }: ProductsCarouselProps) {
  return (
    <>
      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
      `}</style>
      
      <div className="flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2 pr-4 pt-2">
        {products.map((product) => (
          <ProductPreviewCard
            key={product.id}
            id={product.id}
            image={product.image}
            image2={product.image2}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            type={product.type}
            onClick={onProductClick}
            className="shrink-0" // Prevent cards from shrinking
          />
        ))}
      </div>
    </>
  );
}