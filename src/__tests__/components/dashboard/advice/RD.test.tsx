import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RD } from '@/components/dashboard/advice/RD';

describe('RD', () => {
  const defaultProps = {
    id: 'test-1',
    advertiserName: 'Geraldine',
    organizationId: 'geraldine',
  };

  it('renders with required props', () => {
    render(<RD {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Advertiser: Geraldine/i });
    expect(button).toBeInTheDocument();
  });

  it('displays advertiser name', () => {
    render(<RD {...defaultProps} />);
    
    expect(screen.getByText('Geraldine')).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(<RD {...defaultProps} subtitle="Необистро" />);
    
    expect(screen.getByText('Необистро')).toBeInTheDocument();
  });

  it('displays rating when provided', () => {
    render(<RD {...defaultProps} rating="4.6" />);
    
    expect(screen.getByText('4.6')).toBeInTheDocument();
  });

  it('displays distance when provided', () => {
    render(<RD {...defaultProps} distance="1.4 км" />);
    
    expect(screen.getByText('1.4 км')).toBeInTheDocument();
  });

  it('displays address when provided', () => {
    render(<RD {...defaultProps} address="Тверская 32/12, 1 этаж" />);
    
    expect(screen.getByText('Тверская 32/12, 1 этаж')).toBeInTheDocument();
  });

  it('renders images when provided', () => {
    const { container } = render(
      <RD 
        {...defaultProps} 
        images={['/img1.jpg', '/img2.jpg']}
      />
    );
    
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/img1.jpg');
    expect(images[1]).toHaveAttribute('src', '/img2.jpg');
  });

  it('displays remaining count when more than 2 images', () => {
    render(
      <RD 
        {...defaultProps} 
        images={['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg']}
      />
    );
    
    // Should show 3 more images (5 total - 2 displayed)
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays 999+ when more than 1001 images', () => {
    const manyImages = Array(1002).fill('/img.jpg');
    render(
      <RD 
        {...defaultProps} 
        images={manyImages}
      />
    );
    
    expect(screen.getByText('999+')).toBeInTheDocument();
  });

  it('renders with light theme by default', () => {
    render(<RD {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('renders with dark theme when specified', () => {
    render(<RD {...defaultProps} theme="Dark" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/[0.06]');
  });

  it('shows verified badge when isVerified is true', () => {
    const { container } = render(<RD {...defaultProps} isVerified={true} />);
    
    // Check for crown/verified SVG icon
    const svg = container.querySelector('svg.ml-1');
    expect(svg).toBeInTheDocument();
  });

  it('does not show verified badge when isVerified is false', () => {
    const { container } = render(<RD {...defaultProps} isVerified={false} />);
    
    // Check that crown/verified SVG icon is not present
    const svg = container.querySelector('svg.ml-1');
    expect(svg).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<RD {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets data attributes correctly', () => {
    render(
      <RD 
        {...defaultProps} 
        establishmentIds={['est-1', 'est-2']}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-organization-id', 'geraldine');
    expect(button).toHaveAttribute('data-item-id', 'test-1');
  });

  it('applies custom className', () => {
    render(<RD {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has fixed height of 244px', () => {
    render(<RD {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[244px]');
  });

  it('shows star icon with rating', () => {
    const { container } = render(<RD {...defaultProps} rating="4.6" />);
    
    // Check for star SVG
    const starSvg = container.querySelector('svg');
    expect(starSvg).toBeInTheDocument();
    expect(starSvg?.querySelector('path')).toHaveAttribute('fill', '#EFA701');
  });

  it('has correct text styles for light theme', () => {
    render(
      <RD 
        {...defaultProps} 
        subtitle="Необистро"
        rating="4.6"
        distance="1.4 км"
        address="Тверская 32/12"
        theme="Light"
      />
    );
    
    const title = screen.getByText('Geraldine');
    expect(title).toHaveClass('text-[#141414]');
    
    const subtitle = screen.getByText('Необистро');
    expect(subtitle).toHaveClass('text-[#898989]');
  });

  it('has correct text styles for dark theme', () => {
    render(
      <RD 
        {...defaultProps} 
        subtitle="Необистро"
        rating="4.6"
        theme="Dark"
      />
    );
    
    const title = screen.getByText('Geraldine');
    expect(title).toHaveClass('text-white');
    
    const subtitle = screen.getByText('Необистро');
    expect(subtitle).toHaveClass('text-[#898989]');
  });

  it('adjusts content positioning when images are present', () => {
    const { rerender } = render(<RD {...defaultProps} />);
    
    // Without images
    let content = document.querySelector('[class*="flex flex-col justify-between"]');
    expect(content).toHaveClass('top-0', 'p-4');
    
    // With images - content starts at top-[116px] (8px padding + 100px gallery + 8px gap)
    rerender(<RD {...defaultProps} images={['/img1.jpg', '/img2.jpg']} />);
    content = document.querySelector('[class*="flex flex-col justify-between"]');
    expect(content).toHaveClass('top-[116px]', 'pb-3', 'px-4');
  });
});