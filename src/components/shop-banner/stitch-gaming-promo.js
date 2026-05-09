"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const StitchGamingPromo = () => {
  const cssStyles = `
    .stitch-promo-section {
      padding: 3rem 0;
      background-color: #f8fafc;
    }

    .stitch-promo-container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .stitch-promo-card {
      overflow: hidden;
      border-radius: 1.5rem;
      background-color: #222529; /* Navy */
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      display: grid;
      grid-template-columns: 1fr;
    }

    @media (min-width: 1024px) {
      .stitch-promo-card {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }

    .stitch-promo-content {
      padding: 2.5rem 1.5rem 3rem;
    }

    @media (min-width: 640px) {
      .stitch-promo-content {
        padding: 4rem;
      }
    }

    @media (min-width: 1024px) {
      .stitch-promo-content {
        padding: 4rem 5rem 5rem;
        align-self: center;
      }
    }

    .stitch-promo-title {
      font-size: 1.875rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: white;
      line-height: 1.2;
      font-family: 'Inter', sans-serif;
    }

    @media (min-width: 640px) {
      .stitch-promo-title {
        font-size: 2.25rem;
      }
    }

    .stitch-promo-title-highlight {
      display: block;
      color: #ee6d0a; /* Primary orange */
      margin-top: 0.25rem;
    }

    .stitch-promo-desc {
      margin-top: 1rem;
      font-size: 1.125rem;
      line-height: 1.5rem;
      color: #d1d5db;
      font-family: 'Inter', sans-serif;
    }

    .stitch-promo-actions {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .stitch-btn-solid {
      border-radius: 0.375rem;
      background-color: white;
      padding: 0.625rem 0.875rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #222529;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition: background-color 0.2s;
      text-decoration: none;
    }

    .stitch-btn-solid:hover {
      background-color: #f3f4f6;
    }

    .stitch-btn-outline {
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.5rem;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: color 0.2s;
      text-decoration: none;
    }

    .stitch-btn-outline i {
      font-size: 1rem;
      transition: transform 0.2s;
    }

    .stitch-btn-outline:hover {
      color: #ee6d0a;
    }

    .stitch-btn-outline:hover i {
      transform: translateX(4px);
    }

    .stitch-promo-image-wrapper {
      position: relative;
      margin-top: -1.5rem;
      aspect-ratio: 5/3;
    }

    @media (min-width: 768px) {
      .stitch-promo-image-wrapper {
        aspect-ratio: 2/1;
      }
    }

    @media (min-width: 1024px) {
      .stitch-promo-image-wrapper {
        aspect-ratio: auto;
        height: 100%;
        margin-top: 0;
      }
    }

    .stitch-promo-image {
      transform: translate(1.5rem, 1.5rem);
      border-radius: 0.375rem;
      object-fit: cover;
      object-position: left top;
      width: 100%;
      height: 100%;
    }

    @media (min-width: 640px) {
      .stitch-promo-image {
        transform: translate(4rem, 4rem);
      }
    }

    @media (min-width: 1024px) {
      .stitch-promo-image {
        transform: translate(0, 5rem);
      }
    }

    .stitch-promo-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(34, 37, 41, 1), rgba(34, 37, 41, 0.2), transparent);
    }

    @media (min-width: 1024px) {
      .stitch-promo-gradient {
        background: linear-gradient(to left, transparent, rgba(34, 37, 41, 0.2), rgba(34, 37, 41, 1));
      }
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <section className="stitch-promo-section">
        <div className="stitch-promo-container">
          <div className="stitch-promo-card">
            
            <div className="stitch-promo-content">
              <div style={{ alignSelf: 'center' }}>
                <h2 className="stitch-promo-title">
                  <span style={{ display: 'block' }}>Prêt pour le niveau supérieur ?</span>
                  <span className="stitch-promo-title-highlight">Découvrez notre gamme Gaming.</span>
                </h2>
                <p className="stitch-promo-desc">
                  Équipez-vous avec les dernières cartes graphiques, écrans 144Hz et périphériques de précision.
                </p>
                <div className="stitch-promo-actions">
                  <Link href="/shop?category=Gaming" className="stitch-btn-solid">
                    Voir la boutique
                  </Link>
                  <Link href="/shop?category=Gaming" className="stitch-btn-outline">
                    En savoir plus <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="stitch-promo-image-wrapper">
              <img 
                alt="Gaming keyboard with RGB lighting" 
                className="stitch-promo-image" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMssZUsJevRLnVPXce3UYAv0fY00rddL_JgauImA1f4tu9Db1e407B3SlDaVjqT8pjVgITOcnCQBfJDQlsGZiRdUnWU_DX8R2yeUP4nxK1__ZklRh1dX-S0xsNcAtlDAPJd7z68puqHHmvdVpVScDvLQROZKWXdU4vDyoucKwspc-cnROK9r9YsUsw1ijqPXsMZaGdgyzdVE8vqBCMgjbd2naF7_puZwXAzXck8k0EehxFc2aAJ2Yf4PTzPZOMy9eO7CXytAm_lHp-"
              />
              <div className="stitch-promo-gradient"></div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default StitchGamingPromo;
