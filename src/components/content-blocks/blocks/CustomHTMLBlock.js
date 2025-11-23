"use client";
import React from "react";

const CustomHTMLBlock = ({ block }) => {
  const { content } = block;
  const { html } = content || {};

  if (!html) return null;

  return (
    <section
      className="custom-html-block"
      style={{ padding: "40px 20px" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CustomHTMLBlock;

