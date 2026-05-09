"use client";
import React, { useState } from "react";

const NewsletterSignupBlock = ({ block }) => {
  const { content } = block;
  const { title, subtitle, buttonText = "Subscribe" } = content || {};
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // TODO: Implement newsletter subscription API call
    setTimeout(() => {
      setMessage("Thank you for subscribing!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      className="newsletter-signup-block"
      style={{
        padding: "60px 20px",
        backgroundColor: "#0ea5e9",
        color: "#fff",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          {title && (
            <h2
              style={{
                marginBottom: "1rem",
                fontSize: "2rem",
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                marginBottom: "2rem",
                fontSize: "1.1rem",
              }}
            >
              {subtitle}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: "1",
                  minWidth: "250px",
                  padding: "12px 16px",
                  borderRadius: "4px",
                  border: "none",
                  fontSize: "1rem",
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "12px 30px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#fff",
                  color: "#0ea5e9",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? "Subscribing..." : buttonText}
              </button>
            </div>
            {message && (
              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignupBlock;

