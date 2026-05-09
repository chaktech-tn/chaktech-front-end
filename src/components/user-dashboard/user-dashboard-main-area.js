"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import ErrorMessage from "@components/error-message/error";
import useAuthCheck from "@hooks/use-auth-check";
import Loader from "@components/loader/loader";
import DashboardArea from "@components/user-dashboard/dashboard-area";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

// internal
import { useGetUserOrdersQuery } from "src/redux/features/orderApi";

const UserDashboardMainArea = () => {
  const t = useTranslations('common');
  const authChecked = useAuthCheck();
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const {
    data: orderData,
    isError,
    isLoading,
  } = useGetUserOrdersQuery(undefined, {
    skip: !authChecked || !accessToken,
  });
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !accessToken) {
      router.push("/login");
    }
  }, [router, authChecked, accessToken]);
  let content = null;

  if (!authChecked || isLoading) {
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
