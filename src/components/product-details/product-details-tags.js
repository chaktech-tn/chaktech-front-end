import React from 'react';

const ProductDetailsTags = ({ tag }) => {
  if (!tag || tag.length === 0) return null;
  return (
    <div className="product__details-tags product__details-more">
      <p>Tags:</p>
      {tag?.map((t, i) => (
        <span key={i}>
          {t}{i < tag.length - 1 && ","}
        </span>
      ))}
    </div>
  );
};

export default ProductDetailsTags;