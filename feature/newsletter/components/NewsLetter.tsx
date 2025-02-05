import React from "react";
import Input from "../../../components/input/Input";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
const NewsLetter = () => {
  return (
    <section className="bg-blue-700 py-12 px-4">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-gray-50 text-3xl font-semibold text-center mb-3">
          Subscribe to our newsletter
        </h2>
        <p className="text-center text-gray-100 mb-5">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>
        <div className="relative top-0 left-0 mb-4 fle flex-col justify-items-center">
          <Input
            placeholder="Email address"
            className="w-full p-3 sm:!px-3 sm:!py-4 "
          />
          <Button
            icon
            intent="primary"
            size="small"
            className="sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 mt-6 sm:mt-0 sm:max-w-max w-full"
          >
            SUBSCRIBE
          </Button>
        </div>
        <div className="mt-6 max-w-sm mx-auto">
          <Divider color="bg-gray-100" position="horizontal" />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
