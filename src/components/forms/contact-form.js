'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import ErrorMessage from "@components/error-message/error";
// internal

const ContactForm = () => {
  const t = useTranslations('contact');
  
  const schema = Yup.object().shape({
    name: Yup.string().required().label(t('name')),
    email: Yup.string().required().email().label(t('email')),
    phone: Yup.string().required().min(11).label(t('phone')),
    company: Yup.string().required().label(t('company')),
    message: Yup.string().required().min(20).label(t('message')),
  });
  
    // react hook form
  const { register, handleSubmit, formState:{ errors },reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (formData) => {

    reset();
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="contact__input-2">
            <input
              name="name"
              {...register("name",{required:t('nameRequired')})}
              type="text"
              placeholder={t('enterYourName')}
              id="name"
            />
            <ErrorMessage message={errors.name?.message} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="contact__input-2">
            <input
              name="email"
              {...register("email",{required:t('emailRequired')})}
              type="email"
              placeholder={t('enterYourEmail')}
              id="email"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="contact__input-2">
            <input
              name="phone"
              {...register("phone",{required:t('phoneRequired')})}
              type="text"
              placeholder={t('mobileNo')}
              id="phone"
            />
            <ErrorMessage message={errors.phone?.message} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="contact__input-2">
            <input
              name="company"
              {...register("company",{required:t('companyRequired')})}
              type="text"
              placeholder={t('company')}
              id="company"
            />
            <ErrorMessage message={errors.company?.message} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="contact__input-2">
            <textarea
              name="message"
              {...register("message",{required:t('messageRequired')})}
              id="message"
              placeholder={t('yourMessage')}
            ></textarea>
            <ErrorMessage message={errors.message?.message} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="contact__agree d-flex align-items-start mb-25">
            <input className="e-check-input" type="checkbox" id="e-agree" />
            <label className="e-check-label" htmlFor="e-agree">
              {t('agreeTerms')}
            </label>
          </div>
        </div>
        <div className="col-md-5">
          <div className="contact__btn-2">
            <button type="submit" className="tp-btn">
              {t('sendMessage')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
