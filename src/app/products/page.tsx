import { getProducts } from "@/shopify/services/product";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const ProductPage = async () => {
  const products = await getProducts();

  if (!products) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage?.url}
                    alt={product.featuredImage?.altText ?? ""}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    height={product.featuredImage?.height ?? 400}
                    width={product.featuredImage?.width ?? 400}
                  />
                )}
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product?.priceRange?.minVariantPrice?.currencyCode}{" "}
                {product.priceRange?.minVariantPrice?.amount}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
