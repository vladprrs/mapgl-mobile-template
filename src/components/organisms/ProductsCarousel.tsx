'use client';

import React from 'react';
import Image from 'next/image';
import { CartProductCard } from './CartProductCard';
import useStore from '@/stores';
import { tokens } from '@/lib/ui/tokens';
import { getCarouselProducts } from '@/lib/data/products';

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  weight?: string;
}

interface ProductsCarouselProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  onSeeAll?: () => void;
  onHeaderClick?: () => void;
}

// Get real products from data service
const getDefaultProducts = (): Product[] => {
  const realProducts = getCarouselProducts();
  return realProducts.map(p => ({
    id: p.id,
    image: p.image,
    title: p.title,
    price: p.price,
    oldPrice: p.oldPrice,
    weight: p.weight
  }));
};

export function ProductsCarousel({ 
  title = "Товары",
  subtitle = "Пригодятся для занятий спортом",
  products,
  onSeeAll,
  onHeaderClick
}: ProductsCarouselProps) {
  // Use real products if no products provided or if products array is empty
  const productsToShow = products?.length > 0 ? products : getDefaultProducts();
  
  // Use global cart store
  const cartItems = useStore((state) => state.cart.cart.items);
  const addToCart = useStore((state) => state.cart.addToCart);
  const updateQuantity = useStore((state) => state.cart.updateQuantity);
  

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      weight: product.weight || '60 г'
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const headerOffset = `-${tokens.spacing[3]}`;

  return (
    <div className="bg-white rounded-xl overflow-clip pb-3 pt-2">
      {/* Header - exactly from Figma */}
      <div className="flex flex-row gap-2 items-start justify-center pb-2 pt-0 px-4 w-[327px]">
        <button 
          onClick={onHeaderClick}
          className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 transition-all duration-200 hover:opacity-80 cursor-pointer"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: tokens.spacing[3],
            borderRadius: tokens.borders.radius.sm,
            marginLeft: headerOffset,
            marginRight: headerOffset,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tokens.colors.background.tertiary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-start justify-start">
              {/* Title */}
              <div className="flex flex-row items-start justify-start pb-px pt-[7px] px-0 relative shrink-0">
                <div 
                  className="relative shrink-0 text-[#141414] text-[19px] text-left"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 600,
                    fontSize: '19px',
                    lineHeight: '24px',
                    letterSpacing: '-0.38px',
                  }}
                >
                  {title}
                </div>
              </div>
              {/* Subtitle */}
              <div className="flex flex-row h-6 items-start justify-start pb-[3px] pt-px px-0 relative shrink-0">
                <div 
                  className="relative shrink-0 text-[#898989] text-[15px] text-left"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '20px',
                    letterSpacing: '-0.3px',
                  }}
                >
                  {subtitle}
                </div>
              </div>
            </div>
            {/* Chevron right icon */}
            <div className="flex items-center justify-center ml-2">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                className="text-gray-400"
              >
                <path 
                  d="M7.5 5L12.5 10L7.5 15" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>
        {onSeeAll && (
          <div className="flex flex-row items-start justify-start pb-0 pt-2 px-0 relative shrink-0">
            <button 
              onClick={onSeeAll}
              className="relative shrink-0 size-6 bg-transparent border-none cursor-pointer p-0"
            >
              <Image
                src="/assets/figma/7cf1e4d58af2a93f80580a9ffc627cf38f42fadc.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="block max-w-none size-full"
              />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Container - CRITICAL structure from Figma */}
      <div className="flex flex-row gap-3 items-start justify-start pl-4 pr-0 py-0 overflow-x-auto overflow-y-hidden w-full [&::-webkit-scrollbar]:hidden">
        {productsToShow.map((product) => {
          const cartItem = cartItems.get(product.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return (
            <div key={product.id} className="flex-shrink-0">
              <CartProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                weight={product.weight}
                quantity={quantity}
                onAddToCart={() => handleAddToCart(product)}
                onUpdateQuantity={(qty) => handleUpdateQuantity(product.id, qty)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
