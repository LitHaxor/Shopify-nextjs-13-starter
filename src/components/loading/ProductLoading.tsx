"use client";

import React from "react";
import { GridLoader } from "react-spinners";

const ProductLoading = () => {
  return (
    <div className="">
      <GridLoader size={24} color="rgb(79 70 229)" />
    </div>
  );
};

export default ProductLoading;
