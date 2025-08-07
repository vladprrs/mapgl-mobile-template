import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdviceSection } from '@/components/dashboard/advice/AdviceSection';
import { AdviceItem } from '@/components/dashboard/advice/types';

describe('AdviceSection', () => {
  const mockItems: AdviceItem[] = [
    {
      type: 'meta-item',
      id: 'meta-1',
      title: 'Restaurants',
      categoryId: 'restaurants',
    },
    {
      type: 'cover',
      id: 'cover-1',
      title: 'Best Coffee Shops',
      imageUrl: '/image.jpg',
      collectionId: 'coffee',
    },
    {
      type: 'interesting',
      id: 'interesting-1',
      title: 'New Feature',
      description: 'Try our new feature',
      imageUrl: '/test-image.png',
      featureId: 'feature-1',
    },
  ];

  it('renders with items', () => {
    render(<AdviceSection items={mockItems} />);
    
    expect(screen.getByText('Советы')).toBeInTheDocument();
    expect(screen.getByText('Restaurants')).toBeInTheDocument();
    expect(screen.getByText('Best Coffee Shops')).toBeInTheDocument();
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<AdviceSection items={mockItems} title="Custom Title" />);
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('calls onItemClick when item is clicked', () => {
    const handleItemClick = jest.fn();
    render(<AdviceSection items={mockItems} onItemClick={handleItemClick} />);
    
    const button = screen.getByRole('button', { name: /Search in Restaurants/i });
    fireEvent.click(button);
    
    expect(handleItemClick).toHaveBeenCalledWith(mockItems[0]);
  });

  it('renders with single layout', () => {
    const { container } = render(
      <AdviceSection items={mockItems} layout="single" />
    );
    
    const grid = container.querySelector('.grid-cols-1');
    expect(grid).toBeInTheDocument();
  });

  it('renders with double layout', () => {
    const { container } = render(
      <AdviceSection items={mockItems} layout="double" />
    );
    
    const grid = container.querySelector('.grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('renders with triple layout', () => {
    const { container } = render(
      <AdviceSection items={mockItems} layout="triple" />
    );
    
    const grid = container.querySelector('.grid-cols-3');
    expect(grid).toBeInTheDocument();
  });

  it('renders mixed layout correctly', () => {
    render(<AdviceSection items={mockItems} layout="mixed" />);
    
    // All items should be rendered
    expect(screen.getByText('Restaurants')).toBeInTheDocument();
    expect(screen.getByText('Best Coffee Shops')).toBeInTheDocument();
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    render(<AdviceSection items={[]} />);
    
    expect(screen.getByText('Советы')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AdviceSection items={mockItems} className="custom-class" />
    );
    
    const section = container.firstChild;
    expect(section).toHaveClass('custom-class');
  });

  it('renders all component types correctly', () => {
    const allTypes: AdviceItem[] = [
      {
        type: 'meta-item',
        id: '1',
        title: 'Meta Item',
        categoryId: 'cat-1',
      },
      {
        type: 'meta-item-ad',
        id: '2',
        title: 'Ad Item',
        searchPhrase: 'search',
        isSponsored: true,
      },
      {
        type: 'cover',
        id: '3',
        title: 'Cover Item',
        imageUrl: '/img.jpg',
        collectionId: 'col-1',
      },
      {
        type: 'interesting',
        id: '4',
        title: 'Interesting Item',
        description: 'Description',
        imageUrl: '/test.png',
        featureId: 'feat-1',
      },
      {
        type: 'rd',
        id: '5',
        advertiserName: 'Advertiser',
        organizationId: 'org-1',
      },
    ];

    render(<AdviceSection items={allTypes} />);
    
    expect(screen.getByText('Meta Item')).toBeInTheDocument();
    expect(screen.getByText('Ad Item')).toBeInTheDocument();
    expect(screen.getByText('Cover Item')).toBeInTheDocument();
    expect(screen.getByText('Interesting Item')).toBeInTheDocument();
    expect(screen.getByText('Advertiser')).toBeInTheDocument();
  });
});