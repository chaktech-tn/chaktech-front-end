"use client";
import React, { useState } from "react";
import ChangePassword from './change-password';
import MyOrders from './my-orders';
import OrderInfo from "./order-info";
import UpdateUser from './update-user';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"/></svg>
  )},
  { id: 'orders', label: 'Mes Commandes', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z"/></svg>
  )},
  { id: 'profile', label: 'Mon Profil', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
  )},
  { id: 'password', label: 'Sécurité', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
  )},
];

const SvgLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
  </svg>
);

const DashboardArea = ({ orderData }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const styles = `
    .st-profile-page {
      background: #f8fafc;
      min-height: 80vh;
      padding: 3rem 0;
      font-family: 'Poppins', sans-serif;
    }
    .st-profile-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 1024px) {
      .st-profile-container {
        grid-template-columns: 260px 1fr;
      }
    }
    .st-profile-sidebar {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 4px 20px -4px rgba(0,0,0,.06);
      height: fit-content;
    }
    .st-profile-user-header {
      background: linear-gradient(135deg, #ee6d0a, #ff8c38);
      padding: 1.5rem;
      text-align: center;
    }
    .st-profile-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      border: 3px solid rgba(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 0.75rem;
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
    }
    .st-profile-user-name {
      font-weight: 700;
      color: white;
      font-size: 1rem;
      margin: 0;
    }
    .st-profile-user-tag {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.8);
      background: rgba(255,255,255,0.15);
      display: inline-block;
      padding: 0.125rem 0.625rem;
      border-radius: 9999px;
      margin-top: 0.375rem;
    }
    .st-profile-nav {
      padding: 0.75rem;
      list-style: none;
      margin: 0;
    }
    .st-profile-nav-item {
      margin-bottom: 0.25rem;
    }
    .st-profile-nav-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.9375rem;
      font-weight: 500;
      color: #475569;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all .15s;
      text-align: left;
    }
    .st-profile-nav-btn:hover {
      background: #fff7ed;
      color: #ee6d0a;
    }
    .st-profile-nav-btn.active {
      background: #ee6d0a;
      color: white;
    }
    .st-profile-logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.9375rem;
      font-weight: 500;
      color: #ef4444;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background .15s;
    }
    .st-profile-logout-btn:hover {
      background: #fef2f2;
    }
    .st-profile-divider {
      height: 1px;
      background: #f1f5f9;
      margin: 0 0.75rem;
    }
    .st-profile-content {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 1rem;
      box-shadow: 0 4px 20px -4px rgba(0,0,0,.06);
      min-height: 400px;
      overflow: hidden;
    }
  `;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="st-profile-page">
        <div className="st-profile-container">
          {/* Sidebar */}
          <aside className="st-profile-sidebar">
            <div className="st-profile-user-header">
              <div className="st-profile-avatar">
                {orderData?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <p className="st-profile-user-name">{orderData?.user?.name || "Mon Compte"}</p>
              <span className="st-profile-user-tag">Compte Premium</span>
            </div>

            <ul className="st-profile-nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="st-profile-nav-item">
                  <button
                    className={`st-profile-nav-btn${activeTab === item.id ? ' active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
              <div className="st-profile-divider" style={{ margin: '0.5rem 0' }} />
              <li>
                <button className="st-profile-logout-btn" onClick={handleLogout}>
                  <SvgLogout />
                  Déconnexion
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="st-profile-content">
            {activeTab === 'dashboard' && <OrderInfo orderData={orderData} />}
            {activeTab === 'orders' && <MyOrders orderData={orderData} />}
            {activeTab === 'profile' && <UpdateUser />}
            {activeTab === 'password' && <ChangePassword />}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardArea;
