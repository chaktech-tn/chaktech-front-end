"use client";
import React from "react";

const StitchFeatures = () => {
  const cssStyles = `
    .stitch-features-section {
      padding: 3rem 0;
      background-color: #ffffff;
      border-top: 1px solid #f3f4f6;
    }

    .stitch-features-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 2rem;
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    @media (min-width: 640px) {
      .stitch-features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .stitch-features-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .stitch-feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stitch-feature-icon {
      margin-bottom: 1rem;
      display: flex;
      height: 3rem;
      width: 3rem;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: rgba(238, 109, 10, 0.1); /* Primary orange with 10% opacity */
      color: #ee6d0a;
      font-size: 1.5rem;
    }

    .stitch-feature-title {
      font-size: 1rem;
      font-weight: 600;
      color: #222529;
      margin-bottom: 0.25rem;
      font-family: 'Inter', sans-serif;
    }

    .stitch-feature-desc {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
      font-family: 'Inter', sans-serif;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <section className="stitch-features-section">
        <div className="stitch-features-grid">
          
          <div className="stitch-feature-item">
            <div className="stitch-feature-icon">
              <i className="fa-light fa-truck-fast"></i>
            </div>
            <h3 className="stitch-feature-title">Livraison Rapide</h3>
            <p className="stitch-feature-desc">Partout en Tunisie sous 48h</p>
          </div>

          <div className="stitch-feature-item">
            <div className="stitch-feature-icon">
              <i className="fa-light fa-shield-check"></i>
            </div>
            <h3 className="stitch-feature-title">Garantie Officielle</h3>
            <p className="stitch-feature-desc">Produits certifiés et garantis</p>
          </div>

          <div className="stitch-feature-item">
            <div className="stitch-feature-icon">
              <i className="fa-light fa-headset"></i>
            </div>
            <h3 className="stitch-feature-title">Support Client</h3>
            <p className="stitch-feature-desc">Disponible 7j/7 pour vous aider</p>
          </div>

          <div className="stitch-feature-item">
            <div className="stitch-feature-icon">
              <i className="fa-light fa-credit-card"></i>
            </div>
            <h3 className="stitch-feature-title">Paiement Sécurisé</h3>
            <p className="stitch-feature-desc">Paiement à la livraison ou en ligne</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default StitchFeatures;
