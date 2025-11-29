"use client";
import Image from "next/image";
import React from "react";

const ImageBlock = ({ block }) => {
  const { content, settings } = block;
  const { image, caption, altText, link } = content || {};
  const alignment = settings?.alignment || "center";
  const maxWidth = settings?.maxWidth || "100%";

  if (!image) return null;

  const imageElement = (
    <Image
      src={image}
      alt={altText || caption || "Image"}
      width={1200}
      height={600}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
      }}
    />
  );

  return (
    <section
      className="image-block"
      style={{
        padding: "40px 20px",
        textAlign: alignment,
      }}
    >
      <div className="container" style={{ maxWidth }}>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {imageElement}
          </a>
        ) : (
          imageElement
        )}
        {caption && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
};

export default ImageBlock;

