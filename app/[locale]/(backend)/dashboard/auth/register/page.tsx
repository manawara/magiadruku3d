import { Dock } from "lucide-react";
import React from "react";
import dashboardIcon from "@/public/dashboard.jpg";
import Image from "next/image";
import Heading from "@/backend/components/heading/Heading";
import FormRegister from "@/backend/feature/form/components/form-register/FormRegister";
import Link from "next/link";

const AuthRegister = () => {
  return (
    <div className="container mx-auto lg:h-screen flex items-center m-4">
      <div className="">
        <div className="mb-8 flex justify-center gap-4 items-center">
          <Dock size={32} />
          <Heading tag="h1" size="xxl" weight="semi">
            Dashboard admin
          </Heading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg shadow-[0_3px_10px_1px_rgba(0,0,0,0.3)]">
          <Image
            src={dashboardIcon}
            alt="Dashboard image"
            className="max-h-[450px] object-cover"
          />
          <div className="my-auto pb-4">
            <FormRegister />
            <span className="flex justify-center text-primaryBackend-400 text-xs">
              Already have account!
              <Link href="./login" className="font-semibold ml-1">
                Log In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRegister;
