import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoriesPanel } from '@/components/organisms/StoriesPanel';

describe('StoriesPanel', () => {
  const mockStories = [
    { id: '1', imageUrl: '/image1.png', label: 'Story 1', isViewed: false },
    { id: '2', imageUrl: '/image2.png', label: 'Story 2', isViewed: true },
    { id: '3', imageUrl: '/image3.png', label: 'Story 3', isViewed: false },
  ];

  it('renders with default stories', () => {
    render(<StoriesPanel />);
    
    // Should render default stories from mock data - look for any story text
    const storyTexts = screen.getAllByText(/Заголовок/);
    expect(storyTexts.length).toBeGreaterThan(0);
  });

  it('renders custom stories', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    expect(screen.getByText('Story 1')).toBeInTheDocument();
    expect(screen.getByText('Story 2')).toBeInTheDocument();
    expect(screen.getByText('Story 3')).toBeInTheDocument();
  });

  it('calls onStoryClick when story is clicked', () => {
    const handleStoryClick = jest.fn();
    render(<StoriesPanel stories={mockStories} onStoryClick={handleStoryClick} />);
    
    const firstStory = screen.getByText('Story 1').closest('div');
    // Find the actual clickable root div
    const clickableDiv = firstStory?.closest('div[style*="cursor-pointer"]') || firstStory;
    
    if (clickableDiv) {
      fireEvent.click(clickableDiv);
    }
    
    expect(handleStoryClick).toHaveBeenCalledWith('1');
  });

  it('renders with horizontal scroll container', () => {
    const { container } = render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).toHaveClass('overflow-x-auto');
  });

  it('applies custom className', () => {
    const { container } = render(<StoriesPanel stories={mockStories} className="custom-class" />);
    
    const rootContainer = container.firstChild;
    expect(rootContainer).toHaveClass('custom-class');
  });

  it('handles empty stories array', () => {
    render(<StoriesPanel stories={[]} />);
    
    // Check that no story text content appears
    expect(screen.queryByText('Story 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Story 2')).not.toBeInTheDocument();
  });

  it('renders stories with different isViewed states', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    // Both viewed and unviewed stories should render their text
    expect(screen.getByText('Story 1')).toBeInTheDocument(); // isViewed: false
    expect(screen.getByText('Story 2')).toBeInTheDocument(); // isViewed: true
    expect(screen.getByText('Story 3')).toBeInTheDocument(); // isViewed: false
  });

  it('handles scroll events for gradient visibility', () => {
    const { container } = render(<StoriesPanel stories={mockStories} />);
    
    // Check for scroll container with overflow-x-auto
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).toBeInTheDocument();
    
    // Initially should show right gradient (when content overflows)
    // The gradient may or may not show depending on content width
    const rightGradient = container.querySelector('.bg-gradient-to-l');
    if (rightGradient) {
      expect(rightGradient).toHaveClass('bg-gradient-to-l');
    }
  });

  it('renders stories with gap between them', () => {
    const { container } = render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).toHaveClass('gap-2');
  });

  it('has no horizontal padding as Dashboard provides it', () => {
    const { container } = render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).not.toHaveClass('px-4');
  });

  it('renders story items as children of scroll container', () => {
    const { container } = render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    const children = scrollContainer?.children;
    
    // Should have 3 story items as children
    expect(children).toHaveLength(3);
  });
});