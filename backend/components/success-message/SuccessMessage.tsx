import React from "react";
type ErrorMessageType = {
  message: string;
  className?: string;
};
const SuccessMessage = ({ message, className }: ErrorMessageType) => {
  return (
    <span className={`${className} text-xs text-successBackend-500`}>
      {message}
    </span>
  );
};

export default SuccessMessage;
