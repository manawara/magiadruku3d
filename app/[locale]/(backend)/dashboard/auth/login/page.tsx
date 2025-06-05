import { Dock } from "lucide-react";
import React from "react";
import dashboardIcon from "@/public/dashboard.jpg";
import Image from "next/image";
import Heading from "@/backend/components/heading/Heading";
import FormLogin from "@/backend/feature/form/components/form-login/FormLogin";
import Link from "next/link";

const AuthLogin = () => {
  return (
    <div className="container mx-auto lg:h-screen flex items-center">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 mt-8 lg:mt-0 flex justify-center gap-4 items-center">
          <Dock size={32} />
          <Heading tag="h1" size="xxl" weight="semi">
            Dashboard admin
          </Heading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg shadow-[0_3px_10px_1px_rgba(0,0,0,0.3)] m-4 pb-4 lg:pb-0">
          <Image
            src={dashboardIcon}
            alt="Dashboard image"
            className="max-h-[400px] object-cover"
          />
          <div className="my-auto">
            <FormLogin />
            <span className="flex justify-center text-primaryBackend-400 text-xs">
              Don’t have account!
              <Link href="./register" className="font-semibold ml-1">
                {" "}
                Create Account{" "}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
