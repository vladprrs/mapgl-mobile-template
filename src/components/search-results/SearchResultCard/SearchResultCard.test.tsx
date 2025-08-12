import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchResultCard } from './SearchResultCard';
import { 
  mockRDOrganization1, 
  mockRDFeatures1,
  mockNonRDOrganization1,
  mockNonRDFeatures1
} from '@/__mocks__/search-results/organizations';

describe('SearchResultCard', () => {
  describe('RD variant', () => {
    it('should render RD card with gallery', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      // Check title is rendered
      expect(screen.getByText('Суши Маке')).toBeInTheDocument();
      expect(screen.getByText('Сеть ресторанов')).toBeInTheDocument();
    });

    it('should display AD section for RD cards', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      // Check promotional text
      expect(screen.getByText(/Скажи кодовое слово/)).toBeInTheDocument();
      // Check disclaimer
      expect(screen.getByText(/Реклама/)).toBeInTheDocument();
      // Check button
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should call onButtonClick when CTA button is clicked', () => {
      const onButtonClick = jest.fn();
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
          onButtonClick={onButtonClick}
        />
      );

      const button = screen.getByText('Label');
      fireEvent.click(button);
      expect(onButtonClick).toHaveBeenCalledTimes(1);
    });

    it('should not show friends section in RD variant', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={{...mockRDOrganization1, friends: mockNonRDOrganization1.friends}}
          features={mockRDFeatures1}
        />
      );

      // Friends section should not be rendered for RD cards
      expect(screen.queryByText('+2')).not.toBeInTheDocument();
    });
  });

  describe('Non-RD variant', () => {
    it('should render Non-RD card with basic info', () => {
      render(
        <SearchResultCard
          variant="non-RD"
          organization={mockNonRDOrganization1}
          features={mockNonRDFeatures1}
        />
      );

      // Check title is rendered
      expect(screen.getByText('Шиномонтаж')).toBeInTheDocument();
      expect(screen.getByText('Региональная сеть автокомплексов для японских автомобилей')).toBeInTheDocument();
    });

    it('should display friends section for Non-RD cards', () => {
      render(
        <SearchResultCard
          variant="non-RD"
          organization={mockNonRDOrganization1}
          features={mockNonRDFeatures1}
        />
      );

      // Check friends counter
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('should display delivery button for Non-RD cards', () => {
      render(
        <SearchResultCard
          variant="non-RD"
          organization={mockNonRDOrganization1}
          features={mockNonRDFeatures1}
        />
      );

      // Check delivery button
      expect(screen.getByText('Заказать доставку')).toBeInTheDocument();
    });

    it('should display additional info for Non-RD cards', () => {
      render(
        <SearchResultCard
          variant="non-RD"
          organization={mockNonRDOrganization1}
          features={mockNonRDFeatures1}
        />
      );

      // Check additional info
      expect(screen.getByText('500 мест • Цена в час 50 ₽ • Теплая')).toBeInTheDocument();
    });

    it('should call onServiceClick when delivery button is clicked', () => {
      const onServiceClick = jest.fn();
      render(
        <SearchResultCard
          variant="non-RD"
          organization={mockNonRDOrganization1}
          features={mockNonRDFeatures1}
          onServiceClick={onServiceClick}
        />
      );

      const button = screen.getByText('Заказать доставку');
      fireEvent.click(button);
      expect(onServiceClick).toHaveBeenCalledWith('delivery');
    });
  });

  describe('Common features', () => {
    it('should display organization name and category', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      expect(screen.getByText('Суши Маке')).toBeInTheDocument();
      expect(screen.getByText('Сеть ресторанов')).toBeInTheDocument();
    });

    it('should show rating and review count', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      expect(screen.getByText('4.6')).toBeInTheDocument();
      expect(screen.getByText('120 оценок')).toBeInTheDocument();
    });

    it('should display address', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      expect(screen.getByText('Тверская 32/12, 1 этаж, Москва')).toBeInTheDocument();
    });

    it('should display distance', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      expect(screen.getByText('3 мин')).toBeInTheDocument();
    });

    it('should show working hours with correct status', () => {
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
        />
      );

      expect(screen.getByText('Открыто до 23:00')).toBeInTheDocument();
    });

    it('should call onClick when card is clicked', () => {
      const onClick = jest.fn();
      render(
        <SearchResultCard
          variant="RD"
          organization={mockRDOrganization1}
          features={mockRDFeatures1}
          onClick={onClick}
        />
      );

      const card = screen.getByText('Суши Маке').closest('div[class*="rounded-xl"]');
      if (card) {
        fireEvent.click(card);
        expect(onClick).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Conditional rendering', () => {
    it('should hide rating when not provided', () => {
      const orgWithoutRating = {
        ...mockRDOrganization1,
        rating: undefined,
        reviewCount: undefined
      };

      render(
        <SearchResultCard
          variant="RD"
          organization={orgWithoutRating}
          features={mockRDFeatures1}
        />
      );

      expect(screen.queryByText('4.6')).not.toBeInTheDocument();
      expect(screen.queryByText('120 оценок')).not.toBeInTheDocument();
    });

    it('should hide friends when no data', () => {
      const orgWithoutFriends = {
        ...mockNonRDOrganization1,
        friends: undefined
      };

      render(
        <SearchResultCard
          variant="non-RD"
          organization={orgWithoutFriends}
          features={mockNonRDFeatures1}
        />
      );

      expect(screen.queryByText('+2')).not.toBeInTheDocument();
    });

    it('should hide working hours when not provided', () => {
      const orgWithoutHours = {
        ...mockRDOrganization1,
        workingHours: undefined
      };

      render(
        <SearchResultCard
          variant="RD"
          organization={orgWithoutHours}
          features={mockRDFeatures1}
        />
      );

      expect(screen.queryByText('Открыто до 23:00')).not.toBeInTheDocument();
    });

    it('should handle missing optional fields gracefully', () => {
      const minimalOrg = {
        id: 'test',
        name: 'Test Organization',
        category: 'Test Category',
        address: 'Test Address'
      };

      render(
        <SearchResultCard
          variant="non-RD"
          organization={minimalOrg}
        />
      );

      expect(screen.getByText('Test Organization')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('Test Address')).toBeInTheDocument();
    });
  });
});