'use client';
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from 'next-intl';
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import ErrorMessage from "@components/error-message/error";
import Email from "@svg/email";
import { notifyError, notifySuccess } from "@utils/toast";
import { useResetPasswordMutation } from "src/redux/features/auth/authApi";
// internal

const ForgotForm = () => {
  const t = useTranslations('auth');
  const [resetPassword, {}] = useResetPasswordMutation();
  
  const schema = Yup.object().shape({
    email: Yup.string().required().email().label(t('email')),
  });
  
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    resetPassword({
      verifyEmail: data.email,
    }).then((result) => {

      if(result?.error){
        notifyError(result?.error?.data?.message)
      }
      else {
        notifySuccess(result.data?.message);
      }
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login__input-wrapper">
        <div className="login__input-item">
          <div className="login__input">
            <input {...register("email")} type="email" placeholder={t('email')} />
            <span>
              <Email />
            </span>
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>
      </div>
      <div className="login__btn">
        <button type="submit" className="tp-btn w-100">
          {t('sendRequest')}
        </button>
      </div>
    </form>
  );
};

export default ForgotForm;
