'use client';
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from 'next-intl';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import ErrorMessage from "@components/error-message/error";
import { EmailTwo, Location, MobileTwo, UserTwo } from "@svg/index";
import { notifyError, notifySuccess } from "@utils/toast";
import { useUpdateProfileMutation } from "src/redux/features/auth/authApi";
// internal

const UpdateUser = () => {
  const t = useTranslations('user');
  const [bioText, setBioText] = useState(t('bioPlaceholder'));
  const { user } = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    name: Yup.string().required().label(t('personalDetails')),
    email: Yup.string().required().email().label(t('emailAddress')),
    phone: Yup.string().required().min(11).label(t('phone')),
    address: Yup.string().required().label(t('address')),
    bio: Yup.string().required().min(20).label(t('bio')),
  });

  const [updateProfile, {}] = useUpdateProfileMutation();
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
    updateProfile({
      id:user?._id,
      name:data.name,
      email:data.email,
      phone:data.phone,
      address:data.address,
      bio:data.bio,
    }).then((result) => {

      if(result?.error){
        notifyError(result?.error?.data?.message);
      }
      else {
        notifySuccess(result?.data?.message);
      }
    })
    reset();
  };

  return (
    <div className="profile__info">
      <h3 className="profile__info-title">{t('personalDetails')}</h3>
      <div className="profile__info-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("name", { required: t('nameRequired') })}
                    type="text"
                    placeholder={t('enterYourUsername')}
                    defaultValue={user?.name}
                  />
                  <span>
                    <UserTwo />
                  </span>
                  <ErrorMessage message={errors.name?.message} />
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("email", { required: t('emailRequired') })}
                    type="email"
                    placeholder={t('enterYourEmail')}
                    defaultValue={user?.email}
                  />
                  <span>
                    <EmailTwo />
                  </span>
                  <ErrorMessage message={errors.email?.message} />
                </div>
              </div>
            </div>

            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("phone", { required: t('phoneRequired') })}
                    type="text"
                    placeholder={t('enterYourNumber')}
                    defaultValue="0123 456 7889"
                  />
                  <span>
                    <MobileTwo />
                  </span>
                  <ErrorMessage message={errors.phone?.message} />
                </div>
              </div>
            </div>

            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("address", { required: t('addressRequired') })}
                    type="text"
                    placeholder={t('enterAddress')}
                    defaultValue="3304 Randall Drive"
                  />
                  <span>
                    <Location />
                  </span>
                  <ErrorMessage message={errors.address?.message} />
                </div>
              </div>
            </div>

            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <textarea
                    {...register("bio", { required: t('bioRequired') })}
                    placeholder={t('enterYourBio')}
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                  >
                    {t('bioPlaceholder')}
                  </textarea>
                  <ErrorMessage message={errors.bio?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile__btn">
                <button type="submit" className="tp-btn">
                  {t('updateProfile')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
