'use client';

import React from 'react';
import Image from 'next/image';

type ButtonState = 'default' | 'discount' | 'added' | 'checkout';

interface AddToCartButtonProps {
  price: number;
  oldPrice?: number;
  quantity?: number;
  state: ButtonState;
  onAdd: () => void;
  onRemove?: () => void;
}

export function AddToCartButton({ 
  price,
  oldPrice,
  quantity = 0,
  state,
  onAdd,
  onRemove
}: AddToCartButtonProps) {
  
  // Format price helper
  const formatPrice = (priceValue: number) => `${priceValue} ₽`;
  
  // For 'added' state, show minus and plus buttons with quantity
  if (state === 'added' && quantity > 0) {
    return (
      <div className="bg-[#1db93c] flex flex-row gap-1.5 items-center justify-center px-3 py-1.5 rounded-[10px] w-full">
        {/* Minus button */}
        <button 
          onClick={onRemove} 
          className="size-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
        >
          <Image
            src="/assets/figma/buttons/28f5d1fd4a08bd87957a7e9d0ac33e4141c2c0fd.svg"
            alt="Remove"
            width={24}
            height={24}
            className="block"
          />
        </button>
        
        {/* Quantity and price */}
        <div className="flex flex-row items-center gap-1.5 flex-1 justify-center">
          <span 
            className="text-white font-medium text-[16px] leading-5"
            style={{
              fontFamily: 'SB Sans Text, sans-serif',
              letterSpacing: '-0.24px',
            }}
          >
            {quantity > 1 && `${quantity}× `}{formatPrice(price)}
          </span>
        </div>
        
        {/* Plus button */}
        <button 
          onClick={onAdd} 
          className="size-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
        >
          <Image
            src="/assets/figma/buttons/f87b9323274bfae730634fda057ef34d35ba7501.svg"
            alt="Add"
            width={24}
            height={24}
            className="block"
          />
        </button>
      </div>
    );
  }

  // Default and discount states
  return (
    <button 
      onClick={onAdd}
      className="bg-[rgba(20,20,20,0.06)] flex flex-row gap-1.5 items-center justify-center pl-4 pr-3 py-1.5 rounded-[10px] w-full border-none cursor-pointer"
    >
      {/* Price display logic */}
      <div className="flex flex-row items-center gap-1.5 flex-1">
        {oldPrice && state === 'discount' ? (
          <div className="flex flex-col items-start gap-0.5">
            <span 
              className="text-[#898989] line-through text-[12px] leading-[14px]"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 400,
              }}
            >
              {formatPrice(oldPrice)}
            </span>
            <span 
              className="text-[#141414] text-[16px] leading-5"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 500,
                letterSpacing: '-0.24px',
              }}
            >
              {formatPrice(price)}
            </span>
          </div>
        ) : (
          <span 
            className="text-[#141414] text-[16px] leading-5"
            style={{
              fontFamily: 'SB Sans Text, sans-serif',
              fontWeight: 500,
              letterSpacing: '-0.24px',
            }}
          >
            {formatPrice(price)}
          </span>
        )}
      </div>
      
      <Image
        src="/assets/figma/buttons/aa67d1c61241635581e5a619ec8eea047f2f9ba1.svg"
        alt="Add"
        width={24}
        height={24}
        className="size-6 flex-shrink-0"
      />
    </button>
  );
}