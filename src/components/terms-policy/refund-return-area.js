'use client';
import React from "react";

import contactInfo from "@config/contact";


const RefundReturnArea = () => {

  return (
    <section className="policy__area pb-120 pt-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="policy__content">
              <div className="policy__item mb-50">
                <h3 className="policy__title">Return Window</h3>
                <p className="policy__text">
                  You have <strong>30 days from the date of delivery</strong> to return any product for a full refund or exchange. 
                  The return period starts from the day you receive your order.
                </p>
                <p className="policy__text">
                  To be eligible for a return, your item must be:
                </p>
                <ul className="policy__list">
                  <li>Unused and in the same condition that you received it</li>
                  <li>In the original packaging with all tags and accessories included</li>
                  <li>Accompanied by the original receipt or proof of purchase</li>
                </ul>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">Return Shipping Costs</h3>
                <p className="policy__text">
                  <strong>Who pays for return shipping?</strong>
                </p>
                <ul className="policy__list">
                  <li>
                    <strong>Defective or damaged items:</strong> We cover the return shipping costs. 
                    Contact us at <a href={`mailto:${contactInfo.email.primary}`}>{contactInfo.email.primary}</a> or 
                    call <a href={`tel:${contactInfo.phone.tel}`}>{contactInfo.phone.formatted}</a> to arrange a return.
                  </li>
                  <li>
                    <strong>Wrong item received:</strong> We cover the return shipping costs.
                  </li>
                  <li>
                    <strong>Change of mind / Not satisfied:</strong> The customer is responsible for return shipping costs.
                  </li>
                </ul>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">Refund Processing Time</h3>
                <p className="policy__text">
                  Once we receive and inspect your returned item, we will process your refund:
                </p>
                <ul className="policy__list">
                  <li><strong>Processing time:</strong> 5-7 business days after we receive your return</li>
                  <li><strong>Refund method:</strong> Refunds will be issued to the original payment method</li>
                  <li><strong>For Cash on Delivery (COD) orders:</strong> Refunds will be processed via bank transfer or store credit</li>
                  <li><strong>Bank transfer time:</strong> Additional 3-5 business days for the refund to appear in your account</li>
                </ul>
                <p className="policy__text">
                  <strong>Total refund time:</strong> Typically 8-12 business days from when we receive your return.
                </p>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">How to Return an Item</h3>
                <p className="policy__text">
                  Follow these steps to return your item:
                </p>
                <ol className="policy__list" style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                  <li>
                    <strong>Contact us:</strong> Email us at <a href={`mailto:${contactInfo.email.primary}`}>{contactInfo.email.primary}</a> or 
                    call <a href={`tel:${contactInfo.phone.tel}`}>{contactInfo.phone.formatted}</a> within 30 days of delivery.
                  </li>
                  <li>
                    <strong>Provide order details:</strong> Include your order number, product name, and reason for return.
                  </li>
                  <li>
                    <strong>Receive return authorization:</strong> We will provide you with a Return Authorization Number (RAN) and return instructions.
                  </li>
                  <li>
                    <strong>Package the item:</strong> Pack the item securely in its original packaging with all accessories.
                  </li>
                  <li>
                    <strong>Ship the return:</strong> Send the package to the address provided in your return instructions.
                  </li>
                  <li>
                    <strong>Track your return:</strong> Keep your shipping receipt and tracking number.
                  </li>
                </ol>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">Non-Returnable Items</h3>
                <p className="policy__text">
                  The following items cannot be returned:
                </p>
                <ul className="policy__list">
                  <li>Items that have been used, damaged, or modified</li>
                  <li>Items without original packaging or missing accessories</li>
                  <li>Personalized or custom-made products</li>
                  <li>Software, digital products, or downloadable content</li>
                  <li>Items returned after 30 days from delivery</li>
                </ul>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">Exchanges</h3>
                <p className="policy__text">
                  We currently do not offer direct exchanges. If you need a different size, color, or model, please return the original item 
                  for a refund and place a new order for the item you want.
                </p>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">Damaged or Defective Items</h3>
                <p className="policy__text">
                  If you receive a damaged or defective item, please contact us immediately at{' '}
                  <a href={`mailto:${contactInfo.email.primary}`}>{contactInfo.email.primary}</a> or 
                  call <a href={`tel:${contactInfo.phone.tel}`}>{contactInfo.phone.formatted}</a> within 48 hours of delivery.
                </p>
                <p className="policy__text">
                  We will arrange a free return pickup or provide a prepaid return label. Once we verify the issue, 
                  we will send a replacement or issue a full refund, including original shipping costs.
                </p>
              </div>

              <div className="policy__item mb-50">
                <h3 className="policy__title">Contact Us</h3>
                <p className="policy__text">
                  If you have any questions about our refund and return policy, please contact us:
                </p>
                <ul className="policy__list">
                  <li>Email: <a href={`mailto:${contactInfo.email.primary}`}>{contactInfo.email.primary}</a></li>
                  <li>Phone: <a href={`tel:${contactInfo.phone.tel}`}>{contactInfo.phone.formatted}</a></li>
                  <li>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (Tunisia Time)</li>
                </ul>
              </div>

              <div className="policy__item">
                <h4 className="policy__meta">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundReturnArea;

