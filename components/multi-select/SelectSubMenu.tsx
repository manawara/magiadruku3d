import { ChildrenType } from "@/types";
const SelectSubMenu = ({ children }: ChildrenType) => {
  return (
    <ul className="absolute -top-[9px] left-[105%] py-2 bg-white z-30 min-w-60 shadow-md border border-gray-200">
      {children || null}{" "}
    </ul>
  );
};

export default SelectSubMenu;
