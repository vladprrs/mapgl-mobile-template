'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface ZMKProduct {
  id: string;
  image: string;
  title: string;
  price?: string;
}

interface ZMKBlockProps {
  products: ZMKProduct[];
  maxProducts?: number;
  theme?: 'Light' | 'Dark';
}

export function ZMKBlock({
  products,
  maxProducts = 4,
}: ZMKBlockProps) {
  if (products.length === 0) {
    return null;
  }

  const displayProducts = products.slice(0, maxProducts);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
        borderRadius: tokens.borders.radius.lg,
        padding: tokens.spacing[3],
        marginTop: tokens.spacing[3],
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: tokens.spacing[2],
        }}
      >
        <h3
          style={{
            color: tokens.colors.text.inverse,
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.semibold,
            lineHeight: tokens.typography.lineHeight.tight,
            margin: 0,
          }}
        >
          Здесь можно купить
        </h3>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
          gap: tokens.spacing[2],
          maxWidth: '280px',
        }}
      >
        {displayProducts.map((product) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            {/* Product Image */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: tokens.borders.radius.md,
                backgroundColor: tokens.colors.background.primary,
                overflow: 'hidden',
                marginBottom: tokens.spacing[1],
                border: `1px solid rgba(255, 255, 255, 0.2)`,
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={60}
                height={60}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                unoptimized
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.product-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'product-fallback';
                    fallback.style.cssText = `
                      width: 100%;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background-color: rgba(255, 255, 255, 0.1);
                      color: ${tokens.colors.text.inverse};
                      font-size: 12px;
                      font-weight: ${tokens.typography.fontWeight.medium};
                    `;
                    fallback.textContent = '📦';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            {/* Product Title */}
            <div
              style={{
                color: tokens.colors.text.inverse,
                fontSize: tokens.typography.fontSize.xs,
                fontWeight: tokens.typography.fontWeight.medium,
                lineHeight: tokens.typography.lineHeight.tight,
                textAlign: 'center',
                maxWidth: '60px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.title}
            </div>

            {/* Product Price (if available) */}
            {product.price && (
              <div
                style={{
                  color: tokens.colors.text.inverse,
                  fontSize: tokens.typography.fontSize.xs,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  lineHeight: tokens.typography.lineHeight.tight,
                  textAlign: 'center',
                  marginTop: '2px',
                  opacity: 0.9,
                }}
              >
                {product.price}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}