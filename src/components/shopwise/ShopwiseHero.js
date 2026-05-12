"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ShopwiseHero = () => {
  const slides = [
    {
      id: 1,
      title: "Vente Flash Spéciale",
      subtitle: "Offres Limitées",
      desc: "Découvrez nos meilleures offres sur la téléphonie et l'informatique. Jusqu'à 50% de réduction.",
      bg: "#1a1a1a",
      textColor: "#fff",
      img: "https://chaktech.tn/wp-content/uploads/2025/07/1.webp",
      btnText: "Voir les offres",
      btnLink: "/shop?category=vente-flash"
    },
    {
      id: 2,
      title: "Nouvelle Collection",
      subtitle: "Tech & Style",
      desc: "Les derniers smartphones et accessoires high-tech sont arrivés chez ChakTech.",
      bg: "#f8f9fa",
      textColor: "#1d1d1f",
      img: "https://chaktech.tn/wp-content/uploads/2025/07/2.webp",
      btnText: "Explorer",
      btnLink: "/shop"
    }
  ];

  return (
    <section className="shopwise-hero-section py-4">
      <div className="container">
        <div className="row g-4">
          {/* Main Slider */}
          <div className="col-lg-8">
            <div className="hero-slider-main rounded-4 overflow-hidden h-100 shadow-sm border">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-100"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div 
                      className="hero-slide-item d-flex align-items-center"
                      style={{ 
                        backgroundColor: slide.bg, 
                        color: slide.textColor,
                        minHeight: "450px",
                        position: "relative"
                      }}
                    >
                      <div className="row w-100 align-items-center g-0 px-5">
                        <div className="col-md-6 order-2 order-md-1">
                          <div className="slide-content py-5">
                            <span className="d-block fw-bold mb-2 text-uppercase letter-spacing-1" style={{ color: "var(--primary-color)", fontSize: "0.9rem" }}>
                              {slide.subtitle}
                            </span>
                            <h2 className="display-4 fw-black mb-3" style={{ lineHeight: 1.1 }}>
                              {slide.title}
                            </h2>
                            <p className="mb-4 opacity-75" style={{ maxWidth: "400px" }}>
                              {slide.desc}
                            </p>
                            <Link 
                              href={slide.btnLink} 
                              className="btn btn-primary btn-lg rounded-pill px-4 fw-bold shadow"
                              style={{ backgroundColor: "var(--primary-color)", border: "none" }}
                            >
                              {slide.btnText}
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-6 order-1 order-md-2 text-center">
                          <div className="slide-image-wrapper p-4">
                            <img 
                              src={slide.img} 
                              alt={slide.title}
                              className="img-fluid"
                              style={{ maxHeight: "350px", objectFit: "contain", borderRadius: "12px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Side Banners */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="side-banner rounded-4 p-4 shadow-sm h-50 d-flex flex-column justify-content-center border-0" style={{ backgroundColor: "#d2eff1" }}>
              <div className="row align-items-center g-0">
                <div className="col-7 p-2">
                  <h6 className="fw-bold mb-1" style={{ fontSize: "1.1rem" }}>Great Security</h6>
                  <p className="small text-muted mb-3">Drone Camera</p>
                  <Link href="/shop" className="text-primary text-decoration-none small fw-bold" style={{ color: "#007bff !important" }}>Shop Now</Link>
                </div>
                <div className="col-5 text-center">
                  <img 
                    src="https://chaktech.tn/wp-content/uploads/2025/05/store_01J9X614YMCZZCQRSW14VWAHDQ_assets_1728900606397-1-300x300.webp" 
                    className="img-fluid" 
                    alt="Smart Watch" 
                    style={{ maxHeight: "110px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div className="side-banner rounded-4 p-4 shadow-sm h-50 d-flex flex-column justify-content-center border-0" style={{ backgroundColor: "#f6ede8" }}>
              <div className="row align-items-center g-0">
                <div className="col-7 p-2">
                  <h6 className="fw-bold mb-1" style={{ fontSize: "1.1rem" }}>Galaxy S22</h6>
                  <p className="small text-muted mb-3">50% Off</p>
                  <Link href="/shop" className="text-primary text-decoration-none small fw-bold" style={{ color: "#007bff !important" }}>Shop Now</Link>
                </div>
                <div className="col-5 text-center">
                  <img 
                    src="https://chaktech.tn/wp-content/uploads/2025/07/2.webp" 
                    className="img-fluid" 
                    alt="Pc Portable" 
                    style={{ maxHeight: "110px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .letter-spacing-1 { letter-spacing: 2px; }
        .fw-black { font-weight: 900; }
        .side-banner {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .side-banner:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color) !important;
        }
      `}</style>
    </section>
  );
};

export default ShopwiseHero;
