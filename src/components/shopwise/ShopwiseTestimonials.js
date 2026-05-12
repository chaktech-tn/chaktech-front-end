"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ShopwiseTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alden Smith",
      role: "Designer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
      id: 2,
      name: "Daisy Doe",
      role: "Developer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
      id: 3,
      name: "John Wick",
      role: "Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
      stars: 4,
      avatar: "https://i.pravatar.cc/150?u=3"
    }
  ];

  return (
    <section className="shopwise-testimonials py-5 bg-white">
      <div className="container">
        <h3 className="fw-bold mb-5 text-center">User Feedbacks</h3>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
          className="pb-5"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonial-card p-4 rounded-4 bg-white border-0 shadow-sm h-100 text-center" style={{ border: "1px solid #f0f0f0 !important" }}>
                <div className="stars text-warning mb-3">
                  <i className="fa-solid fa-star small"></i>
                  <i className="fa-solid fa-star small"></i>
                  <i className="fa-solid fa-star small"></i>
                  <i className="fa-solid fa-star small"></i>
                  <i className="fa-solid fa-star small"></i>
                </div>
                <p className="text-muted mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{item.text}</p>
                <div className="user-info d-flex align-items-center justify-content-center gap-3">
                  <img src={item.avatar} alt={item.name} className="rounded-circle" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                  <div className="text-start">
                    <h6 className="mb-0 fw-bold" style={{ fontSize: "1rem" }}>{item.name}</h6>
                    <span className="small text-muted">{item.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>{`
        .testimonial-card {
          transition: transform 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default ShopwiseTestimonials;
