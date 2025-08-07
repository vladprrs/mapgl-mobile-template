import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Interesting } from '@/components/dashboard/advice/Interesting';

describe('Interesting', () => {
  const defaultProps = {
    id: 'test-1',
    title: 'Test Feature',
    description: 'Test description',
    imageUrl: '/test-image.png',
    featureId: 'test-feature',
  };

  it('renders with required props', () => {
    render(<Interesting {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Feature: Test Feature/i });
    expect(button).toBeInTheDocument();
  });

  it('displays title and description', () => {
    render(<Interesting {...defaultProps} />);
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with light theme by default', () => {
    render(<Interesting {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('renders with dark theme when specified', () => {
    render(<Interesting {...defaultProps} theme="Dark" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/[0.06]');
  });

  it('displays badge when provided', () => {
    render(<Interesting {...defaultProps} badge="NEW" />);
    
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('displays action text when provided', () => {
    render(<Interesting {...defaultProps} actionText="Try it" />);
    
    expect(screen.getByText('Try it →')).toBeInTheDocument();
  });

  it('sets background image style', () => {
    const { container } = render(<Interesting {...defaultProps} />);
    
    const imageDiv = container.querySelector('[style*="background-image"]');
    expect(imageDiv).toHaveStyle({
      backgroundImage: `url('/test-image.png')`
    });
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Interesting {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data attributes correctly', () => {
    render(<Interesting {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-feature-id', 'test-feature');
    expect(button).toHaveAttribute('data-item-id', 'test-1');
  });

  it('applies custom className', () => {
    render(<Interesting {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has correct text styles for light theme', () => {
    render(<Interesting {...defaultProps} theme="Light" />);
    
    const title = screen.getByText('Test Feature');
    expect(title).toHaveClass('text-[#141414]');
    
    const description = screen.getByText('Test description');
    expect(description).toHaveClass('text-[#898989]');
  });

  it('has correct text styles for dark theme', () => {
    render(<Interesting {...defaultProps} theme="Dark" />);
    
    const title = screen.getByText('Test Feature');
    expect(title).toHaveClass('text-white');
    
    const description = screen.getByText('Test description');
    expect(description).toHaveClass('text-[#898989]');
  });

  it('has minimum height', () => {
    render(<Interesting {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('min-h-[244px]');
  });
});