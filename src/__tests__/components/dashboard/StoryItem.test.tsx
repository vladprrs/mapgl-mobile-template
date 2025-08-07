import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoryItem } from '@/components/dashboard/StoryItem';

describe('StoryItem', () => {
  const defaultProps = {
    id: 'story-1',
    imageUrl: '/test-image.png',
    label: 'Test Story Label',
  };

  it('renders with required props', () => {
    render(<StoryItem {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Story: Test Story Label/i });
    expect(button).toBeInTheDocument();
  });

  it('displays the label text', () => {
    render(<StoryItem {...defaultProps} />);
    
    expect(screen.getByText('Test Story Label')).toBeInTheDocument();
  });

  it('sets background image style', () => {
    render(<StoryItem {...defaultProps} />);
    
    const imageContainer = screen.getByRole('button').querySelector('[style*="background-image"]');
    expect(imageContainer).toHaveStyle({
      backgroundImage: `url('/test-image.png')`
    });
  });

  it('shows green border when viewed', () => {
    const { rerender } = render(<StoryItem {...defaultProps} isViewed={false} />);
    
    // Should not have green border initially
    let button = screen.getByRole('button');
    expect(button).not.toHaveStyle({ boxShadow: 'inset 0 0 0 2px #1BA136' });
    
    // Should have green inset border when viewed
    rerender(<StoryItem {...defaultProps} isViewed={true} />);
    button = screen.getByRole('button');
    expect(button).toHaveStyle({ boxShadow: 'inset 0 0 0 2px #1BA136' });
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<StoryItem {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<StoryItem {...defaultProps} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('sets data-story-id attribute', () => {
    render(<StoryItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-story-id', 'story-1');
  });

  it('has proper dimensions', () => {
    render(<StoryItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[120px]', 'w-[104px]');
  });

  it('truncates long labels with line-clamp', () => {
    const longLabel = 'This is a very long story label that should be truncated after two lines of text';
    render(<StoryItem {...defaultProps} label={longLabel} />);
    
    const labelElement = screen.getByText(longLabel);
    expect(labelElement).toHaveClass('line-clamp-2');
  });

  it('has proper accessibility attributes', () => {
    render(<StoryItem {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Story: Test Story Label');
  });
});