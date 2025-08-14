'use client';

import React, { useState, useEffect } from 'react';
import { OrganizationHeader } from '@/components/organisms/OrganizationHeader';
import { OrganizationTabs, type TabItem } from '@/components/molecules';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';
import type { SearchResult } from '@/stores/types';

interface OrganizationPageProps {
  className?: string;
}

/**
 * OrganizationPage Component
 * Complete organization detail page with header and content sections
 * 
 * Features:
 * - OrganizationHeader with expanded/collapsed states
 * - Tabs section (placeholder)
 * - Content area (placeholder)
 * - Scroll-based header state management
 */
export function OrganizationPage({
  className = '',
}: OrganizationPageProps) {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  
  const organization = useStore((state) => state.organization.currentOrganization);
  const isLoading = useStore((state) => state.organization.isLoading);
  const activeTab = useStore((state) => state.organization.activeTab);
  const setActiveTab = useStore((state) => state.organization.setActiveTab);

  // Tab configuration from Figma design
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Обзор' },
    { id: 'menu', label: 'Меню', count: 213 },
    { id: 'photos', label: 'Фото', count: 432 },
    { id: 'reviews', label: 'Отзывы', count: 232 },
    { id: 'info', label: 'Инфо' },
    { id: 'promotions', label: 'Акции' },
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
      <div className={`organization-page min-h-full bg-background-secondary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organization...</p>
        </div>
      </div>
    );
  }

  // No organization state
  if (!organization) {
    return (
      <div className={`organization-page min-h-full bg-background-secondary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-gray-600">Organization not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`organization-page flex flex-col h-full ${className}`}>
      {/* Header - sticky with no spacing */}
      <div 
        className="organization-header sticky top-0 z-20 flex-shrink-0 transition-all duration-300"
        style={{
          backgroundColor: tokens.colors.background.secondary,
        }}
      >
        <OrganizationHeader 
          isCollapsed={isHeaderCollapsed}
        />
      </div>

      {/* Tabs section - sticky below header */}
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
        <OrganizationTabs
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
        {activeTab === 'overview' && <OverviewTabContent organization={organization} />}
        {activeTab === 'menu' && <MenuTabContent />}
        {activeTab === 'photos' && <PhotosTabContent />}
        {activeTab === 'reviews' && <ReviewsTabContent />}
        {activeTab === 'info' && <InfoTabContent organization={organization} />}
        {activeTab === 'promotions' && <PromotionsTabContent />}
      </div>
    </div>
  );
}

// Tab Content Components
function OverviewTabContent({ organization }: { organization: SearchResult }) {
  return (
    <div className="space-y-6">
      {/* General Info Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Общая информация
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
              Категория
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              {organization.category}
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
              Адрес
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              {organization.address}
            </p>
          </div>

          {organization.distance && (
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
                {organization.distance}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Контакты
        </h2>
        <div className="space-y-3">
          <button 
            className="w-full text-left p-4 rounded-lg border"
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
              Телефон
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.primary.DEFAULT,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              +7 (495) 123-45-67
            </p>
          </button>
          
          <button 
            className="w-full text-left p-4 rounded-lg border"
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
              Веб-сайт
            </p>
            <p 
              className="text-base"
              style={{
                color: tokens.colors.primary.DEFAULT,
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              website.example.com
            </p>
          </button>
        </div>
      </div>

      {/* Working Hours Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Режим работы
        </h2>
        <div className="space-y-2">
          {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map((day, index) => (
            <div key={day} className="flex justify-between items-center">
              <p 
                className="text-base"
                style={{
                  color: tokens.colors.text.primary,
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {day}
              </p>
              <p 
                className="text-base"
                style={{
                  color: index < 5 ? tokens.colors.text.primary : tokens.colors.text.secondary,
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {index < 5 ? '09:00 - 21:00' : '10:00 - 20:00'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuTabContent() {
  return (
    <div className="space-y-6">
      <h2 
        className="text-lg font-semibold"
        style={{
          color: tokens.colors.text.primary,
          fontFamily: 'SB Sans Text, sans-serif',
        }}
      >
        Меню (213 позиций)
      </h2>
      <div className="text-center py-12">
        <p 
          style={{
            color: tokens.colors.text.secondary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Раздел меню будет здесь
        </p>
      </div>
    </div>
  );
}

function PhotosTabContent() {
  return (
    <div className="space-y-6">
      <h2 
        className="text-lg font-semibold"
        style={{
          color: tokens.colors.text.primary,
          fontFamily: 'SB Sans Text, sans-serif',
        }}
      >
        Фото (432 фотографии)
      </h2>
      <div className="text-center py-12">
        <p 
          style={{
            color: tokens.colors.text.secondary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Галерея фотографий будет здесь
        </p>
      </div>
    </div>
  );
}

function ReviewsTabContent() {
  return (
    <div className="space-y-6">
      <h2 
        className="text-lg font-semibold"
        style={{
          color: tokens.colors.text.primary,
          fontFamily: 'SB Sans Text, sans-serif',
        }}
      >
        Отзывы (232 отзыва)
      </h2>
      <div className="space-y-4">
        {[1, 2, 3].map((review) => (
          <div 
            key={review}
            className="p-4 rounded-lg border"
            style={{
              borderColor: 'rgba(137,137,137,0.3)',
              backgroundColor: tokens.colors.background.primary,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-8 h-8 rounded-full"
                style={{
                  backgroundColor: tokens.colors.background.secondary,
                }}
              />
              <div>
                <p 
                  className="text-sm font-medium"
                  style={{
                    color: tokens.colors.text.primary,
                    fontFamily: 'SB Sans Text, sans-serif',
                  }}
                >
                  Пользователь {review}
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div 
                      key={star}
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: star <= 4 ? '#efa701' : 'rgba(20,20,20,0.09)',
                        borderRadius: '1px',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p 
              className="text-sm"
              style={{
                color: tokens.colors.text.primary,
                fontFamily: 'SB Sans Text, sans-serif',
                lineHeight: '1.4',
              }}
            >
              Отличное обслуживание, вежливый персонал. Рекомендую!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoTabContent({ organization }: { organization: SearchResult }) {
  return (
    <div className="space-y-6">
      <h2 
        className="text-lg font-semibold"
        style={{
          color: tokens.colors.text.primary,
          fontFamily: 'SB Sans Text, sans-serif',
        }}
      >
        Дополнительная информация
      </h2>
      <div className="space-y-4">
        <div>
          <p 
            className="text-sm font-medium mb-2"
            style={{
              color: tokens.colors.text.secondary,
              fontFamily: 'SB Sans Text, sans-serif',
            }}
          >
            Описание
          </p>
          <p 
            style={{
              color: tokens.colors.text.primary,
              fontFamily: 'SB Sans Text, sans-serif',
              lineHeight: '1.4',
            }}
          >
            Подробная информация об организации {organization.name} будет здесь.
          </p>
        </div>
      </div>
    </div>
  );
}

function PromotionsTabContent() {
  return (
    <div className="space-y-6">
      <h2 
        className="text-lg font-semibold"
        style={{
          color: tokens.colors.text.primary,
          fontFamily: 'SB Sans Text, sans-serif',
        }}
      >
        Акции и специальные предложения
      </h2>
      <div className="text-center py-12">
        <p 
          style={{
            color: tokens.colors.text.secondary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Акции и предложения будут здесь
        </p>
      </div>
    </div>
  );
}