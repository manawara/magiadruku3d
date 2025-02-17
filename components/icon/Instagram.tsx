import React from "react";

const Instagram = ({ size = 16, color = "#ffffff" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hover:scale-110 transition-transform duration-100 ease-out"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8a4 4 0 0 1 3.37 3.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
    </svg>
  );
};

export default Instagram;
