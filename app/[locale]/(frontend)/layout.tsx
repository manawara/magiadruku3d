import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Footer from "@/feature/footer/components/Footer";
import Header from "@/feature/header/Header";
import ServiceNav from "@/feature/service-navigation /ServiceNav";
import { ChildrenType } from "@/types";

const FrontendLayout = ({ children }: ChildrenType) => {
  return (
    <>
      <Header />
      <main className="flex flex-col z-0 overflow-hidden max-md:mb-[66px]">
        <ServiceNav />
        <Breadcrumb />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default FrontendLayout;
