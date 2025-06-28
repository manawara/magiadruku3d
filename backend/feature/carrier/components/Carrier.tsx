"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import placeHolderIcon from "@/public/placeholder.png";

const Checkbox = ({
  active = false,
  onClick,
}: {
  active?: boolean;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <motion.div
      className={`size-6 min-h-6 min-w-6 rounded-md border cursor-pointer flex items-center justify-center shadow-md transition-colors duration-300 ${
        active
          ? "bg-gradient-to-br from-sky-400 to-indigo-500 border-transparent bg-primaryBackend-200"
          : "bg-white border-primaryBackend-200 hover:border-blue-400"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
    >
      <AnimatePresence>
        {active && (
          <motion.svg
            key="check"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-4 h-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <path
              fillRule="evenodd"
              d="M20.285 6.709a1 1 0 00-1.41-1.418L9 15.172l-3.876-3.877a1 1 0 00-1.415 1.415l4.586 4.586a1 1 0 001.415 0l10.575-10.586z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

type CarrierType = {
  image: string;
  isActive?: boolean;
  name: string;
};

const Carrier = ({
  image,
  isActive = false,
  name = "DPD",
  onToogle,
}: CarrierType & { onToogle: (name: string) => void }) => {
  const active = isActive;

  const handleClickActive = () => {
    onToogle(name);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToogle(name);
  };

  return (
    <div
      className={`flex cursor-pointer p-4 border border-solid border-primaryBackend-200 items-center rounded-lg gap-3 delay-100 ${
        active ? "bg-primaryBackend-100" : ""
      }`}
      onClick={handleClickActive}
    >
      <Checkbox active={active} onClick={handleCheckboxClick} />
      <Image
        width={80}
        height={20}
        src={image || placeHolderIcon}
        alt={name}
        className="min-h-20 max-h-32 w-full max-w-20 rounded-xl object-contain"
        unoptimized
      />
      <div
        className={`ml-8 ${
          active ? "text-grayBackned-900" : "text-primaryBackend-400 "
        }`}
      >
        {name}
      </div>
    </div>
  );
};

export default Carrier;
