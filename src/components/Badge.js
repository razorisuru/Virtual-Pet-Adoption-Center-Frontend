import React from 'react';
import { MOOD_CONFIG } from '../utils/helpers';

const Badge = ({ type, text }) => {
  // For mood badges
  if (type === 'mood' && MOOD_CONFIG[text]) {
    const { color, textColor, icon } = MOOD_CONFIG[text];
    return (
      <span 
        className={`badge ${color} ${textColor} mood-indicator flex items-center gap-1`}
        title={MOOD_CONFIG[text].description}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </span>
    );
  }

  // For adoption status
  if (type === 'adoption') {
    return text === 'Adopted' ? (
      <span className="badge bg-purple-500 text-white">
        Adopted
      </span>
    ) : (
      <span className="badge bg-yellow-500 text-white">
        Available
      </span>
    );
  }

  // Default badge
  return (
    <span className="badge bg-gray-200 text-gray-800">
      {text}
    </span>
  );
};

export default Badge;