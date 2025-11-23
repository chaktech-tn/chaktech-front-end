"use client";
import React from "react";

const TextBlock = ({ block }) => {
  const { content, settings } = block;
  const { text, title } = content || {};
  const alignment = settings?.alignment || "left";
  const maxWidth = settings?.maxWidth || "100%";

  return (
    <section
      className="text-block"
      style={{
        padding: "60px 20px",
        textAlign: alignment,
      }}
    >
      <div className="container" style={{ maxWidth }}>
        {title && (
          <h2
            style={{
              marginBottom: "1.5rem",
              fontSize: "2rem",
            }}
          >
            {title}
          </h2>
        )}
        {text && (
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          />
        )}
      </div>
    </section>
  );
};

export default TextBlock;

