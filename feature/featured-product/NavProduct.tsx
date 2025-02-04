import ButtonHighlight from "@/components/button/ButtonHighlight";
import ButtonLink from "@/components/button/ButtonLink";
import React from "react";

const NavProduct = () => {
  return (
    <nav>
      <ul className="flex items-center gap-2 max-sm:gap-1 text-sm max-sm:flex-col">
        <li>
          <ButtonHighlight color="primary" isActive>
            All product
          </ButtonHighlight>
        </li>
        <li>
          <ButtonHighlight color="primary">SmartPhone</ButtonHighlight>
        </li>
        <li>
          <ButtonHighlight color="primary">Laptop</ButtonHighlight>
        </li>
        <li>
          <ButtonHighlight color="primary">Headphone</ButtonHighlight>
        </li>

        <li>
          <ButtonHighlight color="primary">TV</ButtonHighlight>
        </li>
        <li>
          <ButtonLink href="ssss" color="primary" size={12}>
            Browse All Product
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavProduct;
