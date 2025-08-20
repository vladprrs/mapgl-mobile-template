'use client';

import React from 'react';
import Image from 'next/image';
import { CartProductCard } from './CartProductCard';
import useStore from '@/stores';

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
}

const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    image: '/assets/figma/24ace8940eccc51dbbf5b15af155b01435ec8a23.png',
    title: 'Питьевой гель Bombbar с коллагеном, малина-лайм',
    price: 120,
    oldPrice: 150,
    weight: '60 г'
  },
  {
    id: 'prod-2',
    image: '/assets/figma/d86e9c98cc883aff65270c606c4f6cc1b65f2d4d.png',
    title: 'Шейкер спортивный Svoboda Voli 550 мл',
    price: 578,
    weight: '550 мл'
  },
  {
    id: 'prod-3',
    image: '/assets/figma/8441c3055b3f38c931e05b652aacb578fe48a2b8.png',
    title: 'Спортивная бутылка с ситечком Арктика 500 мл чёрная матовая',
    price: 899,
    weight: '500 мл'
  }
];

export function ProductsCarousel({ 
  title = "Товары",
  subtitle = "Пригодятся для занятий спортом",
  products,
  onSeeAll
}: ProductsCarouselProps) {
  // Use defaultProducts if no products provided or if products array is empty
  const productsToShow = products?.length > 0 ? products : defaultProducts;
  
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

  return (
    <div className="bg-white rounded-xl overflow-clip pb-3 pt-2">
      {/* Header - exactly from Figma */}
      <div className="flex flex-row gap-2 items-start justify-center pb-2 pt-0 px-4 w-[327px]">
        <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
          {/* Title */}
          <div className="flex flex-row items-start justify-start pb-px pt-[7px] px-0 relative shrink-0 w-full">
            <div 
              className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[#141414] text-[19px] text-left"
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
          <div className="flex flex-row h-6 items-start justify-start pb-[3px] pt-px px-0 relative shrink-0 w-full">
            <div 
              className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[#898989] text-[15px] text-left"
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