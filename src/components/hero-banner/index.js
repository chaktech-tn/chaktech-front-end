"use client";
// Original banner images
import electromenager_banner from "@assets/img/banners/electromenager-banner.webp";
import pc_portable_banner from "@assets/img/banners/pc-portable-banner.jpg";
import smartphone_banner from "@assets/img/banners/smartphone-banner.png";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

// Original banner images array
const bannerImages = [
  electromenager_banner,
  pc_portable_banner,
  smartphone_banner,
];

// Dynamic import Swiper to avoid hydration issues
const SwiperComponent = dynamic(() => import("./swiper-slider"), {
  ssr: false,
  loading: () => (
    <div className="porto-full-no-gap elementor-section home-banner-slider elementor-section-full_width">
      <div className="elementor-container elementor-column-gap-no porto-carousel has-ccols nav-pos-inside nav-style-4 show-nav-hover dots-style-1 custom-dots ccols-1">
        <div style={{ height: "500px", position: "relative" }}>
          <Image
            src={electromenager_banner}
            alt="Banner"
            width={2560}
            height={819}
            className="porto-ibanner-img"
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  ),
});

const HeroBanner = () => {
  const t = useTranslations("hero");

  // Create slider data with translations and original images
  const slider_data = useMemo(
    () => [
      {
        id: 1,
        pre_title: t("slider1.preTitle")
          .split("\n")
          .map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t("slider1.preTitle").split("\n").length - 1 && <br />}
            </React.Fragment>
          )),
        title: t("slider1.title")
          .split("\n")
          .map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t("slider1.title").split("\n").length - 1 && <br />}
            </React.Fragment>
          )),
        titleText: t("slider1.title"), // For alt text
        img: bannerImages[0], // electromenager_banner
        link: "/shop?category=Electromenager",
      },
      {
        id: 2,
        pre_title: t("slider2.preTitle")
          .split("\n")
          .map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t("slider2.preTitle").split("\n").length - 1 && <br />}
            </React.Fragment>
          )),
        title: t("slider2.title")
          .split("\n")
          .map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t("slider2.title").split("\n").length - 1 && <br />}
            </React.Fragment>
          )),
        titleText: t("slider2.title"), // For alt text
        img: bannerImages[1], // pc_portable_banner
        link: "/shop?category=Informatique",
      },
      {
        id: 3,
        pre_title: t("slider3.preTitle")
          .split("\n")
          .map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t("slider3.preTitle").split("\n").length - 1 && <br />}
            </React.Fragment>
          )),
        title: t("slider3.title")
          .split("\n")
          .map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t("slider3.title").split("\n").length - 1 && <br />}
            </React.Fragment>
          )),
        titleText: t("slider3.title"), // For alt text
        img: bannerImages[2], // smartphone_banner
        link: "/shop?category=Téléphonie et Tablette",
      },
    ],
    [t]
  );

  return (
    <section
      className="slider__area"
      style={{ position: "relative", zIndex: 1 }}
    >
      <SwiperComponent sliderData={slider_data} />
    </section>
  );
};

export default HeroBanner;
