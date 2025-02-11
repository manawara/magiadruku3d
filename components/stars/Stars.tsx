import { Star } from "lucide-react";
import React from "react";
const colorMap: Record<string, string> = {
  red: "fill-red-500",
  yellow: "fill-yellow-500",
  blue: "fill-blue-500",
  green: "fill-green-500",
  // Add more colors as needed
};
const Stars = ({ rating = 0, size = 19, count = 0, color = "red" }) => {
  const stars = Array.from({ length: rating }, (_, index) => index);
  const allStars = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="flex gap-[2px] items-center my-2">
      {allStars.map((star, index) => (
        <Star
          key={star}
          className={`${
            index === stars[index]
              ? colorMap[color] || "fill-yellow-500"
              : "fill-transparent stroke-gray-400 stroke-1"
          }`}
          strokeWidth={0}
          size={size}
        />
      ))}
      <span className="text-gray-500 font-light text-xs ml-2">({count})</span>
    </div>
  );
};

export default Stars;
