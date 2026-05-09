"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function InvoiceArea({innerRef,info}) {
    const { name, country, city, contact, invoice, createdAt, cart, cardInfo, shippingCost, discount,totalAmount } = info || {};
  return (
    <div ref={innerRef} className="invoice__wrapper grey-bg-15 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper">
      {/* <!-- invoice header --> */}
      <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
        <div className="row">
          <div className="col-xl-12">
            <div className="invoice__header pb-20">
              <div className="row align-items-end">
                <div className="col-md-4 col-sm-6">
                  <div className="invoice__left">
                    <Image className="mb-15" priority src="/assets/img/logo/logo-black.svg" alt="logo" width={112} height={42} />
                    <p>
                      2879 Elk Creek Road <br /> Stone Mountain, Georgia
                    </p>
                  </div>
                </div>
                <div className="col-md-8 col-sm-6">
                  <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                    <h3 className="text-uppercase font-70 mb-20">Invoice</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- invoice customer details --> */}
      <div className="invoice__customer mb-30">
        <div className="row">
          <div className="col-md-6 col-sm-8">
            <div className="invoice__customer-details">
              <h4 className="mb-10 text-uppercase">{name}</h4>
              <p className="mb-0 text-uppercase">{country}</p>
              <p className="mb-0 text-uppercase">{city}</p>
              <p className="mb-0">{contact}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-4">
            <div className="invoice__details mt-md-0 mt-20 text-md-end">
              <p className="mb-0">
                <strong>Invoice ID:</strong> #{invoice}
              </p>
              <p className="mb-0">
                <strong>Date:</strong> {dayjs(createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- invoice order tracking stepper --> */}
      <div className="invoice__tracking mb-40 mt-20 px-4">
        <h4 className="mb-20" style={{ color: "#222529", fontSize: "18px" }}>Statut de la commande</h4>
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Progress bar line */}
          <div style={{ position: "absolute", top: "25px", left: "10%", right: "10%", height: "4px", backgroundColor: "#f3f4f6", zIndex: 1 }}></div>

          {/* Stepper Steps */}
          {[
            { label: "Commande passée", active: true, done: true },
            { label: "En traitement", active: false, done: false }, // You would normally use the status from DB here
            { label: "En route", active: false, done: false },
            { label: "Livré", active: false, done: false }
          ].map((step, idx) => (
            <div key={idx} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
              <div 
                style={{ 
                  width: "50px", 
                  height: "50px", 
                  borderRadius: "50%", 
                  backgroundColor: step.done ? "#ee6d0a" : "#fff", 
                  border: step.done ? "none" : "4px solid #f3f4f6",
                  color: step.done ? "#fff" : "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  marginBottom: "10px",
                  boxShadow: step.active ? "0 0 0 6px #fff7ed" : "none"
                }}
              >
                {step.done ? <i className="fa-solid fa-check"></i> : <span>{idx + 1}</span>}
              </div>
              <span style={{ fontSize: "14px", fontWeight: step.active ? "600" : "500", color: step.active ? "#ee6d0a" : "#6b7280", textAlign: "center" }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <!-- invoice order table --> */}
      <div className="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white  mb-30">
        <Table className="table">
          <Thead className="table-light">
            <Tr>
              <Th scope="col">SL</Th>
              <Th scope="col">Product Name</Th>
              <Th scope="col">Quantity</Th>
              <Th scope="col">Item Price</Th>
              <Th scope="col">Amount</Th>
            </Tr>
          </Thead>
          <Tbody className="table-group-divider">
            {cart.map((item, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.title}</Td>
                <Td>{item.orderQuantity}</Td>
                <Td>
                  $
                  {item?.discount
                    ? item.originalPrice -
                      (item.originalPrice * item.discount) / 100
                    : item.originalPrice}
                </Td>
                <Td>
                  $
                  {item?.discount
                    ? (item.originalPrice -
                        (item.originalPrice * item.discount) / 100) *
                      item.orderQuantity
                    : item.originalPrice * item.orderQuantity}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* <!-- invoice total --> */}
      <div className="invoice__total pt-40 pb-10 pl-40 pr-40 mb-30" style={{ backgroundColor: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "12px" }}>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="invoice__payment-method mb-30">
              <h5 className="mb-0" style={{ color: "#9a3412" }}>Méthode de Paiement</h5>
              <p className="tp-font-medium text-uppercase" style={{ color: "#c2410c", fontWeight: "700" }}>{cardInfo?.type === 'COD' ? 'Paiement à la Livraison' : (cardInfo?.type || 'COD')}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="invoice__shippint-cost mb-30">
              <h5 className="mb-0" style={{ color: "#6b7280" }}>Frais de livraison</h5>
              <p className="tp-font-medium">{shippingCost} TND</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="invoice__discount-cost mb-30">
              <h5 className="mb-0" style={{ color: "#6b7280" }}>Remise</h5>
              <p className="tp-font-medium">{discount.toFixed(2)} TND</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="invoice__total-ammount mb-30">
              <h5 className="mb-0" style={{ color: "#ee6d0a", fontWeight: "700" }}>Montant à Payer (Cash)</h5>
              <p className="tp-font-medium" style={{ color: "#ee6d0a", fontSize: "24px" }}>
                <strong>{totalAmount} TND</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
