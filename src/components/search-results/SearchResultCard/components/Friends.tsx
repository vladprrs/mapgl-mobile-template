import React from 'react';
import { Friend } from '../SearchResultCard.types';

interface FriendsProps {
  friends: Friend[];
}

export const Friends: React.FC<FriendsProps> = ({ friends }) => {
  const displayFriends = friends.slice(0, 4);
  const remaining = friends.length - displayFriends.length;

  return (
    <div className="flex items-center gap-1 py-1">
      {/* Avatar stack with overlap */}
      <div className="flex items-center">
        {displayFriends.map((friend, index) => (
          <div
            key={friend.id}
            className="relative w-6 h-6"
            style={{ 
              marginLeft: index > 0 ? '-12px' : '0',
              zIndex: displayFriends.length - index
            }}
          >
            <img
              src={friend.avatar}
              alt={friend.name || ''}
              className="w-6 h-6 rounded-full object-cover border border-white"
              style={{
                clipPath: index < displayFriends.length - 1 
                  ? 'polygon(0 0, calc(100% - 12px) 0, calc(100% - 12px) 100%, 0 100%)'
                  : undefined
              }}
            />
          </div>
        ))}
        
        {remaining > 0 && (
          <div
            className="relative flex items-center justify-center h-6 px-1.5 py-[3px] bg-[#1BA136] rounded-full"
            style={{ 
              marginLeft: '-12px',
              zIndex: 0,
              minWidth: '24px'
            }}
          >
            <span 
              className="font-medium text-white text-center"
              style={{ 
                fontSize: '14px',
                letterSpacing: '-0.28px',
                lineHeight: '18px'
              }}
            >
              +{remaining}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};