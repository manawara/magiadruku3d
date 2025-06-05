"use client";

import React, { useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { toast, ToastContainer, type ToastPosition } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const notifyStyles = cva("fixed z-[9999] pointer-events-none", {
  variants: {
    position: {
      topRight: "top-4 right-4",
      topLeft: "top-4 left-4",
      bottomRight: "bottom-4 right-4",
      bottomLeft: "bottom-4 left-4",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    type: {
      success: "text-green-600",
      error: "text-red-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    position: "center",
    type: "info",
    size: "md",
  },
});

type NotyfiProps = {
  children?: React.ReactNode;
  className?: string;
  autoClose?: number;
  options?: VariantProps<typeof notifyStyles>;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  hasError: boolean;
  redirectTo?: string;
  successMessage?: string;
  pendingMessage?: string;
  errorMessage?: string;
};

export const Notyfi: React.FC<NotyfiProps> = ({
  children,
  className = "",
  options = {},
  isSubmitting,
  autoClose = 5000,
  isSubmitSuccessful,
  hasError,
  redirectTo,
  successMessage = "Product created successfully!",
  pendingMessage = "Creating product...",
  errorMessage = "Failed to create product",
}) => {
  const toastIdRef = useRef<string | number | null>(null);
  const prevSubmittingRef = useRef(isSubmitting);
  const prevSuccessRef = useRef(isSubmitSuccessful);
  const router = useRouter();

  const position = options.position ?? "center";

  useEffect(() => {
    const toastPosition = mapPosition(position);

    // ⏳ Pokazanie pending toasta
    if (isSubmitting && !prevSubmittingRef.current) {
      toastIdRef.current = toast.loading(pendingMessage, {
        position: toastPosition,
        theme: "light",
      });
    }

    if (!isSubmitting && prevSubmittingRef.current) {
      if (hasError) {
        if (toastIdRef.current) {
          toast.update(toastIdRef.current, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: autoClose,
            closeOnClick: true,
          });
        } else {
          toast.error(errorMessage, { autoClose: autoClose });
        }
      } else if (isSubmitSuccessful && !prevSuccessRef.current) {
        if (toastIdRef.current) {
          toast.update(toastIdRef.current, {
            render: successMessage,
            type: "success",
            isLoading: false,
            autoClose: autoClose,
            closeOnClick: true,
          });
        } else {
          toast.success(successMessage, { autoClose: autoClose });
        }

        if (redirectTo) {
          setTimeout(() => {
            router.push(redirectTo);
          }, autoClose);
        }
      }
    }

    // 🔄 Reset referencji, jeśli wszystko wróciło do stanu początkowego
    if (!isSubmitting && !isSubmitSuccessful && !hasError) {
      toastIdRef.current = null;
    }

    // 🔁 Zapamiętanie stanu na przyszłość
    prevSubmittingRef.current = isSubmitting;
    prevSuccessRef.current = isSubmitSuccessful;
  }, [
    isSubmitting,
    isSubmitSuccessful,
    hasError,
    position,
    autoClose,
    successMessage,
    pendingMessage,
    errorMessage,
    redirectTo,
    router,
  ]);

  return (
    <>
      <ToastContainer
        position={mapPosition(position)}
        autoClose={autoClose}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={`${notifyStyles({ ...options })} ${className}`}
      />
      {children}
    </>
  );
};

function mapPosition(
  position?: VariantProps<typeof notifyStyles>["position"]
): ToastPosition {
  switch (position) {
    case "topLeft":
      return "top-left";
    case "topRight":
      return "top-right";
    case "bottomLeft":
      return "bottom-left";
    case "bottomRight":
      return "bottom-right";
    case "center":
    default:
      return "top-center";
  }
}
