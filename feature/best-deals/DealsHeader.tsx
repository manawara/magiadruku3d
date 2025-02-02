import ButtonLink from "@/components/button/ButtonLink";
import Tag from "@/components/tag/Tag";
const DealsHeader = ({ title }: { title: string }) => {
  return (
    <header className="flex gap-5 ">
      <div className="text-sm font-normal flex items-center max-[561px]:justify-center justify-between w-full flex-wrap max-[561px]:gap-3 gap-8">
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <h2 className="text-2xl font-semibold inline-flex">{title}</h2>
          <div className="flex items-center gap-4 justify-center">
            <span> Deals ends in </span>
            <Tag color="warning">16d : 21h : 57m : 23s</Tag>
          </div>
        </div>

        <ButtonLink color="info" href="#">
          ssss
        </ButtonLink>
      </div>
    </header>
  );
};

export default DealsHeader;
