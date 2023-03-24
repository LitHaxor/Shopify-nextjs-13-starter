import React from "react";
import SingleProduct from "./product.client";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/shopify/services/product";

const SinglePage = async ({
  params,
}: {
  params: {
    handle: string;
  };
}) => {
  const handle = params.handle;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }
  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
};

export default SinglePage;
