'use client';
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// internal
import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import ProductDetailsBreadcrumb from "@components/product-details/breadcrumb";
import { useGetProductQuery, useGetProductBySlugQuery } from "src/redux/features/productApi";
import ProductDetailsArea from "@components/product-details/product-details-area";
import ProductDetailsTabArea from "@components/product-details/product-details-tab-area";
import RelatedProducts from "@components/product-details/related-products";
import { initialOrderQuantity } from "src/redux/features/cartSlice";
import PrdDetailsLoader from "@components/loader/details-loader";
import { handleModalShow } from "src/redux/features/productSlice";
import { trackProductViewed } from "@utils/posthog";
// internal

export default function ShopDetailsMainArea({ id, slug }) {
  // Use slug-based query if slug is provided, otherwise fall back to ID
  const { data: productBySlug, isLoading: isLoadingSlug, isError: isErrorSlug } = slug 
    ? useGetProductBySlugQuery(slug) 
    : { data: null, isLoading: false, isError: false };
  const { data: productById, isLoading: isLoadingId, isError: isErrorId } = useGetProductQuery(id);
  
  const product = productBySlug || productById;
  const isLoading = isLoadingSlug || isLoadingId;
  const isError = isErrorSlug || isErrorId;
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialOrderQuantity());
  }, [dispatch]);
  // remove backdrop
  useLayoutEffect(() => {
    dispatch(handleModalShow())
  }, [dispatch, router]);
  // Track product viewed in PostHog
  useEffect(() => {
    if (!isLoading && !isError && product) {
      trackProductViewed(product);
    }
  }, [product, isLoading, isError]);
  // decide what to render
  let content = null;

  // Show loader when loading, keep loader when error (better UX than error message)
  if (isLoading || (isError && !product)) {
    content = <PrdDetailsLoader loading={isLoading || isError} />;
  }

  if (!isLoading && !isError && product) {
    content = (
      <>
        <ProductDetailsBreadcrumb title={product.title} />
        <ProductDetailsArea product={product} />
        <ProductDetailsTabArea product={product} />
        <RelatedProducts id={product._id} tags={product.tags} />
      </>
    );
  }

  return (
    <Wrapper>
      <Header style_2={true} />
      {content}
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
