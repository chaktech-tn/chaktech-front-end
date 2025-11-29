import Link from "next/link";
import React from "react";

const ProductCategories = () => {
  return (
    <div className="product__details-categories product__details-more">
      <p>Categories:</p>
      <span>
        <Link href="/">iPhone Cases,</Link>
      </span>
      <span>
        <Link href="/">Android Cases,</Link>
      </span>
      <span>
        <Link href="/">Accessories</Link>
      </span>
    </div>
  );
};

export default ProductCategories;
