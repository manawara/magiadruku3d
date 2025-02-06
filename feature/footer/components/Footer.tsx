import React from "react";
import Logo from "@/components/logo/Logo";
import Contact from "./Contact";
import CategoryList from "./CategoryList";
import Tag from "@/components/tag/Tag";
const Footer = () => {
  return (
    <footer className="px-3 py-10 max-md:pb-20  bg-gray-950">
      <div className=" flex flex-col min-[400px]:flex-row sm:justify-evenly flex-wrap gap-8 justify-items-start lg:grid md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col gap-3 text-gray-50 ">
          <Logo size={70} />
          <Contact />
        </div>
        <div>
          <CategoryList title="Top Category" isAllProductLink />
        </div>
        <div>
          <CategoryList title="Quick Links" />
        </div>
        <div className="flex-col">
          <h3 className="uppercase text-lg text-gray-50 font-semibold mt-5 mb-4">
            popular tag
          </h3>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            <li>
              <Tag color="tertiary">sss</Tag>
            </li>
            v
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
