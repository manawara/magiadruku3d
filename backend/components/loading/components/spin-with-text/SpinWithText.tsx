import { Loader2 } from "lucide-react";
import React from "react";

export const SpinWithText = ({ text }: { text: string }) => {
  return (
    <span className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      {text}
    </span>
  );
};

export default SpinWithText;
