'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import React from "react";

const SingleCategory = ({ item }) => {
  const router = useRouter();
  const t = useTranslations('common');
  return (
    <div className="product__category-item mb-20 text-center">
      <div className="product__category-thumb w-img">
        <div
          role="button"
          tabIndex={0}
          onClick={() =>
            router.push(
              `/shop?Category=${item.parent
                .toLowerCase()
                .replace("&", "")
                .split(" ")
                .join("-")}`
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              router.push(
                `/shop?Category=${item.parent
                  .toLowerCase()
                  .replace("&", "")
                  .split(" ")
                  .join("-")}`
              );
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={item.img}
            alt={item.parent || t('images')}
            width={272}
            height={181}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="product__category-content">
        <h3 className="product__category-title">
          <div
            role="button"
            tabIndex={0}
            onClick={() =>
              router.push(
                `/shop?Category=${item.parent
                  .toLowerCase()
                  .replace("&", "")
                  .split(" ")
                  .join("-")}`
              )
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push(
                  `/shop?Category=${item.parent
                    .toLowerCase()
                    .replace("&", "")
                    .split(" ")
                    .join("-")}`
                );
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {item.parent}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default SingleCategory;
