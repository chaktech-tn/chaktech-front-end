"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import ErrorMessage from "@components/error-message/error";
import Loader from "@components/loader/loader";
import useAuthCheck from "@hooks/use-auth-check";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

// internal
import { useGetUserOrderByIdQuery } from "src/redux/features/orderApi";

import InvoiceArea from "./invoice-area";

const SingleOrderArea = ({ orderId }) => {
  const router = useRouter();
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });
  const authChecked = useAuthCheck();
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const { data: order, isError, isLoading, error } = useGetUserOrderByIdQuery(orderId, {
    skip: !authChecked || !accessToken || !orderId,
  });
  const [fallbackOrder, setFallbackOrder] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedOrder = localStorage.getItem("latest_order");
      if (!storedOrder) return;

      const parsedOrder = JSON.parse(storedOrder);
      if (parsedOrder?._id === orderId) {
        setFallbackOrder(parsedOrder);
      }
    } catch (error) {
      console.error("Error reading latest order fallback:", error);
    }
  }, [orderId]);

  useEffect(() => {
    if (authChecked && !accessToken) {
      const redirectTo = encodeURIComponent(`/order/${orderId}`);
      router.replace(`/login?redirect=${redirectTo}`);
    }
  }, [authChecked, accessToken, orderId, router]);

  const resolvedOrder = order?.order || fallbackOrder;
  let content = null;
  if (isLoading) {
    content = (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (!authChecked && !resolvedOrder) {
    content = (
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Loader loading />
      </div>
    );
  }
  if (authChecked && !accessToken && !resolvedOrder) {
    content = (
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Loader loading />
      </div>
    );
  }
  if (authChecked && accessToken && isError && !resolvedOrder) {
    content = <ErrorMessage message={error?.data?.message || "There was an error"} />;
  }
  if (!isLoading && resolvedOrder) {
    const {
      name,
      country,
      city,
      contact,
      invoice,
      createdAt,
      cart,
      cardInfo,
      shippingCost,
      discount,
      totalAmount,
    } = resolvedOrder;

    content = (
      <section className="invoice__area pt-120 pb-120">
        <div className="container">
          {/* <!-- COD Order Confirmation Success Card --> */}
          <div className="invoice__msg-wrapper">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div 
                  className="invoice_msg mb-40 text-center p-5"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #f3f4f6"
                  }}
                >
                  <div 
                    className="success-icon mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#ecfdf5",
                      borderRadius: "50%",
                      color: "#10b981",
                      fontSize: "40px"
                    }}
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                  
                  <h2 style={{ color: "#222529", fontWeight: "700", marginBottom: "10px" }}>
                    Commande Confirmée !
                  </h2>
                  <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "25px" }}>
                    Merci pour votre confiance, <strong>{name}</strong>. Votre commande a été bien reçue.
                  </p>

                  <div 
                    className="cod-instruction p-4 mb-4 text-start"
                    style={{
                      backgroundColor: "#fff7ed",
                      borderLeft: "4px solid #ee6d0a",
                      borderRadius: "8px"
                    }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <i className="fa-solid fa-money-bill-wave mt-1" style={{ color: "#ee6d0a", fontSize: "20px" }}></i>
                      <div>
                        <h4 style={{ color: "#9a3412", fontSize: "16px", fontWeight: "600", margin: "0 0 5px 0" }}>
                          Paiement à la livraison
                        </h4>
                        <p style={{ color: "#c2410c", margin: 0, fontSize: "15px" }}>
                          Veuillez préparer le montant exact de <strong>{totalAmount} TND</strong> en espèces (Cash) lors de la livraison de votre commande.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                    <button
                      type="button"
                      className="tp-btn"
                      style={{
                        backgroundColor: "#ee6d0a",
                        color: "#fff",
                        border: "none",
                        padding: "12px 30px",
                        borderRadius: "8px",
                        fontWeight: "600"
                      }}
                      onClick={() => window.location.href = `/profile`} // Or tracking route
                    >
                      Suivre ma commande
                    </button>
                    <button
                      type="button"
                      className="tp-btn tp-btn-black"
                      style={{
                        backgroundColor: "transparent",
                        color: "#222529",
                        border: "1px solid #d1d5db",
                        padding: "12px 30px",
                        borderRadius: "8px",
                        fontWeight: "600"
                      }}
                      onClick={() => window.location.href = `/shop`}
                    >
                      Continuer mes achats
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* invoice area start */}
          <InvoiceArea innerRef={contentRef} info={{name,country,city,contact,invoice,createdAt,cart,cardInfo,shippingCost,discount,totalAmount}} />
          {/* invoice area end */}

          {/* invoice print  */}
          <div className="invoice__print text-end mt-10">
            <div className="row">
              <div className="col-xl-12">
                <button
                  onClick={handlePrint}
                  type="button"
                  className="tp-invoice-print tp-btn tp-btn-black"
                >
                  <span className="mr-5">
                    <i className="fa-regular fa-print"></i>
                  </span>{" "}
                  Print
                </button>
              </div>
            </div>
            {/* invoice print */}
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <Wrapper>
        <Header style_2={true} />
        {/* content */}
        {content}
        {/* content */}
        {/* footer start */}
        <Footer />
        {/* footer end */}
      </Wrapper>
    </>
  );
};

export default SingleOrderArea;
