'use client';

import React, { useRef } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { ProductCard } from '@/components/molecules';
import { tokens } from '@/lib/ui/tokens';
import { getProductsBySearchQuery } from '@/lib/data/products';
import useStore from '@/stores';

interface SamokatProductsPageProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
}

/**
 * SamokatProductsPage Component
 * Based on Figma node-id 430-248630
 * 
 * Features:
 * - Full-screen overlay with 90% height
 * - Header with title and close button
 * - 2-column grid of product cards
 * - Swipe-to-close gesture
 * - Background overlay
 */
export function SamokatProductsPage({ 
  isOpen, 
  onClose,
  searchQuery = 'Товары для фитнеса'
}: SamokatProductsPageProps) {
  const bottomSheetRef = useRef<SheetRef>(null);
  const addToCart = useStore((state) => state.cart.addToCart);
  const cartItems = useStore((state) => state.cart.cart.items);

  // Get products based on search query
  const products = getProductsBySearchQuery(searchQuery);

  const handleClose = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapTo(0);
    }
    setTimeout(onClose, 300);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image,
        weight: product.weight || '60 г',
      });
    }
  };

  const getQuantity = (productId: string): number => {
    const item = cartItems.get(productId);
    return item?.quantity || 0;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
        onClick={handleClose}
      />
      
      <Sheet
        ref={bottomSheetRef}
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[0.9]}
        initialSnap={0}
      >
        <Sheet.Container>
          <div className="flex flex-col h-full bg-white rounded-t-2xl">
            {/* Header */}
            <div 
              className="relative"
              style={{
                paddingTop: '6px',
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pb-2">
                <div 
                  style={{
                    width: '40px',
                    height: '4px',
                    backgroundColor: 'rgba(137, 137, 137, 0.25)',
                    borderRadius: '2px',
                  }}
                />
              </div>

              {/* Title and Close Button */}
              <div 
                className="flex items-center justify-between px-4 pb-3"
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: tokens.colors.text.primary,
                    lineHeight: '24px',
                    fontFamily: 'SB Sans Text, sans-serif',
                  }}
                >
                  {searchQuery}
                </h2>

                <button
                  onClick={handleClose}
                  className="flex items-center justify-center transition-all active:scale-90"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'rgba(20, 20, 20, 0.06)',
                    borderRadius: tokens.borders.radius.md,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path 
                      d="M12 4L4 12M4 4L12 12" 
                      stroke={tokens.colors.text.primary}
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div 
              className="flex-1 overflow-y-auto"
              style={{
                padding: '16px',
              }}
            >
              <div 
                className="grid grid-cols-2"
                style={{
                  gap: '9px',
                  gridTemplateColumns: 'repeat(2, 171px)',
                  justifyContent: 'center',
                }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    specification={product.weight || '60 г'}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image={product.image}
                    onAddToCart={handleAddToCart}
                    initialQuantity={getQuantity(product.id)}
                  />
                ))}
              </div>

              {/* Bottom padding for safe area */}
              <div style={{ height: '24px' }} />
            </div>
          </div>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}