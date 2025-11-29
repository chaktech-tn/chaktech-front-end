"use client";
import Link from "next/link";
import React from "react";

const CTABlock = ({ block }) => {
  const { content, settings } = block;
  const { title, description, buttonText, buttonLink, backgroundColor } =
    content || {};
  const alignment = settings?.alignment || "center";

  return (
    <section
      className="cta-block"
      style={{
        padding: "60px 20px",
        backgroundColor: backgroundColor || "#0ea5e9",
        color: "#fff",
        textAlign: alignment,
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {title && (
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: description ? "1rem" : "2rem",
                fontWeight: "bold",
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              style={{
                fontSize: "1.25rem",
                marginBottom: buttonText ? "2rem" : 0,
              }}
            >
              {description}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              className="btn btn-light"
              style={{
                padding: "15px 40px",
                fontSize: "1.1rem",
                textDecoration: "none",
                display: "inline-block",
                backgroundColor: "#fff",
                color: "#0ea5e9",
                borderRadius: "4px",
                fontWeight: "600",
              }}
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABlock;

