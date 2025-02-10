import BestDeals from "@/feature/best-deals/BestDeals";
import FeaturedProduct from "@/feature/featured-product/FeaturedProduct";
import FeaturesBar from "@/feature/features-bar/FeaturesBar";
import MainBanner from "@/feature/header/components/banner/MainBanner";
import PromoBanner from "@/feature/promo-banner/PromoBanner";
import ShopCategory from "@/feature/shop-category/ShopCategory";
import ProductShowCase from "@/feature/product-show-case/components/ProductShowCase";
import NewsLetter from "@/feature/newsletter/components/NewsLetter";

export default function HomePage() {
  return (
    <>
      <div className="px-4">
        <MainBanner />
        <FeaturesBar />
        <BestDeals />
        <ShopCategory />
        <FeaturedProduct />
        <PromoBanner />
        <ProductShowCase />
      </div>
      <NewsLetter />
    </>
  );
}
