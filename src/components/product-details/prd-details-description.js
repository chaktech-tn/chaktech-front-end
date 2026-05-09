import React from "react";

import {
  extractProductDetailContent,
  hasStructuredSpecs,
} from "@utils/product-detail-content";

const getDetailItemKey = (item, index) => `${item.label}-${item.value}-${index}`;

const PrdDetailsDescription = ({product}) => {
  const content = extractProductDetailContent(product?.description || "");
  const showStructured = hasStructuredSpecs(content);

  return (
    <div className="product__details-description pt-95">
      <div className="row">
        <div className="col-lg-12">
          <div className="product__details-description-content">
            <h3 className="product-desc-title">{product?.title}</h3>

            {showStructured && (
              <section className="product-detail-highlights mb-40">
                <h4>Key highlights</h4>
                <ul className="row g-3 list-unstyled mb-0">
                  {content.highlights.map((item, index) => (
                    <li key={getDetailItemKey(item, index)} className="col-md-6">
                      <div className="product-detail-highlight-card">
                        <span className="label">{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {showStructured && (
              <section className="product-detail-specs mb-40">
                <h4>Detailed specs</h4>
                <ul className="product-detail-spec-list list-unstyled mb-0">
                  {content.specs.map((item, index) => (
                    <li
                      key={getDetailItemKey(item, index)}
                      className="product-detail-spec-row"
                    >
                      <span className="label">{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {content.cleanedDescriptionHtml && (
              <section className="product-detail-description-prose">
                <h4>Description</h4>
                <div
                  className="product-detail-description-html"
                  dangerouslySetInnerHTML={{__html: content.cleanedDescriptionHtml}}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrdDetailsDescription;
