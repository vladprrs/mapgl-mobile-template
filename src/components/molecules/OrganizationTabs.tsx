'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface OrganizationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: TabItem[];
  className?: string;
}

/**
 * OrganizationTabs Molecule
 * Tab navigation component for organization detail page
 * 
 * Design specs from Figma node-id 315-223343:
 * - Active tab: White background with shadow
 * - Inactive tabs: Gray text, transparent background
 * - Counters: Some tabs have count badges
 * - Horizontal scrollable layout with fade mask edges
 */
export function OrganizationTabs({
  activeTab,
  onTabChange,
  tabs,
  className = '',
}: OrganizationTabsProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Fade mask overlay */}
      <div className="absolute bottom-0 left-0 right-0 top-0 pointer-events-none z-10">
        {/* Right gradient fade */}
        <div 
          className="absolute bottom-0 right-0 top-0 w-5"
          style={{
            background: 'linear-gradient(to left, transparent, white)',
          }}
        />
        {/* Left gradient fade */}
        <div 
          className="absolute bottom-0 left-0 top-0 w-5"
          style={{
            background: 'linear-gradient(to right, white, transparent)',
          }}
        />
      </div>

      {/* Tabs container */}
      <div className="flex flex-row gap-0.5 items-start justify-start px-4 py-3 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-row items-center gap-1.5 rounded-lg shrink-0 transition-all duration-200
                ${isActive 
                  ? 'bg-white shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.04),0px_1px_4px_0px_rgba(0,0,0,0.08)]' 
                  : 'bg-transparent'
                }
              `}
              style={{
                paddingLeft: tokens.spacing[3], // 12px
                paddingRight: tab.count ? '10px' : tokens.spacing[3], // 10px or 12px
                paddingTop: '9px',
                paddingBottom: '9px',
              }}
            >
              {/* Tab label */}
              <span
                className="font-medium text-left text-nowrap"
                style={{
                  color: isActive ? tokens.colors.text.primary : tokens.colors.text.secondary,
                  fontSize: tokens.typography.fontSize.base, // 14px
                  lineHeight: '18px',
                  letterSpacing: '-0.28px',
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {tab.label}
              </span>

              {/* Counter badge */}
              {tab.count && (
                <div className="flex flex-row h-[18px] items-end justify-start">
                  <div className="flex flex-col items-start justify-start overflow-hidden rounded-xl">
                    <div 
                      className="flex flex-col items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(20,20,20,0.3)',
                        paddingTop: '1px',
                        paddingBottom: '2px',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        minWidth: '9px',
                      }}
                    >
                      <span
                        className="font-medium text-center text-nowrap"
                        style={{
                          color: tokens.colors.text.inverse, // #FFFFFF
                          fontSize: '13px',
                          lineHeight: '16px',
                          letterSpacing: '-0.234px',
                          fontFamily: 'SB Sans Text, sans-serif',
                        }}
                      >
                        {tab.count}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}