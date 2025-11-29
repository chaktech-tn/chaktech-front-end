'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from "react";

const ProductFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="product__faq mt-5">
      <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
        Frequently Asked Questions
      </h3>
      <div className="faq-accordion">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="faq-item mb-3"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="faq-question w-100 text-start p-3"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: openIndex === index ? '#f9fafb' : '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                color: '#111827',
                transition: 'background-color 0.2s ease',
              }}
            >
              <span>{faq.question}</span>
              <span style={{ 
                fontSize: '20px', 
                color: '#6b7280',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div 
                className="faq-answer p-3"
                style={{
                  backgroundColor: '#f9fafb',
                  borderTop: '1px solid #e5e7eb',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  animation: 'slideDown 0.3s ease',
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        .faq-answer {
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ProductFAQ;

