'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslations } from 'next-intl';

const SingleCategory = ({ item }) => {
  const router = useRouter();
  const t = useTranslations('common');
  return (
    <div className="product__category-item mb-20 text-center">
      <div className="product__category-thumb w-img">
        <a
          onClick={() =>
            router.push(
              `/shop?Category=${item.parent
                .toLowerCase()
                .replace("&", "")
                .split(" ")
                .join("-")}`
            )
          }
          style={{ cursor: "pointer" }}
        >
          <Image
            src={item.img}
            alt={item.parent || t('images')}
            width={272}
            height={181}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </a>
      </div>
      <div className="product__category-content">
        <h3 className="product__category-title">
          <a
            onClick={() =>
              router.push(
                `/shop?Category=${item.parent
                  .toLowerCase()
                  .replace("&", "")
                  .split(" ")
                  .join("-")}`
              )
            }
            style={{ cursor: "pointer" }}
          >
            {item.parent}
          </a>
        </h3>
      </div>
    </div>
  );
};

export default SingleCategory;
