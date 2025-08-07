import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Cover } from '@/components/dashboard/advice/Cover';

describe('Cover', () => {
  const defaultProps = {
    id: 'test-1',
    title: 'Лучшие кофейни Москвы',
    imageUrl: '/test-image.jpg',
    collectionId: 'best-coffee',
  };

  it('renders with required props', () => {
    render(<Cover {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Collection: Лучшие кофейни Москвы/i });
    expect(button).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<Cover {...defaultProps} />);
    
    expect(screen.getByText('Лучшие кофейни Москвы')).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(<Cover {...defaultProps} subtitle="Где выпить идеальный капучино" />);
    
    expect(screen.getByText(/Где выпить идеальный капучино/)).toBeInTheDocument();
  });

  it('displays item count when provided', () => {
    render(<Cover {...defaultProps} itemCount={25} />);
    
    expect(screen.getByText(/25 мест/)).toBeInTheDocument();
  });

  it('displays author when provided', () => {
    render(<Cover {...defaultProps} author="2GIS" />);
    
    expect(screen.getByText(/2GIS/)).toBeInTheDocument();
  });

  it('combines subtitle, itemCount and author with separator', () => {
    render(
      <Cover 
        {...defaultProps} 
        subtitle="Где выпить идеальный капучино"
        itemCount={25}
        author="2GIS"
      />
    );
    
    expect(screen.getByText('Где выпить идеальный капучино · 25 мест · 2GIS')).toBeInTheDocument();
  });

  it('correctly pluralizes item count', () => {
    const { rerender } = render(<Cover {...defaultProps} itemCount={1} />);
    expect(screen.getByText(/1 место/)).toBeInTheDocument();
    
    rerender(<Cover {...defaultProps} itemCount={2} />);
    expect(screen.getByText(/2 места/)).toBeInTheDocument();
    
    rerender(<Cover {...defaultProps} itemCount={5} />);
    expect(screen.getByText(/5 мест/)).toBeInTheDocument();
  });

  it('has default height of 116px', () => {
    render(<Cover {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[116px]');
  });

  it('has big height of 244px when state is Big', () => {
    render(<Cover {...defaultProps} state="Big" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[244px]');
  });

  it('applies background image', () => {
    const { container } = render(<Cover {...defaultProps} />);
    
    const bgDiv = container.querySelector('[style*="background-image"]');
    expect(bgDiv).toHaveStyle({ backgroundImage: `url('/test-image.jpg')` });
  });

  it('has gradient overlay in default state', () => {
    const { container } = render(<Cover {...defaultProps} state="Default" />);
    
    const gradientDiv = container.querySelector('[style*="linear-gradient"]');
    expect(gradientDiv).toBeInTheDocument();
    // Check that the style attribute contains linear-gradient
    const style = gradientDiv?.getAttribute('style');
    expect(style).toContain('linear-gradient');
  });

  it('has simple overlay in big state', () => {
    const { container } = render(<Cover {...defaultProps} state="Big" />);
    
    // Should not have gradient in big state
    const gradientDiv = container.querySelector('[style*="linear-gradient"]');
    expect(gradientDiv).not.toBeInTheDocument();
    
    // Should have simple overlay instead
    const overlayDiv = container.querySelector('.bg-black\\/40');
    expect(overlayDiv).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Cover {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data attributes correctly', () => {
    render(<Cover {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-collection-id', 'best-coffee');
    expect(button).toHaveAttribute('data-item-id', 'test-1');
  });

  it('applies custom className', () => {
    render(<Cover {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has rounded corners', () => {
    render(<Cover {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-xl');
  });

  it('has white background base', () => {
    render(<Cover {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('has correct text styles', () => {
    render(
      <Cover 
        {...defaultProps} 
        subtitle="Test subtitle"
      />
    );
    
    const title = screen.getByText('Лучшие кофейни Москвы');
    expect(title).toHaveClass('font-medium', 'text-[16px]', 'leading-5', 'tracking-[-0.24px]', 'text-white');
    
    const subtitle = screen.getByText(/Test subtitle/);
    expect(subtitle).toHaveClass('text-[13px]', 'leading-4', 'tracking-[-0.234px]', 'text-white');
  });

  it('has border overlay', () => {
    const { container } = render(<Cover {...defaultProps} />);
    
    const borderDiv = container.querySelector('.border-\\[0\\.5px\\]');
    expect(borderDiv).toBeInTheDocument();
    expect(borderDiv).toHaveClass('border-[rgba(137,137,137,0.3)]');
  });

  it('applies active scale on press', () => {
    render(<Cover {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('active:scale-95');
  });
});