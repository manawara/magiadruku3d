import { Loader2 } from "lucide-react";
import React from "react";

const SpinLoader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="pl-2 text-sm">Loading</span>
    </div>
  );
};

export default SpinLoader;
