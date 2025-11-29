"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

const CategoryGridBlock = ({ block }) => {
  const { content, settings } = block;
  const { title, showAll = true } = content || {};
  const columns = settings?.columns || 4;

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/category/all`);
        const data = await response.json();

        if (data.success && data.data) {
          const categoriesData = Array.isArray(data.data)
            ? data.data.filter((cat) => cat.status === "Show")
            : [];
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="category-grid-block" style={{ padding: "60px 20px" }}>
        <div className="container">
          {title && <h2 className="mb-4">{title}</h2>}
          <div>Loading categories...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="category-grid-block" style={{ padding: "60px 20px" }}>
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
          className="row g-4"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "1.5rem",
          }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="col"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s",
              }}
            >
              <Link href={`/category/${category.slug || category._id}`}>
                {category.img && (
                  <div style={{ position: "relative", paddingTop: "75%" }}>
                    <Image
                      src={category.img}
                      alt={category.parent}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ padding: "1rem", textAlign: "center" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                    }}
                  >
                    {category.parent}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridBlock;

