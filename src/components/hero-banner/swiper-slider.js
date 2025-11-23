"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import { RightArrow } from "@svg/index";

const SwiperSlider = ({ sliderData }) => {
  const [loop, setLoop] = useState(false);
  const t = useTranslations("hero");

  useEffect(() => {
    setLoop(true);
  }, []);

  return (
    <Swiper
      className="slider__active slider__active-13 swiper-container"
      slidesPerView={1}
      spaceBetween={0}
      effect="fade"
      loop={loop}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[EffectFade, Autoplay, Navigation, Pagination]}
    >
      {sliderData.map((item) => {
        // Get the image URL - handle Next.js Image imports
        let imageUrl;
        if (typeof item.img === "string") {
          imageUrl = item.img;
        } else if (item.img?.src) {
          imageUrl = item.img.src;
        } else if (item.img?.default?.src) {
          imageUrl = item.img.default.src;
        } else {
          imageUrl = String(item.img);
        }

        return (
          <SwiperSlide
            key={item.id}
            className="slider__item-13 slider__height-13 d-flex align-items-end"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          >
            <div className="container">
              <div className="row align-self-end">
                <div className="col-xl-6 col-lg-6">
                  <div className="slider__content-13">
                    <span className="slider__title-pre-13">
                      {item.pre_title}
                    </span>
                    <h3 className="slider__title-13">{item.title}</h3>
                    <div className="slider__btn-13">
                      <Link
                        href={item.link || "/shop"}
                        className="tp-btn-border"
                      >
                        {t("viewMore")}
                        <span>
                          <RightArrow />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="slider__thumb-13 text-end mr-40">
                    <span className="slider__thumb-13-circle-1"></span>
                    <span className="slider__thumb-13-circle-2"></span>
                    <Image
                      src={item.img}
                      alt={
                        item.titleText
                          ? `${item.titleText} - ChakTech`
                          : `Banner ${item.id} - ChakTech`
                      }
                      width={800}
                      height={600}
                      priority={item.id === 1}
                      style={{
                        width: "100%",
                        height: "auto",
                        position: "relative",
                        zIndex: 2,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperSlider;
