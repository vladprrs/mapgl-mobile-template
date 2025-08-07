import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetaItemAd } from '@/components/dashboard/advice/MetaItemAd';

describe('MetaItemAd', () => {
  const defaultProps = {
    id: 'test-1',
    title: 'Test Advertiser',
    searchPhrase: 'test search',
    advertiserId: 'test-advertiser',
  };

  it('renders with required props', () => {
    render(<MetaItemAd {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Sponsored: Test Advertiser/i });
    expect(button).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<MetaItemAd {...defaultProps} />);
    
    expect(screen.getByText('Test Advertiser')).toBeInTheDocument();
  });

  it('displays advertisement label by default', () => {
    render(<MetaItemAd {...defaultProps} />);
    
    expect(screen.getByText('Реклама')).toBeInTheDocument();
  });

  it('does not display advertisement label when isSponsored is false', () => {
    render(<MetaItemAd {...defaultProps} isSponsored={false} />);
    
    expect(screen.queryByText('Реклама')).not.toBeInTheDocument();
  });

  it('renders with light theme by default', () => {
    render(<MetaItemAd {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('renders with dark theme when specified', () => {
    render(<MetaItemAd {...defaultProps} theme="Dark" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/[0.06]');
  });

  it('renders logo when logoUrl is provided', () => {
    const { container } = render(<MetaItemAd {...defaultProps} logoUrl="/test-logo.png" />);
    
    const logo = container.querySelector('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/test-logo.png');
  });

  it('applies gradient background when gradientMaskUrl is provided', () => {
    const { container } = render(
      <MetaItemAd 
        {...defaultProps} 
        gradientColor="#ff0000"
        gradientMaskUrl="/test-mask.svg"
      />
    );
    
    const gradientDiv = container.querySelector('[style*="mask"]');
    expect(gradientDiv).toBeInTheDocument();
    expect(gradientDiv).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MetaItemAd {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data attributes correctly', () => {
    render(<MetaItemAd {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-advertiser-id', 'test-advertiser');
    expect(button).toHaveAttribute('data-item-id', 'test-1');
  });

  it('applies custom className', () => {
    render(<MetaItemAd {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has fixed height of 116px', () => {
    render(<MetaItemAd {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[116px]');
  });

  it('has correct text styles for light theme', () => {
    render(<MetaItemAd {...defaultProps} theme="Light" />);
    
    const title = screen.getByText('Test Advertiser');
    expect(title).toHaveClass('text-[#141414]');
    
    const adLabel = screen.getByText('Реклама');
    expect(adLabel).toHaveClass('text-[rgba(20,20,20,0.3)]');
  });

  it('has correct text styles for dark theme', () => {
    render(<MetaItemAd {...defaultProps} theme="Dark" />);
    
    const title = screen.getByText('Test Advertiser');
    expect(title).toHaveClass('text-white');
    
    const adLabel = screen.getByText('Реклама');
    expect(adLabel).toHaveClass('text-white/30');
  });

  it('displays logo in circular container', () => {
    const { container } = render(<MetaItemAd {...defaultProps} logoUrl="/test-logo.png" />);
    
    const logoContainer = container.querySelector('.rounded-full');
    expect(logoContainer).toBeInTheDocument();
    expect(logoContainer).toHaveClass('w-12', 'h-12');
  });
});