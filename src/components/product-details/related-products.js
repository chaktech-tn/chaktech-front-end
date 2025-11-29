import React from "react";

import ProductPlaceholderGrid from "@components/products/product-placeholder";
import SingleProduct from "@components/products/single-product";
import { useGetRelatedProductsQuery } from "src/redux/features/productApi";


const RelatedProducts = ({id,tags}) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetRelatedProductsQuery({ id, tags });

  const relatedProducts = data?.product


  let content = null;

  // Show product placeholders when loading OR when there's ANY error (like Facebook)
  if (isLoading || isError || !relatedProducts?.length) {
    content = <ProductPlaceholderGrid count={4} />;
  } else {
    content = relatedProducts.map((product) => (
      <div key={product._id} className="col-lg-3 col-md-6">
        <SingleProduct product={product} />
      </div>
    ));
  }

  return (
    <React.Fragment>
      <section className="product__related-area pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section__title-wrapper-13 mb-35">
                <h3 className="section__title-13">Related Products</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="product__related-slider">
                <div className="row">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default RelatedProducts;
