"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const StitchHeroBanner = () => {
  const t = useTranslations("hero");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const cssStyles = `
    .stitch-hero-section {
      position: relative;
      overflow: hidden;
      background-color: #f8fafc;
      padding: 6rem 0;
    }
    
    @media (min-width: 640px) {
      .stitch-hero-section {
        padding: 8rem 0;
      }
    }

    @media (min-width: 1024px) {
      .stitch-hero-section {
        padding: 10rem 0;
      }
    }

    .stitch-hero-blur {
      position: absolute;
      left: 50%;
      top: 0;
      z-index: 0;
      transform: translateX(-50%);
      filter: blur(120px);
      width: 1155px;
      height: 678px;
      background: linear-gradient(to top right, rgba(238, 109, 10, 0.3), rgba(156, 163, 175, 0.3));
      opacity: 0.2;
      clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%);
    }

    .stitch-hero-container {
      position: relative;
      z-index: 10;
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1.5rem;
      text-align: center;
    }

    .stitch-hero-content {
      max-width: 48rem;
      margin: 0 auto;
    }

    .stitch-hero-title {
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: -0.025em;
      color: #222529;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      font-family: 'Inter', sans-serif;
    }

    @media (min-width: 640px) {
      .stitch-hero-title {
        font-size: 4rem;
      }
    }

    .stitch-hero-subtitle {
      margin-top: 1.5rem;
      font-size: 1.125rem;
      line-height: 2rem;
      color: #4b5563;
      margin-bottom: 2.5rem;
      font-family: 'Inter', sans-serif;
    }

    .stitch-glass-search {
      position: relative;
      margin: 0 auto;
      display: flex;
      max-width: 38rem;
      align-items: center;
      gap: 0.5rem;
      border-radius: 1rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease-in-out;
    }

    .stitch-glass-search:focus-within {
      box-shadow: 0 0 0 2px rgba(238, 109, 10, 0.5);
    }

    .stitch-search-icon {
      padding-left: 0.75rem;
      color: #9ca3af;
      display: flex;
      align-items: center;
    }

    .stitch-search-input {
      flex: 1;
      border: 0;
      background: transparent;
      padding: 0.75rem 0.5rem 0.75rem 0.5rem;
      color: #222529;
      outline: none;
      font-size: 1rem;
      width: 100%;
    }

    .stitch-search-input::placeholder {
      color: #9ca3af;
    }

    .stitch-search-btn {
      border-radius: 0.75rem;
      background-color: #ee6d0a;
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      border: none;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition: all 0.2s;
      cursor: pointer;
    }

    .stitch-search-btn:hover {
      background-color: #d15b00;
      box-shadow: 0 10px 25px -5px rgba(238, 109, 10, 0.4);
    }

    .stitch-category-pills {
      margin-top: 3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
    }

    .stitch-category-pill {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 9999px;
      background-color: white;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #222529;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      transition: all 0.2s;
      text-decoration: none;
    }

    .stitch-category-pill i {
      font-size: 1.125rem;
      color: #6b7280;
      transition: color 0.2s;
    }

    .stitch-category-pill:hover {
      background-color: #f9fafb;
      color: #ee6d0a;
    }

    .stitch-category-pill:hover i {
      color: #ee6d0a;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <section className="stitch-hero-section">
        <div aria-hidden="true" className="stitch-hero-blur"></div>
        <div className="stitch-hero-container">
          <div className="stitch-hero-content">
            <h1 className="stitch-hero-title">
              Découvrir nos produits
            </h1>
            <p className="stitch-hero-subtitle">
              La meilleure technologie en Tunisie à portée de main. Des performances inégalées pour votre quotidien.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="stitch-glass-search">
              <div className="stitch-search-icon">
                <i className="fa-regular fa-magnifying-glass"></i>
              </div>
              <input 
                className="stitch-search-input" 
                placeholder="Rechercher un produit (ex: iPhone 15, Dell XPS...)" 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="stitch-search-btn">
                Explorer
              </button>
            </form>

            <div className="stitch-category-pills">
              <Link href="/shop?category=Informatique" className="stitch-category-pill">
                <i className="fa-light fa-laptop"></i> PC Portables
              </Link>
              <Link href="/shop?category=Téléphonie+et+Tablette" className="stitch-category-pill">
                <i className="fa-light fa-mobile"></i> Smartphones
              </Link>
              <Link href="/shop?category=Electromenager" className="stitch-category-pill">
                <i className="fa-light fa-refrigerator"></i> Electroménager
              </Link>
              <Link href="/shop?category=Gaming" className="stitch-category-pill">
                <i className="fa-light fa-gamepad"></i> Gaming
              </Link>
              <Link href="/shop?category=Impression" className="stitch-category-pill">
                <i className="fa-light fa-print"></i> Impression
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StitchHeroBanner;
