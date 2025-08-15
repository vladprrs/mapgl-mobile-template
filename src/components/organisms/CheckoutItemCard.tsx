'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface CheckoutItemCardProps {
  id: string;
  image: string;
  title: string;
  weight?: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

export function CheckoutItemCard({
  id,
  image,
  title,
  weight,
  quantity,
  price,
  oldPrice,
  onQuantityChange
}: CheckoutItemCardProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  const totalPrice = price * quantity;
  const totalOldPrice = oldPrice ? oldPrice * quantity : undefined;

  return (
    <div className="flex flex-row gap-3 items-start">
      {/* Image - 106×106px with border */}
      <div 
        className="size-[106px] rounded-lg bg-[#f1f1f1] flex-shrink-0 relative bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${image}')`,
          backgroundSize: 'contain',
          backgroundPosition: '50% 50%'
        }}
      >
        <div 
          className="absolute inset-0 border border-solid rounded-lg pointer-events-none"
          style={{ borderColor: 'rgba(137,137,137,0.3)' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* Top: Title and weight */}
        <div className="w-full">
          <div className="flex flex-row items-start justify-start pb-0.5 pt-1.5 px-0 w-full">
            <p 
              className="flex-1 text-[14px] leading-[18px] text-[#141414] overflow-hidden"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.28px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
              }}
            >
              {title}
            </p>
          </div>
          {weight && (
            <div className="flex flex-row items-start justify-start px-0 py-0.5">
              <p 
                className="text-[14px] leading-[18px] text-[#898989] whitespace-nowrap"
                style={{
                  fontFamily: 'SB Sans Text, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.28px'
                }}
              >
                {weight}
              </p>
            </div>
          )}
        </div>

        {/* Bottom: Controls and price */}
        <div className="flex flex-row items-end justify-between w-full">
          {/* Quantity controls */}
          <div 
            className="bg-[rgba(20,20,20,0.06)] flex flex-row gap-1.5 items-center justify-center pl-4 pr-3 py-1.5 rounded-[10px]"
          >
            <button 
              onClick={handleDecrement}
              className="size-6 flex items-center justify-center border-none bg-transparent cursor-pointer p-0"
              disabled={quantity <= 1}
            >
              <Image
                src="/assets/figma/0bced2812bfebac0b008f3d838ff19b68c031539.svg"
                alt="Decrease"
                width={24}
                height={24}
                className="size-6"
              />
            </button>
            <div className="flex flex-row items-center">
              <div className="flex flex-row gap-1.5 items-center justify-start pb-0.5 pt-0 px-0">
                <span 
                  className="text-[16px] text-[#141414] text-center whitespace-nowrap"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 500,
                    lineHeight: '20px',
                    letterSpacing: '-0.24px'
                  }}
                >
                  {quantity}
                </span>
              </div>
            </div>
            <button 
              onClick={handleIncrement}
              className="size-6 flex items-center justify-center border-none bg-transparent cursor-pointer p-0"
            >
              <Image
                src="/assets/figma/aa67d1c61241635581e5a619ec8eea047f2f9ba1.svg"
                alt="Increase"
                width={24}
                height={24}
                className="size-6"
              />
            </button>
          </div>

          {/* Price */}
          <div className="flex flex-row gap-1.5 items-center justify-start pb-0.5 pt-0 px-0">
            {totalOldPrice && (
              <div className="flex flex-row items-end justify-start">
                <span 
                  className="text-[16px] text-[#898989] text-center whitespace-nowrap"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 500,
                    lineHeight: '20px',
                    letterSpacing: '-0.24px',
                    textDecorationLine: 'line-through',
                    textDecorationSkipInk: 'none',
                    textDecorationStyle: 'solid',
                    textUnderlinePosition: 'from-font'
                  }}
                >
                  {totalOldPrice}
                </span>
              </div>
            )}
            <div className="flex flex-row items-end justify-start">
              <span 
                className="text-[16px] text-[#141414] text-center whitespace-nowrap"
                style={{
                  fontFamily: 'SB Sans Text, sans-serif',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '-0.24px'
                }}
              >
                {totalPrice} ₽
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}