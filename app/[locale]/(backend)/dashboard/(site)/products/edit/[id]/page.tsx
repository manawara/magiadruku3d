import { getProductByID } from "@/app/action/product";
import FormProductEdit, {
  Product,
} from "@/backend/feature/form/components/form-product-edit/FormProductEdit";
import { localizedData } from "@/lib/helper";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

const ProductEditPage = async ({ params }: Props) => {
  const { id, locale } = await params; // Await the params promise
  const product = await getProductByID(+id);

  const dataProduct = product
    ? (localizedData(product, locale) as Product)
    : null;

  if (!dataProduct) return <div>Brak produktu</div>;

  return <FormProductEdit product={dataProduct} />;
};

export default ProductEditPage;
