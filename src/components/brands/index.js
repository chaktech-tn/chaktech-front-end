'use client';
// external
// internal
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { useGetBrandsQuery } from "src/redux/features/brandApi";

import brand_1 from "@assets/img/brand/brand-1.png";
import brand_2 from "@assets/img/brand/brand-2.png";
import brand_3 from "@assets/img/brand/brand-3.png";
import brand_4 from "@assets/img/brand/brand-4.png";
import brand_5 from "@assets/img/brand/brand-5.png";
import brand_6 from "@assets/img/brand/brand-6.png";
import brand_7 from "@assets/img/brand/brand-7.png";
import brand_8 from "@assets/img/brand/brand-8.png";

// slider setting 1
const settings_1 = {
  speed: 4000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
  pauseOnFocus: false,
  pauseOnHover: true,
};

const settings_2 = {
  speed: 3000,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  arrows: false,
  buttons: false,
};

// data
const brand_1_data = [
  { brand: brand_1 },
  { brand: brand_2 },
  { brand: brand_3 },
  { brand: brand_4 },
  { brand: brand_5 },
  { brand: brand_6 },
  { brand: brand_7 },
  { brand: brand_8 },
];
const brand_2_data = [
  { brand: brand_1 },
  { brand: brand_3 },
  { brand: brand_6 },
  { brand: brand_5 },
  { brand: brand_8 },
  { brand: brand_2 },
  { brand: brand_7 },
  { brand: brand_4 },
];

const Brands = () => {
  const sliderRef = useRef();
  const autoplayOn = true;
  const autoplaySpeed = 0;
  const { data: backendBrands = [] } = useGetBrandsQuery();

  const dynamicBrands = backendBrands
    .filter((brand) => brand?.isActive !== false)
    .map((brand) => {
      const image =
        brand?.image?.url ||
        brand?.logo?.url ||
        brand?.image ||
        brand?.logo ||
        null;

      return {
        id: brand?._id || brand?.id || brand?.name,
        name: brand?.name || "brand",
        image,
      };
    })
    .filter((brand) => Boolean(brand.image));

  const hasDynamicBrands = dynamicBrands.length > 0;

  useEffect(() => {
    const intervalId = setInterval(function () {
      if (!autoplayOn) return;
      sliderRef?.current?.slickPrev();
    }, autoplaySpeed);

    return () => clearInterval(intervalId);
  }, [autoplayOn, autoplaySpeed]);

  return (
    <>
      <section
        className={`brand__area pb-120`}
      >
        <div className="container-fluid g-0">
          <div className="row gx-0 gy-2">
            <div className="col-xxl-12">
              <div className={`brand__slider-5`}>
                <div className="brand__slider-5">
                  <Slider {...settings_1} className="brand__slider-active-5">
                    {hasDynamicBrands
                      ? dynamicBrands.map((brand, i) => (
                          <div key={brand.id || i} className="brand__item-5">
                            <Image
                              src={brand.image}
                              alt={brand.name}
                              width={140}
                              height={60}
                              unoptimized
                            />
                          </div>
                        ))
                      : brand_1_data.map((brand, i) => (
                          <div key={i} className="brand__item-5">
                            <Image src={brand.brand} alt="brand" />
                          </div>
                        ))}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className={`brand__slider-5-1`}>
                <div className="brand__slider-5">
                  <Slider
                    {...settings_2}
                    className="brand__slider-active-5-1"
                    ref={sliderRef}
                  >
                    {hasDynamicBrands
                      ? [...dynamicBrands].reverse().map((brand, i) => (
                          <div key={`${brand.id || i}-secondary`} className="brand__item-5">
                            <Image
                              src={brand.image}
                              alt={brand.name}
                              width={140}
                              height={60}
                              unoptimized
                            />
                          </div>
                        ))
                      : brand_2_data.map((brand, i) => (
                          <div key={i} className="brand__item-5">
                            <Image src={brand.brand} alt="brand" />
                          </div>
                        ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;
