import { getProductByID } from "@/app/action/product";
import FormProductEdit from "@/backend/feature/form/components/form-product-edit/FormProductEdit";
import { localizedData } from "@/lib/helper";
import React from "react";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

const ProductEditPage = async ({ params }: Props) => {
  const { id, locale } = await params;
  const product = await getProductByID(+id);
  // Jeśli nie ma produktu, podaj np. null lub pusty obiekt,
  // żeby FormProductEdit nie dostał undefined
  console.log(product);
  const dataProduct = product ? localizedData(product, locale) : null;
  console.log(dataProduct);
  return <FormProductEdit product={dataProduct} />;
};

export default ProductEditPage;
