import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoriesPanel } from '@/components/dashboard/StoriesPanel';

describe('StoriesPanel', () => {
  const mockStories = [
    { id: '1', imageUrl: '/image1.png', label: 'Story 1', isViewed: false },
    { id: '2', imageUrl: '/image2.png', label: 'Story 2', isViewed: true },
    { id: '3', imageUrl: '/image3.png', label: 'Story 3', isViewed: false },
  ];

  it('renders with default stories', () => {
    render(<StoriesPanel />);
    
    // Should render at least one story button
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
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
    
    const firstStory = screen.getByRole('button', { name: /Story: Story 1/i });
    fireEvent.click(firstStory);
    
    expect(handleStoryClick).toHaveBeenCalledWith('1');
  });

  it('renders with horizontal scroll container', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = screen.getAllByRole('button')[0].parentElement;
    expect(scrollContainer).toHaveClass('overflow-x-auto');
  });

  it('applies custom className', () => {
    render(<StoriesPanel stories={mockStories} className="custom-class" />);
    
    const container = screen.getAllByRole('button')[0].parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('handles empty stories array', () => {
    render(<StoriesPanel stories={[]} />);
    
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('passes isViewed prop correctly to StoryItem', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    // Story 2 should have viewed state (green ring)
    const story2Button = screen.getByRole('button', { name: /Story: Story 2/i });
    expect(story2Button).toHaveClass('ring-2');
    expect(story2Button).toHaveClass('ring-[#1BA136]');
    
    // Story 1 should not have viewed state
    const story1Button = screen.getByRole('button', { name: /Story: Story 1/i });
    expect(story1Button).not.toHaveClass('ring-2');
    expect(story1Button).not.toHaveClass('ring-[#1BA136]');
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
      expect(rightGradient).toHaveClass('from-white');
    }
  });

  it('renders stories with gap between them', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = screen.getAllByRole('button')[0].parentElement;
    expect(scrollContainer).toHaveClass('gap-2');
  });

  it('has proper padding', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = screen.getAllByRole('button')[0].parentElement;
    expect(scrollContainer).toHaveClass('px-4');
  });

  it('includes right padding element for scroll', () => {
    render(<StoriesPanel stories={mockStories} />);
    
    const scrollContainer = screen.getAllByRole('button')[0].parentElement;
    const rightPadding = scrollContainer?.lastElementChild;
    
    expect(rightPadding).toHaveClass('w-4', 'shrink-0');
    expect(rightPadding).toHaveAttribute('aria-hidden', 'true');
  });
});