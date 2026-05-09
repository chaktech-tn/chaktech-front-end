import Link from "next/link";
import React from "react";

const ProductDetailsCategories = ({name}) => {
  return (
    <div className="product__details-categories product__details-more">
      <p>Category:</p>
      <span>
        <Link href="/">{" "}{name}</Link>
      </span>
    </div>
  );
};

export default ProductDetailsCategories;
