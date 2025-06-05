import { BellRing } from "lucide-react";
import React from "react";

const Notification = () => {
  return (
    <div className="relative top-0 left-0">
      <div className="relative top-0 left-0">
        <BellRing
          strokeWidth={2}
          size={18}
          className="text-gray-60 cursor-pointe"
        />
        <div className="absolute top-0 right-0 size-2 rounded-full bg-dangerBackend-600"></div>
      </div>
    </div>
  );
};

export default Notification;
