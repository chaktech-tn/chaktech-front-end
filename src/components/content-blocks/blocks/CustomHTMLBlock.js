"use client";
import React from "react";
import { sanitizeRichHtml } from "@/lib/sanitize-rich-html";

const CustomHTMLBlock = ({ block }) => {
  const { content } = block;
  const { html } = content || {};
  const sanitizedHtml = sanitizeRichHtml(html);

  if (!sanitizedHtml) return null;

  return (
    <section
      className="custom-html-block"
      style={{ padding: "40px 20px" }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default CustomHTMLBlock;
