'use client';
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useTranslations } from 'next-intl';
// internal
import { useChangePasswordMutation } from "src/redux/features/auth/authApi";
import ErrorMessage from "@components/error-message/error";
import { notifyError, notifySuccess } from "@utils/toast";

const ChangePassword = () => {
  const t = useTranslations('user');
  const { user } = useSelector((state) => state.auth);
  const [changePassword, {}] = useChangePasswordMutation();
  
  const schema = Yup.object().shape({
    email: Yup.string().required().email().label(t('emailAddress')),
    password: Yup.string().required().min(6).label(t('currentPassword')),
    newPassword: Yup.string().required().min(6).label(t('newPassword')),
    confirmPassword: Yup.string()
     .oneOf([Yup.ref('newPassword'), null], t('passwordsMustMatch'))
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

  // on submit
  const onSubmit = (data) => {
    changePassword({
      email: user?.email,
      password: data.password,
      newPassword: data.newPassword,
    }).then((result) => {
      console.log(result)
      if (result?.error) {
        notifyError(result?.error?.data?.message)
      }
      else {
        notifySuccess(result?.data?.message)
      }
    });
    reset();
  };
  return (
    <div className="profile__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xxl-12">
            <div className="profile__input-box">
              <h4>{t('emailAddress')}</h4>
              <div className="profile__input">
                <input
                  {...register("email", { required: t('emailRequired') })}
                  type="email"
                  defaultValue={user?.email}
                  placeholder={t('enterEmailAddress')}
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="profile__input-box">
              <h4>{t('currentPassword')}</h4>
              <div className="profile__input">
                <input
                  {...register("password", {
                    required: t('passwordRequired'),
                  })}
                  type="text"
                  placeholder={t('enterCurrentPassword')}
                />
                <ErrorMessage message={errors.password?.message} />
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__input-box">
              <h4>{t('newPassword')}</h4>
              <div className="profile__input">
                <input
                  {...register("newPassword", {
                    required: t('newPasswordRequired'),
                  })}
                  type="text"
                  placeholder={t('enterNewPassword')}
                />
                <ErrorMessage message={errors.password?.newPassword} />
              </div>
            </div>
          </div>
          {/* confirm password */}
          <div className="col-xxl-6 col-md-6">
            <div className="profile__input-box">
              <h4>{t('confirmPassword')}</h4>
              <div className="profile__input">
                <input
                  {...register("confirmPassword")}
                  type="text"
                  placeholder={t('confirmPassword')}
                />
                <ErrorMessage message={errors.confirmPassword?.message} />
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn-3">
                {t('update')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
