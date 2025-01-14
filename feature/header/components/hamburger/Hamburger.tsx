"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import Overlay from "../menu-mobile/Overlay";
import Menu from "../menu-mobile/MenuMobile";

const Hamburger = () => {
  const [open, setOpen] = useState(false);

  const handleOpenHamburger = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <HamburgerButton open={open} onClick={handleOpenHamburger} />

      <AnimatePresence>
        {open && (
          <>
            <Overlay onClose={handleOpenHamburger} />
            <Menu onClose={handleOpenHamburger} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hamburger;
