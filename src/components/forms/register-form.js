'use client';
import ErrorMessage from "@components/error-message/error";
import { yupResolver } from '@hookform/resolvers/yup';
import { Email, EyeCut, Lock, UserTwo } from "@svg/index";
import { notifyError, notifySuccess } from "@utils/toast";
import { useTranslations } from 'next-intl';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "src/redux/features/auth/authApi";
import * as Yup from "yup";
// internal


const RegisterForm = () => {
  const t = useTranslations('auth');
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [registerUser, {}] = useRegisterUserMutation();
  
  const schema = Yup.object().shape({
    name: Yup.string().required().label(t('name')),
    email: Yup.string().required().email().label(t('email')),
    password: Yup.string().required().min(6).label(t('password')),
    confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], t('passwordsMustMatch'))
  });
  
  // react hook form
  const { register, handleSubmit, formState:{ errors },reset } = useForm({
    resolver: yupResolver(schema)
  });
  // on submit
  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      
      if (result?.message) {
        notifySuccess(result.message);
        reset();
      }
    } catch (error) {
      notifyError(error?.data?.message || t('registerFailed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login__input-wrapper">
        <div className="login__input-item">
          <div className="login__input">
            <input
              {...register("name",{required:t('nameRequired')})}
              name="name"
              type="text"
              placeholder={t('enterYourName')}
              id="name"
            />
            <span>
              <UserTwo />
            </span>
          </div>
           <ErrorMessage message={errors.name?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input">
            <input
             {...register("email",{required:t('emailRequired')})}
              name="email"
              type="email"
              placeholder={t('enterYourEmail')}
              id="email"
            />
            <span>
              <Email />
            </span>
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("password",{required:t('passwordRequired')})}
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
          </div>
          <ErrorMessage message={errors.password?.message} />
        </div>

        <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
               {...register("confirmPassword")}
                name="confirmPassword"
                type={showConPass ? "text" : "password"}
                placeholder={t('enterConfirmPassword')}
                id="confirmPassword"
              />
              <span>
                <Lock />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowConPass(!showConPass)}
            >
              {showConPass ? <i className="fa-regular fa-eye"></i> : <EyeCut />}
            </span>
          </div>
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>
      </div>


      <div className="login__btn mt-25">
        <button type="submit" className="tp-btn w-100">
          {t('signUp')}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
