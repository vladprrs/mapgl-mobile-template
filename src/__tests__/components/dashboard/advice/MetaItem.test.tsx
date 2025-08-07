import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetaItem } from '@/components/dashboard/advice/MetaItem';

describe('MetaItem', () => {
  const defaultProps = {
    id: 'test-1',
    title: 'Test Category',
    categoryId: 'test-category',
  };

  it('renders with required props', () => {
    render(<MetaItem {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Search in Test Category/i });
    expect(button).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<MetaItem {...defaultProps} />);
    
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(<MetaItem {...defaultProps} subtitle="Test Subtitle" />);
    
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders icon when iconUrl is provided', () => {
    const { container } = render(<MetaItem {...defaultProps} iconUrl="/test-icon.png" />);
    
    const icon = container.querySelector('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/test-icon.png');
  });

  it('renders with light theme by default', () => {
    render(<MetaItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('renders with dark theme when specified', () => {
    render(<MetaItem {...defaultProps} theme="Dark" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/[0.06]');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MetaItem {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data attributes correctly', () => {
    render(<MetaItem {...defaultProps} searchQuery="test query" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-category-id', 'test-category');
    expect(button).toHaveAttribute('data-item-id', 'test-1');
  });

  it('applies custom className', () => {
    render(<MetaItem {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has fixed height of 116px', () => {
    render(<MetaItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[116px]');
  });

  it('displays icon in circular background', () => {
    const { container } = render(<MetaItem {...defaultProps} iconUrl="/test-icon.png" />);
    
    const iconContainer = container.querySelector('.rounded-full');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('w-12', 'h-12');
  });

  it('has correct text styles for light theme', () => {
    render(<MetaItem {...defaultProps} theme="Light" subtitle="Test subtitle" />);
    
    const title = screen.getByText('Test Category');
    expect(title).toHaveClass('text-[#141414]');
    
    const subtitle = screen.getByText('Test subtitle');
    expect(subtitle).toHaveClass('text-[#898989]');
  });

  it('has correct text styles for dark theme', () => {
    render(<MetaItem {...defaultProps} theme="Dark" subtitle="Test subtitle" />);
    
    const title = screen.getByText('Test Category');
    expect(title).toHaveClass('text-white');
    
    const subtitle = screen.getByText('Test subtitle');
    expect(subtitle).toHaveClass('text-[#898989]');
  });
});