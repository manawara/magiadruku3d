import ProductBigItemCard from "@/components/product-item-card/ProductBigItemCard";
import React from "react";
import productImage from "@/public/placeholder_productItemCard.png";
import ProductSmallItemCard from "@/components/product-item-card/ProductSmallItemCard";

const ProductGrid = () => {
  return (
    <div className="flex lg:flex-row flex-col my-6">
      <ProductBigItemCard
        discount={30}
        price={400}
        count={0}
        title="Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versiosssssss"
        isHot
        isSoldOut
        image={{
          src: productImage,
          alt: "product",
        }}
      />
      <div className="grid min-[460px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-4 flex-grow">
        <ProductSmallItemCard
          image={{ src: productImage, alt: "sss" }}
          price={10}
          title="Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear..."
        />
        <ProductSmallItemCard
          image={{ src: productImage, alt: "sss" }}
          price={10}
          title="Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear..."
          discount={10}
        />
        <ProductSmallItemCard
          image={{ src: productImage, alt: "sss" }}
          price={10}
          title="Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear..."
        />
        <ProductSmallItemCard
          image={{ src: productImage, alt: "sss" }}
          price={10}
          title="Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear..."
        />
        <ProductSmallItemCard
          image={{ src: productImage, alt: "sss" }}
          price={10}
          title="Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear..."
        />
        <ProductSmallItemCard
          image={{ src: productImage, alt: "sss" }}
          price={10}
          title="Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear..."
        />
      </div>
    </div>
  );
};

export default ProductGrid;
