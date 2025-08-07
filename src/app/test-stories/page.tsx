'use client';

import React, { useState } from 'react';
import { StoryItem } from '@/components/dashboard/StoryItem';
import { StoriesPanel } from '@/components/dashboard/StoriesPanel';

function InteractiveStories() {
  const [viewedStates, setViewedStates] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false });
  
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">Click the stories below to test state transitions:</p>
      <div className="flex gap-4">
        {[1, 2, 3].map((num) => (
          <StoryItem
            key={num}
            id={`interactive-${num}`}
            imageUrl="/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png"
            label={`Story ${num}`}
            isViewed={viewedStates[num]}
            onClick={() => setViewedStates(prev => ({ ...prev, [num]: !prev[num] }))}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">Click to toggle viewed state</p>
    </div>
  );
}

export default function TestStoriesPage() {
  const [clickedStory, setClickedStory] = useState<string | null>(null);
  
  const testStories = [
    { id: '1', imageUrl: '/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png', label: 'Not Viewed Story', isViewed: false },
    { id: '2', imageUrl: '/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png', label: 'Viewed Story', isViewed: true },
    { id: '3', imageUrl: '/assets/stories/6db4130db09497160e078c4e5160e605753cdc52.png', label: 'Another Not Viewed', isViewed: false },
    { id: '4', imageUrl: '/assets/stories/5738e1bc9a25d52bf21144f9c160f545681e96d7.png', label: 'Another Viewed', isViewed: true },
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Story Component Test Page</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Individual Story States</h2>
          <div className="flex gap-4 items-start">
            <div className="text-center">
              <StoryItem
                id="test-1"
                imageUrl="/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png"
                label="Not Viewed"
                isViewed={false}
                onClick={() => alert('Clicked not viewed story')}
              />
              <p className="text-sm mt-2">Not Viewed</p>
            </div>
            
            <div className="text-center">
              <StoryItem
                id="test-2"
                imageUrl="/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png"
                label="Viewed Story"
                isViewed={true}
                onClick={() => alert('Clicked viewed story')}
              />
              <p className="text-sm mt-2">Viewed (Green Border)</p>
            </div>
            
            <div className="text-center">
              <StoryItem
                id="test-3"
                imageUrl="/assets/stories/6db4130db09497160e078c4e5160e605753cdc52.png"
                label="Long story title that wraps to multiple lines"
                isViewed={false}
                onClick={() => alert('Clicked story with long title')}
              />
              <p className="text-sm mt-2">Long Title</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Focus States (Tab to see focus ring)</h2>
          <div className="flex gap-4 items-start">
            <StoryItem
              id="focus-1"
              imageUrl="/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png"
              label="Tab to focus"
              isViewed={false}
              onClick={() => console.log('Focus test 1')}
            />
            <StoryItem
              id="focus-2"
              imageUrl="/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png"
              label="Viewed + Focus"
              isViewed={true}
              onClick={() => console.log('Focus test 2')}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Use Tab key to navigate. Focus ring should only appear on keyboard navigation, not on click.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Stories Panel</h2>
          <StoriesPanel 
            stories={testStories}
            onStoryClick={(id) => {
              setClickedStory(id);
              console.log('Story clicked:', id);
            }}
          />
          {clickedStory && (
            <p className="text-sm text-gray-600 mt-2">
              Last clicked: Story {clickedStory}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Interactive State Test</h2>
          <InteractiveStories />
        </section>
      </div>
    </div>
  );
}