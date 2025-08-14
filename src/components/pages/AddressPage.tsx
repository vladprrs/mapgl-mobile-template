'use client';

import React, { useState, useEffect } from 'react';
import { OrganizationHeader, MastersList } from '@/components/organisms';
import { AddressTabs, type TabItem } from '@/components/molecules';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';
import { useActions } from '@/stores';
import type { SearchResult } from '@/stores/types';
import { mockMasters } from '@/__mocks__/masters/data';
import type { Master } from '@/__mocks__/masters/data';

interface AddressPageProps {
  className?: string;
}

/**
 * AddressPage Component
 * Complete address detail page with header and simplified content sections
 * 
 * Features:
 * - OrganizationHeader reused for addresses (works for both)
 * - Simplified tabs section with only "Обзор" and "Мастера"
 * - Content area focused on address-specific information
 * - Scroll-based header state management
 */
export function AddressPage({
  className = '',
}: AddressPageProps) {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  
  // Reuse organization store for addresses - same data structure works
  const address = useStore((state) => state.organization.currentOrganization);
  const isLoading = useStore((state) => state.organization.isLoading);
  const activeTab = useStore((state) => state.organization.activeTab);
  const setActiveTab = useStore((state) => state.organization.setActiveTab);

  // Simplified tab configuration for addresses
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Обзор' },
    { id: 'masters', label: 'Мастера' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Collapse header when scrolled down more than 100px
      setIsHeaderCollapsed(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className={`address-page min-h-full bg-background-secondary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading address...</p>
        </div>
      </div>
    );
  }

  // No address state
  if (!address) {
    return (
      <div className={`address-page min-h-full bg-background-secondary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-gray-600">Address not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`address-page flex flex-col h-full ${className}`}>
      {/* Header - sticky with no spacing, reuse OrganizationHeader */}
      <div 
        className="address-header sticky top-0 z-20 flex-shrink-0 transition-all duration-300"
        style={{
          backgroundColor: tokens.colors.background.secondary,
        }}
      >
        <OrganizationHeader 
          isCollapsed={isHeaderCollapsed}
        />
      </div>

      {/* Tabs section - sticky below header with simplified tabs */}
      <div 
        className="bg-white border-b sticky flex-shrink-0"
        style={{
          top: isHeaderCollapsed ? '64px' : '140px', // Stick below header (approximate heights)
          zIndex: 10,
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'rgba(137,137,137,0.3)',
          transition: 'top 300ms ease-in-out',
        }}
      >
        <AddressTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
      </div>

      {/* Content Area - flex-1 to fill remaining space */}
      <div 
        className="bg-white flex-1 overflow-y-auto"
        style={{
          padding: tokens.spacing[4],
          minHeight: '800px', // Make it tall enough to test scrolling
        }}
      >
        {activeTab === 'overview' && <OverviewTabContent address={address} />}
        {activeTab === 'masters' && <MastersTabContent />}
      </div>
    </div>
  );
}

// Tab Content Components
function OverviewTabContent({ address }: { address: SearchResult }) {
  return (
    <div className="space-y-6">
      {/* Address Info Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Информация об адресе
        </h2>
        <div className="space-y-3">
          <div>
            <p 
              className="text-sm font-medium"
              style={{
                color: tokens.colors.text.secondary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              Полный адрес
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              {address.address}
            </p>
          </div>
          
          <div>
            <p 
              className="text-sm font-medium"
              style={{
                color: tokens.colors.text.secondary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              Тип здания
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              {address.category || 'Жилое здание'}
            </p>
          </div>

          {address.distance && (
            <div>
              <p 
                className="text-sm font-medium"
                style={{
                  color: tokens.colors.text.secondary,
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                Расстояние
              </p>
              <p 
                className="text-base"
                style={{
                  color: tokens.colors.text.primary,
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {address.distance}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Building Features Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Особенности здания
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="p-3 rounded-lg border"
            style={{
              borderColor: 'rgba(137,137,137,0.3)',
              backgroundColor: tokens.colors.background.primary,
            }}
          >
            <p 
              className="text-sm font-medium"
              style={{
                color: tokens.colors.text.secondary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              Год постройки
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              1995
            </p>
          </div>
          
          <div 
            className="p-3 rounded-lg border"
            style={{
              borderColor: 'rgba(137,137,137,0.3)',
              backgroundColor: tokens.colors.background.primary,
            }}
          >
            <p 
              className="text-sm font-medium"
              style={{
                color: tokens.colors.text.secondary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              Этажность
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              9 этажей
            </p>
          </div>
        </div>
      </div>

      {/* Nearby Organizations Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Организации в здании
        </h2>
        <div className="space-y-3">
          {['Стоматология "Белые зубы"', 'Салон красоты "Элегант"', 'Офис "Альфа-банк"'].map((org, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border"
              style={{
                borderColor: 'rgba(137,137,137,0.3)',
                backgroundColor: tokens.colors.background.primary,
              }}
            >
              <p 
                className="text-base font-medium"
                style={{
                  color: tokens.colors.text.primary,
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {org}
              </p>
              <p 
                className="text-sm mt-1"
                style={{
                  color: tokens.colors.text.secondary,
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {index === 0 ? '2 этаж' : index === 1 ? '1 этаж' : '3 этаж'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MastersTabContent() {
  const actions = useActions();
  
  const handleMasterClick = (master: Master) => {
    // Navigate to master details page
    actions.selectMaster(master);
  };

  return (
    <div>
      <MastersList
        masters={mockMasters}
        onMasterClick={handleMasterClick}
        title="Мастера поблизости"
        emptyMessage="Мастера не найдены в этом районе"
      />
    </div>
  );
}