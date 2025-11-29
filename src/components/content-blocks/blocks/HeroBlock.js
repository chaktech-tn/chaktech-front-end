"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroBlock = ({ block }) => {
  const { content, settings } = block;
  const {
    title,
    subtitle,
    image,
    ctaText,
    ctaLink,
    backgroundColor,
    textColor,
  } = content || {};

  const layout = settings?.layout || "centered";
  const height = settings?.height || "600px";

  return (
    <section
      className="hero-banner-block"
      style={{
        minHeight: height,
        backgroundColor: backgroundColor || "#f8f9fa",
        color: textColor || "#000",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent:
          layout === "centered" ? "center" : layout === "left" ? "flex-start" : "flex-end",
        padding: "60px 20px",
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {image && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
      )}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: layout === "centered" ? "center" : layout === "left" ? "left" : "right",
        }}
      >
        {title && (
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: subtitle ? "1rem" : "2rem",
            }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: ctaText ? "2rem" : 0,
            }}
          >
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="btn btn-primary"
            style={{
              padding: "12px 30px",
              fontSize: "1rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroBlock;

