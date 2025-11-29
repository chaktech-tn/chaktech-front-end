'use client';
import React from "react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";

// Single category placeholder card (skeleton loader)
const CategoryPlaceholder = () => {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .placeholder-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .placeholder-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="product__category-item mb-20 text-center">
        {/* Category Image Placeholder */}
        <div className="product__category-thumb w-img">
          <div
            style={{
              width: '100%',
              height: '181px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Shimmer effect */}
            <div
              className="placeholder-shimmer"
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
            />
          </div>
        </div>
        
        {/* Category Title Placeholder */}
        <div className="product__category-content">
          <h3 className="product__category-title">
            <div
              className="placeholder-pulse"
              style={{
                height: '20px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                width: '60%',
                margin: '10px auto 0',
              }}
            />
          </h3>
        </div>
      </div>
    </>
  );
};

// Category placeholder slider (for Swiper)
const CategoryPlaceholderSlider = ({ count = 4 }) => {
  const [loop, setLoop] = React.useState(false);
  React.useEffect(() => setLoop(true), []);

  return (
    <div className="product__category-slider">
      <Swiper
        className="product__category-slider-active swiper-container"
        slidesPerView={4}
        spaceBetween={30}
        loop={loop}
        modules={[Scrollbar]}
        scrollbar={{
          el: ".tp-scrollbar",
          clickable: true,
        }}
        breakpoints={{
          1601: {
            slidesPerView: 4,
          },
          1400: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <SwiperSlide key={index}>
            <CategoryPlaceholder />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="tp-scrollbar"></div>
    </div>
  );
};

export default CategoryPlaceholderSlider;
export { CategoryPlaceholder };

