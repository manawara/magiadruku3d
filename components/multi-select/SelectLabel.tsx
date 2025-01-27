import { ChevronDown } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";

const selectLabel = cva(
  "font-semibold px-3 lg:px-6 py-3 flex h-max gap-2 relative top-0 left-0 text-sm items-center cursor-pointer",
  {
    variants: {
      intent: {
        primary: "text-gray-900 bg-gray-50",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface SelectLabelProps extends VariantProps<typeof selectLabel> {
  open: boolean;
  label: string;
  onAction: () => void;
}

const SelectLabel = ({ open, label, onAction, intent }: SelectLabelProps) => {
  return (
    <div
      className={`${
        open ? "" : "!bg-transparent"
      } flex items-center gap-2 cursor-pointer ${selectLabel({ intent })}`}
      onClick={onAction}
    >
      <span className="text-xs lg:text-sm">{label}</span>
      <ChevronDown
        size={18}
        className={`transition-transform duration-200 ${
          open ? "rotate-180 " : ""
        } `}
      />
    </div>
  );
};

export default SelectLabel;
