import React from "react";
import MyOrderItems from "./my-order-items";

const SvgEmptyOrders = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#cbd5e1', margin: '0 auto' }}>
    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 11c0 .55-.45 1-1 1s-1-.45-1-1V9h2v2zm3-7c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 7c0 .55-.45 1-1 1s-1-.45-1-1V9h2v2z"/>
  </svg>
);

const MyOrders = ({ orderData }) => {
  const order_items = orderData?.orders;

  const styles = `
    .st-orders-wrapper { padding: 1.5rem; }
    .st-orders-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem; padding-bottom: 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .st-orders-title { font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0; }
    .st-orders-count {
      font-size: 0.8125rem; font-weight: 600; color: #ee6d0a;
      background: rgba(238,109,10,.1); padding: 0.25rem 0.75rem; border-radius: 9999px;
    }
    .st-orders-empty { text-align: center; padding: 3rem 1rem; }
    .st-orders-empty p { margin: 0; }
    .st-orders-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    .st-orders-table thead tr { background: #f8f9fa; border-bottom: 1px solid #e2e8f0; }
    .st-orders-table thead th {
      padding: 0.75rem 1rem; font-size: 0.75rem; font-weight: 600;
      color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; white-space: nowrap;
    }
    .st-orders-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background .15s; }
    .st-orders-table tbody tr:last-child { border-bottom: none; }
    .st-orders-table tbody tr:hover { background: #fafbfc; }
    .st-orders-table tbody td { padding: 0.875rem 1rem; vertical-align: middle; color: #475569; }
  `;

  if (!order_items || order_items.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="st-orders-wrapper">
          <div className="st-orders-header">
            <h3 className="st-orders-title">Mes Commandes</h3>
            <span className="st-orders-count">0 commande</span>
          </div>
          <div className="st-orders-empty">
            <SvgEmptyOrders />
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginTop: '0.75rem', marginBottom: '0.375rem' }}>
              Aucune commande pour l'instant
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              Vos commandes apparaîtront ici une fois passées.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="st-orders-wrapper">
        <div className="st-orders-header">
          <h3 className="st-orders-title">Mes Commandes</h3>
          <span className="st-orders-count">{order_items.length} commande{order_items.length > 1 ? 's' : ''}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <MyOrderItems itemsPerPage={8} items={order_items} />
        </div>
      </div>
    </>
  );
};

export default MyOrders;
