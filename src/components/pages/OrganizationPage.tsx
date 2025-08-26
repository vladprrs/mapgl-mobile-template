'use client';

import React, { useState, useEffect } from 'react';
import { OrganizationHeader } from '@/components/organisms/OrganizationHeader';
import { CheckoutItemCard } from '@/components/organisms/CheckoutItemCard';
import { ProductsCarousel } from '@/components/organisms/ProductsCarousel';
import { AddressCard, ContactInfo } from '@/components/molecules';
import type { TabItem } from '@/components/molecules';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';
import type { SearchResult } from '@/stores/types';

interface OrganizationPageProps {
  className?: string;
  onSamokatOpen?: (query?: string) => void;
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
  onSamokatOpen,
}: OrganizationPageProps) {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  
  const organization = useStore((state) => state.organization.currentOrganization);
  const isLoading = useStore((state) => state.organization.isLoading);
  const activeTab = useStore((state) => state.organization.activeTab);
  const setActiveTab = useStore((state) => state.organization.setActiveTab);

  // Define food-related categories for conditional tab display
  const FOOD_CATEGORIES = [
    'ресторан', 'кафе', 'бар', 'кофе', 'пекарня', 'фастфуд', 'пицца', 'пиццерия', 'суши', 
    'столовая', 'буфет', 'закусочная', 'бистро', 'паб', 'таверна', 'кофейня',
    'restaurant', 'cafe', 'bar', 'coffee', 'bakery', 'fastfood', 'pizza', 'sushi', 
    'canteen', 'buffet', 'bistro', 'pub', 'tavern', 'coffee shop'
  ];

  // Check if the organization is a food establishment
  const isFoodEstablishment = organization ? FOOD_CATEGORIES.some(category => 
    organization.category?.toLowerCase().includes(category.toLowerCase())
  ) : false;

  // Debug log to verify category detection
  React.useEffect(() => {
    if (organization) {
    }
  }, [organization, isFoodEstablishment]);

  // Tab configuration from Figma design with conditional logic
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Обзор' },
    { id: 'reviews', label: 'Отзывы', count: organization?.reviewCount },
    
    // Conditional tab based on category
    isFoodEstablishment 
      ? { id: 'menu', label: 'Меню', count: 213 }
      : { id: 'prices', label: 'Цены' },
    
    { id: 'photos', label: 'Фото', count: 432 },
    { id: 'info', label: 'Инфо' },
    { id: 'promotions', label: 'Акции' },
  ];

  // Reset to overview tab when organization changes
  useEffect(() => {
    if (organization) {
      setActiveTab('overview');
    }
  }, [organization?.id, setActiveTab]);

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
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Content Area - flex-1 to fill remaining space */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: tokens.colors.background.secondary,
          padding: tokens.spacing[4],
          minHeight: '800px', // Make it tall enough to test scrolling
        }}
      >
        {activeTab === 'overview' && <OverviewTabContent organization={organization} onSamokatOpen={onSamokatOpen} />}
        {activeTab === 'menu' && <MenuTabContent />}
        {activeTab === 'prices' && <PricesTabContent organization={organization} />}
        {activeTab === 'photos' && <PhotosTabContent />}
        {activeTab === 'reviews' && <ReviewsTabContent />}
        {activeTab === 'info' && <InfoTabContent organization={organization} />}
        {activeTab === 'promotions' && <PromotionsTabContent />}
      </div>
    </div>
  );
}

