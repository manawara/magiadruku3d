import * as LucideIcons from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";

type FeatureCardProps = {
  icon: keyof typeof LucideIcons;
  title: string;
  description?: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const IconComponent = LucideIcons[icon] as ForwardRefExoticComponent<
    Omit<LucideProps, "ref">
  >;

  return (
    <div className="p-4 flex items-center gap-4">
      <div className="flex-shrink-0 w-[30px] h-[30px]">
        <IconComponent size={30} strokeWidth={1} />
      </div>
      <div>
        <h3 className="font-semibold text-sm text-gray-900 uppercase  max-sm:text-[12px] max-[410px]:text-sm">
          {title}
        </h3>
        <p className="text-gray-600 text-xs pt-1">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
