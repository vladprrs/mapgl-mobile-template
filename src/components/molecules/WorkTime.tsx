import React from 'react';
import { WorkingHours } from '../SearchResultCard.types';

interface WorkTimeProps {
  workingHours: WorkingHours;
}

export const WorkTime: React.FC<WorkTimeProps> = ({ workingHours }) => {
  const getColor = () => {
    switch (workingHours.status) {
      case 'open':
      case 'opening-soon':
        return '#1BA136'; // Green
      case 'closing-soon':
        return '#F5373C'; // Red
      case 'closed':
      default:
        return '#898989'; // Gray
    }
  };

  return (
    <div 
      className="font-medium"
      style={{ 
        fontSize: '14px',
        letterSpacing: '-0.28px',
        lineHeight: '18px',
        color: workingHours.color || getColor()
      }}
    >
      {workingHours.text}
    </div>
  );
};