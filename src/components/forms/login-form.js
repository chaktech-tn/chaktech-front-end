'use client';
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import ErrorMessage from "@components/error-message/error";
import { EyeCut, Lock, UserTwo } from "@svg/index";
import { notifyError, notifySuccess } from "@utils/toast";
import { useLoginUserMutation } from "src/redux/features/auth/authApi";
// internal

const LoginForm = () => {
  const t = useTranslations('auth');
  const [showPass, setShowPass] = useState(false);
  const [loginUser, {}] = useLoginUserMutation();
  const router = useRouter();
  
  const schema = Yup.object().shape({
    email: Yup.string().required().email().label(t('email')),
    password: Yup.string().required().min(6).label(t('password')),
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
    loginUser({
      email: data.email,
      password: data.password,
    })
      .then((data) => {
        if(data?.error){
          notifyError(data?.error?.data?.error);
        }
        else {
          notifySuccess(t('loginSuccessfully'));
          setTimeout(() => {
            router.push("/");
          },500)
        }
      })
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login__input-wrapper">
        <div className="login__input-item">
          <div className="login__input">
            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder={t('enterYourEmail')}
              id="email"
            />
            <span>
              <UserTwo />
            </span>
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("password")}
                name="password"
                type={showPass ? "text" : "password"}
                placeholder={t('enterPassword')}
                id="password"
              />
              <span>
                <Lock />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <i className="fa-regular fa-eye"></i> : <EyeCut />}
            </span>
            {/* error msg start */}
            <ErrorMessage message={errors.password?.message} />
            {/* error msg end */}
          </div>
        </div>
      </div>

      <div className="login__option mb-25 d-sm-flex justify-content-between">
        <div className="login__remember">
          <input type="checkbox" id="tp-remember" />
          <label htmlFor="tp-remember">{t('rememberMe')}</label>
        </div>
        <div className="login__forgot">
          <Link href="/forgot">{t('forgotPassword')}</Link>
        </div>
      </div>
      <div className="login__btn">
        <button type="submit" className="tp-btn w-100">
          {t('signIn')}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
