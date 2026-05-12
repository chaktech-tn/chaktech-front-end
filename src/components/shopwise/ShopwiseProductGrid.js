"use client";
import React from "react";
import Link from "next/link";
import { useGetShowingProductsQuery, useGetDiscountProductsQuery } from "@/redux/features/productApi";

const ShopwiseProductGrid = ({ title, type }) => {
  const { data: showingData } = useGetShowingProductsQuery();
  const { data: discountData } = useGetDiscountProductsQuery();

  const apiProducts = type === "latest-product" ? showingData?.result : discountData?.result;

  // Real products from chaktech.tn to use as high-quality mock data
  const chaktechProducts = [
    {
      _id: "1",
      title: "Smart Watch T800 Ultra 2",
      price: 29.000,
      oldPrice: 39.000,
      image: "https://chaktech.tn/wp-content/uploads/2025/05/store_01J9X614YMCZZCQRSW14VWAHDQ_assets_1728900606397-1-300x300.webp",
      category: "Smart Watch",
      rating: 5,
      slug: "smart-watch-t800-ultra-2"
    },
    {
      _id: "2",
      title: "Casque Bluetooth P47M",
      price: 25.000,
      oldPrice: 39.000,
      image: "https://chaktech.tn/wp-content/uploads/2025/05/store_01J9X614YMCZZCQRSW14VWAHDQ_assets_1728900606398-2-300x300.webp",
      category: "Audio",
      rating: 4,
      slug: "casque-bluetooth-p47m"
    },
    {
      _id: "3",
      title: "Ventilateur LEXICAL 20\" Box Fan",
      price: 85.000,
      oldPrice: 99.000,
      image: "https://chaktech.tn/wp-content/uploads/2025/06/Ventilateur-LEXICAL-20-Box-Fan-–-Noir-300x300.png",
      category: "Electromenager",
      rating: 5,
      slug: "ventilateur-lexical-20-box-fan-noir"
    },
    {
      _id: "4",
      title: "TECNO Pova 6 Neo 8Go 256Go",
      price: 679.000,
      oldPrice: 719.000,
      image: "https://chaktech.tn/wp-content/uploads/2025/07/2.webp",
      category: "Smartphone",
      rating: 5,
      slug: "tecno-pova-6-neo-8go-256go"
    }
  ];

  const products = (apiProducts && apiProducts.length > 0) ? apiProducts : chaktechProducts;

  return (
    <section className="shopwise-products py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">{title}</h4>
          <div className="d-flex gap-3">
            <Link href="/shop" className="text-muted text-decoration-none small fw-bold">View All</Link>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.slice(0, 8).map((product) => (
            <div key={product._id} className="col">
              <div className="product-card h-100 p-0 rounded-4 border-0 bg-white shadow-sm overflow-hidden position-relative transition-all">
                {product.oldPrice > product.price && (
                  <span className="badge position-absolute top-0 start-0 m-3 z-1 fw-bold rounded-pill" style={{ backgroundColor: "#ff324d", padding: "5px 12px" }}>
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                )}
                
                <div className="product-img-wrapper p-4 bg-light d-flex align-items-center justify-content-center" style={{ height: "230px" }}>
                  <img 
                    src={product.image || product.imageURL} 
                    alt={product.title} 
                    className="img-fluid transition-transform h-100 object-fit-contain"
                  />
                  <div className="product-actions position-absolute w-100 d-flex justify-content-center gap-2 transition-all opacity-0">
                    <button className="btn btn-white shadow-sm rounded-circle p-2"><i className="fa-light fa-heart"></i></button>
                    <button className="btn btn-white shadow-sm rounded-circle p-2"><i className="fa-light fa-eye"></i></button>
                    <button className="btn btn-white shadow-sm rounded-circle p-2"><i className="fa-light fa-repeat"></i></button>
                  </div>
                </div>
                
                <div className="product-info p-3 text-center">
                  <Link href={`/product-details/${product._id}`} className="text-decoration-none text-dark d-block">
                    <h6 className="fw-bold mb-2 text-truncate hover-primary">{product.title}</h6>
                  </Link>
                  
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <span className="fw-bold fs-5" style={{ color: "#ff324d" }}>
                      {product.price} TND
                    </span>
                    {product.oldPrice > product.price && (
                      <span className="text-muted text-decoration-line-through small">
                        {product.oldPrice} TND
                      </span>
                    )}
                  </div>
                  
                  <div className="product-rating mb-3 small text-warning">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star text-muted opacity-25"></i>
                    <span className="text-muted ms-1">(25)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .product-card {
          border: 1px solid #f0f0f0 !important;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
          border-color: #ff324d !important;
        }
        .product-card:hover .product-actions {
          bottom: 120px;
          opacity: 1;
        }
        .product-actions {
          bottom: 100px;
        }
        .product-actions .btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: #333;
        }
        .product-actions .btn:hover {
          background: #ff324d;
          color: white;
        }
        .hover-primary:hover { color: #ff324d !important; }
      `}</style>
    </section>
  );
};

export default ShopwiseProductGrid;
