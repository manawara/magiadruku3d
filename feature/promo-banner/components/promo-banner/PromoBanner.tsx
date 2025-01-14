import { X } from "lucide-react";
import React from "react";

const PromoBanner = () => {
  return (
    <aside className="bg-gray-900 py-2 text-white flex relative top-0 left-0 min-h-12">
      <button
        aria-label="close promo banner"
        className="p-2  rounded-sm bg-gray-800 right-4 absolute top-1/2 -translate-y-1/2 hover:scale-105 duration-200"
      >
        <X className="size-4" />
      </button>
    </aside>
  );
};

export default PromoBanner;
