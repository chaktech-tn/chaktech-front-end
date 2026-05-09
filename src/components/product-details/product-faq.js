'use client';
import React, { useState } from "react";

const ProductFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionTitle = "Frequently Asked Questions";
  const sectionIntro =
    "Everything customers usually want to know before ordering.";

  const faqs = [
    {
      question: "What is the shipping time?",
      answer: "We offer fast delivery throughout Tunisia. Orders placed before 2 PM are typically delivered within 1-3 business days. Express delivery options are available for urgent orders."
    },
    {
      question: "Is this product original and authentic?",
      answer: "Yes, all our products are 100% original and authentic. We are an authorized dealer and source products directly from manufacturers or authorized distributors. Each product comes with official warranty and authenticity guarantee."
    },
    {
      question: "What is the warranty period?",
      answer: "Products come with manufacturer warranty. Warranty periods vary by product category: Electronics typically have 1-2 years warranty, while appliances may have longer warranty periods. Check the product description for specific warranty details."
    },
    {
      question: "What is your return policy?",
      answer: "You have 30 days from delivery to return any product for a full refund or exchange. Items must be unused, in original packaging with all accessories. For defective items, we cover return shipping. For change of mind returns, customer covers shipping. Refunds are processed within 5-7 business days."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes! We offer Cash on Delivery for all orders. You can pay when you receive your order. No need for credit card or online payment. COD is available throughout Tunisia."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status in your account dashboard or contact our customer service team for updates."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Cash on Delivery (COD) for all orders. You pay when you receive your order. This is the most convenient payment method for our customers in Tunisia."
    },
    {
      question: "Do you ship to all cities in Tunisia?",
      answer: "Yes, we offer delivery to all cities and regions in Tunisia. Delivery times may vary by location, but we ensure fast and reliable delivery throughout the country."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex((currentOpenIndex) =>
      currentOpenIndex === index ? null : index
    );
  };

  return (
    <section className="product__faq mt-5" aria-labelledby="product-faq-heading">
      <div
        className="product-detail-faq-shell rounded-3 p-4 p-md-5"
        style={{
          backgroundColor: "var(--tp-grey-14)",
          border: "1px solid var(--tp-border-2)",
        }}
      >
        <h3
          id="product-faq-heading"
          className="mb-2"
          style={{
            color: "var(--tp-heading-primary)",
            fontFamily: "var(--tp-ff-heading)",
            fontSize: "var(--tp-fz-h3)",
            fontWeight: "var(--tp-fw-sbold)",
          }}
        >
          {sectionTitle}
        </h3>
        <p
          className="mb-4"
          style={{ color: "var(--tp-text-1)", fontSize: "var(--tp-fz-h6)" }}
        >
          {sectionIntro}
        </p>
        <div className="faq-accordion">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const questionId = `product-faq-question-${index}`;
          const answerId = `product-faq-answer-${index}`;

          return (
            <div
              key={index}
              className="faq-item mb-3"
              style={{
                backgroundColor: "var(--tp-common-white)",
                border: "1px solid var(--tp-border-2)",
              }}
            >
              <button
                id={questionId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleFAQ(index)}
                className="faq-question w-100 text-start p-3 d-flex justify-content-between align-items-center border-0"
                style={{
                  backgroundColor: isOpen
                    ? "var(--tp-grey-2)"
                    : "var(--tp-common-white)",
                  color: "var(--tp-heading-primary)",
                }}
              >
                <span>{faq.question}</span>
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="faq-answer p-3 pt-0"
                  style={{ color: "var(--tp-text-1)" }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default ProductFAQ;
