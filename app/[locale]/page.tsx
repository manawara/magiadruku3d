import BestDeals from "@/feature/best-deals/BestDeals";
import FeaturesBar from "@/feature/features-bar/FeaturesBar";
import MainBanner from "@/feature/header/components/banner/MainBanner";
import ServiceNav from "@/feature/service-navigation /ServiceNav";

export default function HomePage() {
  return (
    <>
      <div>
        <ServiceNav />
        <MainBanner />
        <FeaturesBar />
        <BestDeals />
      </div>
    </>
  );
}
