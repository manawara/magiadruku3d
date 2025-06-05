import Overlay from "@/feature/header/components/menu-mobile/Overlay";
import useCloseOutside from "@/hooks/useCloseOutside";
import { ChildrenType } from "@/types";
import { X } from "lucide-react";
import React, { useRef } from "react";

type ModalProps = {
  onClose: () => void;
  isClose?: boolean;
} & ChildrenType;

const Modal = ({ children, onClose, isClose }: ModalProps) => {
  const ModalRef = useRef(null);
  useCloseOutside(ModalRef, onClose);
  const centerSide =
    "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] min-w-[340px]";

  return (
    <>
      <Overlay onClose={onClose} />
      <div className={`${centerSide} p-4 bg-white `} ref={ModalRef}>
        {isClose && <X className="ml-auto cursor-pointer" onClick={onClose} />}
        {children}
      </div>
    </>
  );
};

export default Modal;
