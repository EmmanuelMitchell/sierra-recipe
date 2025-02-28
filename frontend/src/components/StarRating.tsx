import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  totalStars = 5,
  onRate,
  readOnly = false,
  size = 'md'
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    if (readOnly) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onRate) {
      onRate(newRating);
    }
  };

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const starSize = starSizes[size];

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const isActive = (hoverRating || rating) > index;
        
        return (
          <div
            key={index}
            className={`cursor-${readOnly ? 'default' : 'pointer'} p-1`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHoverRating(index + 1)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          >
            <Star
              className={`${starSize} ${
                isActive
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              } transition-colors duration-150`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;