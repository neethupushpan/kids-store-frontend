import React from "react";

const StarRating = ({ value, size = "text-base" }) => {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {rounded >= star ? (
            <span className="text-yellow-400">★</span>
          ) : rounded >= star - 0.5 ? (
            <span className="text-yellow-400">☆</span> // or half star if using icon
          ) : (
            <span className="text-gray-300">☆</span>
          )}
        </span>
      ))}
      <span className="ml-1 text-sm text-gray-500">({value.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
