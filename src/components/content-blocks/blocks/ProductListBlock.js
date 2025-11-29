"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
}

const ProductListBlock = ({ block }) => {
  const { content, settings } = block;
  const { title, category, limit = 8, sortBy } = content || {};
  const layout = settings?.layout || "grid";
  const columns = settings?.columns || 4;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let url = `${API_BASE_URL}/products/show?limit=${limit}`;
        
        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success && data.data) {
          const productsData = Array.isArray(data.data) ? data.data : [];
          
          // Sort products
          if (sortBy === "popular") {
            // Sort by views or sales (if available)
            productsData.sort((a, b) => (b.views || 0) - (a.views || 0));
          } else if (sortBy === "price-low") {
            productsData.sort((a, b) => a.price - b.price);
          } else if (sortBy === "price-high") {
            productsData.sort((a, b) => b.price - a.price);
          }

          setProducts(productsData.slice(0, limit));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, limit, sortBy]);

  if (isLoading) {
    return (
      <section className="product-list-block" style={{ padding: "60px 20px" }}>
        <div className="container">
          {title && <h2 className="mb-4">{title}</h2>}
          <div>Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-list-block" style={{ padding: "60px 20px" }}>
      <div className="container">
        {title && (
          <h2
            style={{
              marginBottom: "2rem",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            {title}
          </h2>
        )}
        <div
          className={`row ${layout === "grid" ? "g-4" : ""}`}
          style={{
            display: layout === "grid" ? "grid" : "flex",
            gridTemplateColumns:
              layout === "grid"
                ? `repeat(${columns}, 1fr)`
                : undefined,
            flexDirection: layout === "list" ? "column" : undefined,
            gap: "1.5rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="col"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s",
              }}
            >
              <Link href={`/product/${product.slug || product._id}`}>
                <div style={{ position: "relative", paddingTop: "75%" }}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1rem" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    {product.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#0ea5e9",
                      }}
                    >
                      {product.price} TND
                    </span>
                    {product.originalPrice > product.price && (
                      <span
                        style={{
                          fontSize: "0.9rem",
                          textDecoration: "line-through",
                          color: "#999",
                        }}
                      >
                        {product.originalPrice} TND
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListBlock;