// Tab Content Components
function OverviewTabContent({ organization, onSamokatOpen }: { organization: SearchResult; onSamokatOpen?: (query?: string) => void }) {
  const handleNavigate = () => {
    // TODO: Open navigation/map functionality
  };

  return (
    <div className="space-y-6">
      {/* Address Card Section */}
      <div>
        <h2 
          className="text-lg font-semibold mb-4"
          style={{
            color: tokens.colors.text.primary,
            fontFamily: 'SB Sans Text, sans-serif',
          }}
        >
          Адрес
        </h2>
        <AddressCard
          address={organization.address}
          distance={organization.distance}
          onNavigate={handleNavigate}
        />
      </div>

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
        </div>
      </div>

      {/* Products Carousel Section */}
      <div>
        <ProductsCarousel
          title="Товары"
          subtitle="Популярные товары и услуги"
          products={organization.products || []}
          onHeaderClick={() => onSamokatOpen?.("Товары для фитнеса")}
        />
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
        <ContactInfo
          phone={organization.phone}
          messengers={organization.messengers}
          website={organization.website}
          socialMedia={organization.socialMedia}
        />
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
      <div className="space-y-4">
        {/* Sample menu sections */}
        <div 
          className="p-4 rounded-lg"
          style={{
            backgroundColor: tokens.colors.background.primary,
            border: '1px solid rgba(137,137,137,0.3)',
          }}
        >
          <h3 
            className="text-base font-semibold mb-3"
            style={{
              color: tokens.colors.text.primary,
              fontFamily: 'SB Sans Text, sans-serif',
            }}
          >
            Основные блюда
          </h3>
          <div className="space-y-2">
            {['Паста Карбонара', 'Стейк из говядины', 'Лосось на гриле'].map((dish) => (
              <div key={dish} className="flex justify-between items-center">
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{
                      color: tokens.colors.text.primary,
                      fontFamily: 'SB Sans Text, sans-serif',
                    }}
                  >
                    {dish}
                  </p>
                  <p 
                    className="text-xs"
                    style={{
                      color: tokens.colors.text.secondary,
                      fontFamily: 'SB Sans Text, sans-serif',
                    }}
                  >
                    Описание блюда
                  </p>
                </div>
                <p 
                  className="text-sm font-semibold"
                  style={{
                    color: tokens.colors.text.primary,
                    fontFamily: 'SB Sans Text, sans-serif',
                  }}
                >
                  {Math.floor(Math.random() * 1000) + 500} ₽
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricesTabContent({ organization }: { organization: SearchResult }) {
  const cartItems = useStore((state) => state.cart.cart.items);
  const addToCart = useStore((state) => state.cart.addToCart);
  const updateQuantity = useStore((state) => state.cart.updateQuantity);

  // Default products if none exist in organization data
  const defaultProducts = [
    {
      id: 'service-1',
      image: '/assets/figma/24ace8940eccc51dbbf5b15af155b01435ec8a23.png',
      title: 'Консультация специалиста',
      weight: '1 час',
      price: 1500,
      oldPrice: 2000
    },
    {
      id: 'service-2', 
      image: '/assets/figma/d86e9c98cc883aff65270c606c4f6cc1b65f2d4d.png',
      title: 'Диагностическое обследование',
      weight: '30 мин',
      price: 800,
    },
    {
      id: 'service-3',
      image: '/assets/figma/8441c3055b3f38c931e05b652aacb578fe48a2b8.png',
      title: 'Комплексная услуга',
      weight: '2 часа',
      price: 3200,
      oldPrice: 4000
    }
  ];

  const products = organization.products || defaultProducts;

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      weight: product.weight
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity === 0) {
      updateQuantity(productId, 0);
    } else {
      const product = products.find(p => p.id === productId);
      if (product) {
        const existingItem = cartItems.get(productId);
        if (!existingItem) {
          // Add new item to cart
          handleAddToCart(product);
        } else {
          // Update existing item quantity
          updateQuantity(productId, quantity);
        }
      }
    }
  };

  return (
    <div className="space-y-2">
      <h2 
        className="text-lg font-semibold mb-4"
        style={{
          color: tokens.colors.text.primary,
          fontFamily: 'SB Sans Text, sans-serif',
        }}
      >
        Цены на товары и услуги
      </h2>
      
      {products.map((product) => {
        const cartItem = cartItems.get(product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        return (
          <div 
            key={product.id}
            className="bg-white rounded-lg"
            style={{ backgroundColor: tokens.colors.background.primary }}
          >
            <CheckoutItemCard
              id={product.id}
              image={product.image}
              title={product.title}
              weight={product.weight}
              quantity={quantity}
              price={product.price}
              oldPrice={product.oldPrice}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        );
      })}
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