import React from "react";
import Input from "../../../components/input/Input";
import Button from "@/components/button/Button";
const NewsLetter = () => {
  return (
    <section className="bg-blue-700 py-12">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-gray-50 text-3xl font-semibold text-center mb-3">
          Subscribe to our newsletter
        </h2>
        <p className="text-center text-gray-100 mb-5">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>
        <div className="relative top-0 left-0">
          <Input placeholder="Email address" className="!py-4 w-full !px-3" />
          <Button
            icon
            intent="primary"
            size="small"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            SUBSCRIBE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
