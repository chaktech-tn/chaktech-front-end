"use client";
import React from "react";

const TestimonialsBlock = ({ block }) => {
  const { content, settings } = block;
  const { title, testimonials = [] } = content || {};
  const columns = settings?.columns || 3;

  return (
    <section className="testimonials-block" style={{ padding: "60px 20px", backgroundColor: "#f8f9fa" }}>
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
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "2rem",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {testimonial.rating && (
                <div style={{ marginBottom: "1rem", color: "#ffc107" }}>
                  {"★".repeat(testimonial.rating)}
                </div>
              )}
              {testimonial.text && (
                <p style={{ marginBottom: "1rem", fontStyle: "italic" }}>
                  "{testimonial.text}"
                </p>
              )}
              {testimonial.author && (
                <div>
                  <strong>{testimonial.author}</strong>
                  {testimonial.role && (
                    <span style={{ color: "#666", marginLeft: "0.5rem" }}>
                      - {testimonial.role}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBlock;

