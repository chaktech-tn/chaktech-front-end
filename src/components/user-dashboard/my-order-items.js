import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Pagination from "@ui/Pagination";

const MyOrderItems = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  // side effect
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // handlePageClick
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ color: "#6b7280", fontWeight: "500" }}>Commande</th>
            <th scope="col" style={{ color: "#6b7280", fontWeight: "500" }}>Total</th>
            <th scope="col" style={{ color: "#6b7280", fontWeight: "500" }}>Statut</th>
            <th scope="col" style={{ color: "#6b7280", fontWeight: "500" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, i) => {
              // Determine status color
              let statusColor = "#6b7280";
              let statusBg = "#f3f4f6";
              if (item?.status === "pending") {
                statusColor = "#ee6d0a"; // Orange for pending COD
                statusBg = "#fff7ed";
              } else if (item?.status === "delivered") {
                statusColor = "#10b981"; // Green for delivered
                statusBg = "#ecfdf5";
              } else if (item?.status === "processing") {
                statusColor = "#3b82f6"; // Blue for processing
                statusBg = "#eff6ff";
              }

              return (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ verticalAlign: "middle", padding: "16px 8px" }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="order-products-thumbs d-flex gap-1">
                        {item?.cart?.slice(0, 3).map((cartItem, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f9fafb",
                              borderRadius: "6px",
                              border: "1px solid #e5e7eb",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={cartItem?.image || "/assets/img/placeholder/product-placeholder.svg"}
                              alt="Product thumbnail"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                        ))}
                        {item?.cart?.length > 3 && (
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f3f4f6",
                              borderRadius: "6px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              color: "#6b7280",
                              fontWeight: "600",
                            }}
                          >
                            +{item.cart.length - 3}
                          </div>
                        )}
                      </div>
                      <div>
                        <span style={{ fontWeight: "700", color: "#222529" }}>
                          #{item?._id?.substring(18, 24).toUpperCase()}
                        </span>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          {dayjs(item?.createdAt).format("DD MMM YYYY")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle", fontWeight: "600", color: "#222529" }}>
                    {item?.totalAmount} TND
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: statusColor,
                        backgroundColor: statusBg,
                        textTransform: "capitalize",
                      }}
                    >
                      {item?.status === "pending" ? "En attente COD" : item?.status}
                    </span>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <Link
                      href={`/order/${item._id}`}
                      className="tp-btn"
                      style={{
                        padding: "8px 20px",
                        fontSize: "14px",
                        backgroundColor: "#ee6d0a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Suivre / Détails
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* pagination start */}
      {items.length > itemsPerPage && (
        <div className="mt-20 ml-20 tp-pagination tp-pagination-style-2">
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      )}
      {/* pagination end */}
    </React.Fragment>
  );
};

export default MyOrderItems;
