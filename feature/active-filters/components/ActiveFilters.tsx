import React from "react";

const ActiveFilters = () => {
  return (
    <div
      className="flex justify-between items-center px-6 py-3 bg-gray-50"
      aria-label="Filter controls"
    >
      <span className="text-gray-600 text-xs">Active Filters:</span>

      <div aria-live="polite" className="text-sm text-gray-600">
        <span className="sr-only">Found </span>
        12222 Results found.
      </div>
    </div>
  );
};

export default ActiveFilters;
