import MainBanner from "@/feature/header/components/banner/MainBanner";
import ServiceNav from "@/feature/service-navigation /ServiceNav";

export default function HomePage() {
  return (
    <>
      <div>
        <ServiceNav />
        <MainBanner />
      </div>
    </>
  );
}
