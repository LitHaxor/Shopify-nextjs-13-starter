import ProductLoading from "@/components/loading/ProductLoading";
import React from "react";

const loading = () => {
  return (
    <div className="h-screen">
      <div className="flex w-full justify-center items-center h-full">
        <ProductLoading />
      </div>
    </div>
  );
};

export default loading;
