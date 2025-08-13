import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoryItem } from '@/components/molecules/StoryItem';

describe('StoryItem', () => {
  const defaultProps = {
    id: 'story-1',
    image: '/test-image.png',
    label: 'Test Story Label',
  };

  it('renders with required props', () => {
    render(<StoryItem {...defaultProps} />);
    
    const container = screen.getByText('Test Story Label').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('displays the label text', () => {
    render(<StoryItem {...defaultProps} />);
    
    expect(screen.getByText('Test Story Label')).toBeInTheDocument();
  });

  it('has correct nested structure', () => {
    const { container } = render(<StoryItem {...defaultProps} isViewed={false} />);
    
    // Check that we have the proper nested structure
    const borderContainer = container.querySelector('.rounded-2xl');
    expect(borderContainer).toBeInTheDocument();
    
    // Check that inner container with rounded-xl exists 
    const innerContainer = container.querySelector('div[style*="border-radius"]');
    expect(innerContainer).toBeInTheDocument();
  });

  it('renders without errors for both viewed states', () => {
    // Test unviewed state
    const { rerender } = render(<StoryItem {...defaultProps} isViewed={false} />);
    expect(screen.getByText('Test Story Label')).toBeInTheDocument();
    
    // Test viewed state
    rerender(<StoryItem {...defaultProps} isViewed={true} />);
    expect(screen.getByText('Test Story Label')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<StoryItem {...defaultProps} onClick={handleClick} />);
    
    const clickableDiv = container.firstChild;
    if (clickableDiv) {
      fireEvent.click(clickableDiv);
    }
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<StoryItem {...defaultProps} className="custom-class" />);
    
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('custom-class');
  });

  it('has proper dimensions', () => {
    const { container } = render(<StoryItem {...defaultProps} />);
    
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveStyle({ width: '104px', height: '120px' });
  });

  it('truncates long labels with line-clamp', () => {
    const longLabel = 'This is a very long story label that should be truncated after two lines of text';
    render(<StoryItem {...defaultProps} label={longLabel} />);
    
    const labelElement = screen.getByText(longLabel);
    expect(labelElement).toHaveClass('line-clamp-2');
  });

  it('has cursor pointer for clickable behavior', () => {
    const { container } = render(<StoryItem {...defaultProps} />);
    
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass('cursor-pointer');
  });
});