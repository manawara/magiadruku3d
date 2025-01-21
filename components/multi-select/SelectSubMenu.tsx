import { ChildrenType } from "@/types";

type SelectSubMenuProps = {
  onHover: (category: string | null) => void;
} & ChildrenType;
const SelectSubMenu = ({ children, onHover }: SelectSubMenuProps) => {
  return (
    <ul
      className="absolute -top-[9px] left-[105%] py-2 bg-white z-30 min-w-60 shadow-md border border-gray-200"
      onMouseLeave={() => onHover("")}
    >
      {children || null}{" "}
    </ul>
  );
};

export default SelectSubMenu;
