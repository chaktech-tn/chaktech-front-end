"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BannerBlock = ({ block }) => {
  const { content, settings } = block;
  const { image, title, subtitle, link } = content || {};
  const style = settings?.style || "full-width";

  if (!image) return null;

  return (
    <section
      className="banner-block"
      style={{
        padding: style === "full-width" ? 0 : "40px 20px",
        margin: "40px 0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "300px",
          borderRadius: style === "full-width" ? 0 : "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={title || "Banner"}
          fill
          style={{ objectFit: "cover" }}
        />
        {(title || subtitle || link) && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#fff",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            {title && (
              <h2
                style={{
                  fontSize: "2.5rem",
                  marginBottom: subtitle ? "1rem" : "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: "1.25rem",
                  marginBottom: link ? "1.5rem" : 0,
                }}
              >
                {subtitle}
              </p>
            )}
            {link && (
              <Link
                href={link}
                className="btn btn-light"
                style={{
                  padding: "12px 30px",
                  fontSize: "1rem",
                  textDecoration: "none",
                  display: "inline-block",
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "4px",
                }}
              >
                Learn More
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerBlock;

