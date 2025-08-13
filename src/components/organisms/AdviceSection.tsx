'use client';

import React from 'react';
import { MetaItem, MetaItemAd, Cover, Interesting, RD } from '@/components/molecules';
import type { AdviceItem } from '@/__mocks__/advice/types';

interface AdviceSectionProps {
  items: AdviceItem[];
  layout?: 'horizontal' | 'mixed';
  title?: string;
  onItemClick?: (item: AdviceItem) => void;
  className?: string;
}

/**
 * AdviceSection Component
 * Container for rendering advice cards in various layouts
 * 
 * Layouts:
 * - single: One card per row
 * - double: Two cards per row (standard grid)
 * - triple: Three cards per row
 * - mixed: Two-column masonry layout with variable heights
 * 
 * Height Rules in Masonry:
 * - MetaItem, MetaItemAd: Always single height
 * - Interesting, RD: Always double height
 * - Cover: Can be single or double height
 */
export function AdviceSection({
  items,
  layout = 'mixed',
  title = 'Советы',
  onItemClick,
  className = '',
}: AdviceSectionProps) {
  const handleItemClick = (item: AdviceItem) => {
    onItemClick?.(item);
  };

  const renderItem = (item: AdviceItem) => {
    const commonProps = {
      onClick: () => handleItemClick(item),
    };

    switch (item.type) {
      case 'meta_item':
        return <MetaItem {...item} {...commonProps} />;
      case 'meta_item_ad':
        return <MetaItemAd {...item} {...commonProps} />;
      case 'cover':
        return <Cover {...item} {...commonProps} />;
      case 'interesting':
        return <Interesting {...item} {...commonProps} />;
      case 'rd':
        return <RD {...item} {...commonProps} />;
      default:
        return null;
    }
  };

  const getGridClassName = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex gap-3 overflow-x-auto';
      case 'mixed':
        // Mixed layout: Cover takes full width, others adapt
        return 'flex flex-col gap-3';
      default:
        return 'grid grid-cols-2 gap-3';
    }
  };

  const renderMixedLayout = () => {
    // Implement proper 2-column masonry layout
    // Components always stay in their column, never span across
    
    // Determine component heights
    const getComponentHeight = (item: AdviceItem): number => {
      // Height rules:
      // - MetaItem, MetaItemAd: always 1 unit
      // - Interesting, RD: always 2 units
      // - Cover: can be 1 or 2 units based on state
      
      if (item.type === 'meta_item' || item.type === 'meta_item_ad') {
        return 1; // Always single height
      }
      
      if (item.type === 'interesting' || item.type === 'rd') {
        return 2; // Always double height
      }
      
      if (item.type === 'cover') {
        // Cover can be single or double based on variant
        return item.variant === 'big' ? 2 : 1;
      }
      
      return 1; // Default
    };
    
    // Distribute items into two columns with masonry layout
    const leftColumn: AdviceItem[] = [];
    const rightColumn: AdviceItem[] = [];
    let leftHeight = 0;
    let rightHeight = 0;
    
    items.forEach(item => {
      const itemHeight = getComponentHeight(item);
      
      // Place item in the shorter column (masonry behavior)
      if (leftHeight <= rightHeight) {
        leftColumn.push(item);
        leftHeight += itemHeight;
      } else {
        rightColumn.push(item);
        rightHeight += itemHeight;
      }
    });
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {leftColumn.map(item => (
            <div 
              key={item.id}
              className={
                getComponentHeight(item) === 2 
                  ? 'row-span-2' 
                  : ''
              }
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
        
        {/* Right column */}
        <div className="flex flex-col gap-3">
          {rightColumn.map(item => (
            <div 
              key={item.id}
              className={
                getComponentHeight(item) === 2 
                  ? 'row-span-2' 
                  : ''
              }
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`w-full ${className}`}
      style={{
        // Allow vertical drag gestures to pass through for bottom sheet dragging
        // This matches the behavior of StoriesPanel which uses 'pan-x' for horizontal scroll
        touchAction: 'pan-y',
      }}
    >
      {/* Section title - exact Figma specs */}
      <div className="pb-3">
        <h2 className="font-semibold text-[19px] leading-6 tracking-[-0.38px] text-[#141414]">
          {title}
        </h2>
      </div>

      {/* Cards container - add min-height to prevent layout shift */}
      <div style={{ minHeight: items.length === 0 ? '200px' : 'auto' }}>
        {layout === 'mixed' ? (
          renderMixedLayout()
        ) : (
          <div className={getGridClassName()}>
            {items.map(item => (
              <div key={item.id}>
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}