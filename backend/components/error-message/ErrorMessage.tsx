import React from "react";
type ErrorMessageType = {
  message: string;
  className?: string;
};
const ErrorMessage = ({ message, className }: ErrorMessageType) => {
  return (
    <span className={`${className} text-xs text-dangerBackend-500`}>
      {message}
    </span>
  );
};

export default ErrorMessage;
