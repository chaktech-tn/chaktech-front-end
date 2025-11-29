"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import React, { useEffect } from "react";

import ErrorMessage from "@components/error-message/error";
import Loader from "@components/loader/loader";
import DashboardArea from "@components/user-dashboard/dashboard-area";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

// internal
import { useGetUserOrdersQuery } from "src/redux/features/orderApi";

const UserDashboardMainArea = () => {
  const t = useTranslations('common');
  const {
    data: orderData,
    isError,
    isLoading,
    refetch,
  } = useGetUserOrdersQuery();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticate = localStorage.getItem("auth");
    if (!isAuthenticate) {
      router.push("/login");
    }
    if (orderData) {
      refetch();
    }
  }, [router, orderData, refetch]);
  let content = null;

  if (isLoading) {
    content = (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (isError) {
    content = <ErrorMessage message={t('error') || "There was an error"} />;
  }
  if (orderData && !isError) {
    content = <DashboardArea orderData={orderData} />;
  }

  return (
    <Wrapper>
      <Header style_2={true} />
      {content}
      <Footer />
    </Wrapper>
  );
};

export default UserDashboardMainArea;
