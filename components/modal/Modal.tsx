import Overlay from "@/feature/header/components/menu-mobile/Overlay";
import useCloseOutside from "@/hooks/useCloseOutside";
import { ChildrenType } from "@/types";
import { X } from "lucide-react";
import React, { useRef } from "react";

type ModalProps = {
  onClose: () => void;
} & ChildrenType;

const Modal = ({ children, onClose }: ModalProps) => {
  const ModalRef = useRef(null);
  useCloseOutside(ModalRef, onClose);
  const leftSide = "fixed top-0 left-0 z-[9999] min-w-[340px] bottom-0";

  return (
    <>
      <Overlay onClose={onClose} />
      <div className={`${leftSide} p-4 bg-white `} ref={ModalRef}>
        <X className="ml-auto cursor-pointer" onClick={onClose} />

        {children}
      </div>
    </>
  );
};

export default Modal;
