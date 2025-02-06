import Image from "next/image";
import React from "react";
import logoIcon from "@/public/magiaLogo.png";
import Link from "next/link";
const Logo = ({ size = 50 }) => {
  return (
    <Link href="/" className="inline-flex items-center group cursor-pointer">
      <Image
        src={logoIcon}
        width={size}
        alt="logo magiadruku3d"
        className="group-hover:scale-105 duration-300"
      />
      <span className="text-white uppercase font-bold font-arial text-shadow tracking-wide	">
        magia
      </span>
      <span className="text-white uppercase font-extralight font-arial text-shadow">
        druku3
      </span>
      <span className="text-white uppercase font-bold font-arial text-shadow ">
        d
      </span>
    </Link>
  );
};

export default Logo;
