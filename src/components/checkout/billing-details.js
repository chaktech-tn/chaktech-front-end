'use client';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "@components/error-message/error";
import useRealtimeSave from "@hooks/use-realtime-save";
import { trackCheckoutStep, trackFormError } from "@utils/posthog";
import { getOrCreateSessionToken } from "@utils/sessionToken";

// internal
import { setSessionToken } from "src/redux/features/abandonedCheckout/abandonedCheckoutSlice";

const BillingDetails = ({ register, errors, recoveryData, setValue, watch }) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const t = useTranslations('checkout');
  const [createAccount, setCreateAccount] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const { saveCheckoutData } = useRealtimeSave();
  const [trackedErrors, setTrackedErrors] = useState({});
  
  // Initialize session token
  useEffect(() => {
    const sessionToken = getOrCreateSessionToken();
    if (sessionToken) {
      dispatch(setSessionToken(sessionToken));
    }
  }, [dispatch]);
  
  // Pre-fill form from recovery data
  useEffect(() => {
    if (recoveryData && setValue) {
      if (recoveryData.customerName) {
        const nameParts = recoveryData.customerName.split(' ');
        setValue('firstName', nameParts[0] || '');
        setValue('lastName', nameParts.slice(1).join(' ') || '');
      }
      if (recoveryData.customerAddress) setValue('address', recoveryData.customerAddress);
      if (recoveryData.customerPhone) setValue('contact', recoveryData.customerPhone);
      if (recoveryData.customerEmail) setValue('email', recoveryData.customerEmail);
    }
  }, [recoveryData, setValue]);
  
  // Real-time save on field changes and track checkout steps
  const watchedFields = watch ? watch() : {};
  const [trackedSteps, setTrackedSteps] = useState({});

  useEffect(() => {
    if (Object.keys(watchedFields).length > 0) {
      const formData = {
        firstName: watchedFields.firstName || '',
        lastName: watchedFields.lastName || '',
        name: `${watchedFields.firstName || ''} ${watchedFields.lastName || ''}`.trim(),
        address: watchedFields.address || '',
        contact: watchedFields.contact || '',
        email: watchedFields.email || '',
      };
      saveCheckoutData(formData);

      // Track contact info filled step (only once)
      if ((watchedFields.firstName || watchedFields.lastName) && watchedFields.contact && !trackedSteps.contactInfo) {
        trackCheckoutStep('contact_info_filled', 'standard_page', {
          has_email: !!watchedFields.email,
          has_address: !!watchedFields.address,
          has_name: !!(watchedFields.firstName || watchedFields.lastName),
        });
        setTrackedSteps(prev => ({ ...prev, contactInfo: true }));
      }
    }
  }, [watchedFields, saveCheckoutData, trackedSteps]);

  // Track form errors when they appear
  useEffect(() => {
    Object.keys(errors || {}).forEach((fieldName) => {
      const error = errors[fieldName];
      if (error?.message && !trackedErrors[fieldName]) {
        trackFormError(error.message, fieldName, 'standard_page', {
          field_type: 'form_field',
        });
        setTrackedErrors(prev => ({ ...prev, [fieldName]: true }));
      }
    });
  }, [errors, trackedErrors]);

  // Track consent error
  useEffect(() => {
    if (!consentGiven && trackedSteps.contactInfo && !trackedErrors.consent) {
      trackFormError(
        t('consentRequired') || "You must accept the terms and conditions",
        'consent',
        'standard_page'
      );
      setTrackedErrors(prev => ({ ...prev, consent: true }));
    }
  }, [consentGiven, trackedSteps.contactInfo, trackedErrors, t]);
  
  // checkout form list
  function CheckoutFormList({
    col,
    label,
    type = "text",
    placeholder,
    isRequired = true,
    name,
    register,
    error,
    defaultValue,
  }) {
    // Track form errors on blur
    const handleBlur = (e) => {
      const fieldValue = e.target.value;
      if (error && fieldValue && isRequired) {
        // Track validation error
        trackFormError(error, name, 'standard_page', {
          field_type: type,
          field_label: label,
        });
      }
    };

    return (
      <div className={`col-md-${col}`}>
        <div className="checkout-form-list">
          {label && (
            <label>
              {label} {isRequired && <span className="required">*</span>}
            </label>
          )}
          <input
            {...register(`${name}`, {
              required: `${label} ${t('isRequired')}`,
            })}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue ? defaultValue : ""}
            onBlur={handleBlur}
          />
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <CheckoutFormList
          name="firstName"
          col="12"
          label={t('firstName')}
          placeholder={t('firstName')}
          register={register}
          error={errors?.firstName?.message}
          defaultValue={user?.name}
        />
        <CheckoutFormList
          name="lastName"
          col="12"
          label={t('lastName')}
          placeholder={t('lastName')}
          register={register}
          error={errors?.lastName?.message}
        />
        <CheckoutFormList
          name="address"
          col="12"
          label={t('address')}
          placeholder={t('streetAddress')}
          register={register}
          error={errors?.address?.message}
        />
        <CheckoutFormList
          col="12"
          label={t('townCity')}
          placeholder={t('townCity')}
          name="city"
          register={register}
          error={errors?.city?.message}
        />
        <CheckoutFormList
          col="6"
          label={t('stateCounty')}
          placeholder={t('stateCounty')}
          name="country"
          register={register}
          error={errors?.country?.message}
        />
        <CheckoutFormList
          col="6"
          label={t('postcodeZip')}
          placeholder={t('postcodeZip')}
          name="zipCode"
          register={register}
          error={errors?.zipCode?.message}
        />
        <CheckoutFormList
          col="6"
          type="email"
          label={t('emailAddress')}
          placeholder={t('yourEmail')}
          name="email"
          register={register}
          error={errors?.email?.message}
          defaultValue={user?.email}
        />
        <CheckoutFormList
          name="contact"
          col="6"
          label={t('phone')}
          placeholder={t('phoneNumber')}
          register={register}
          error={errors?.contact?.message}
        />

        {/* Account Creation Checkbox */}
        <div className="col-md-12">
          <div className="checkout-form-list">
            <label className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={createAccount}
                onChange={(e) => setCreateAccount(e.target.checked)}
                className="me-2"
              />
              <span>{t('createAccountLabel')}</span>
            </label>
          </div>
        </div>

        {/* Password Field (conditional) */}
        {createAccount && (
          <div className="col-md-12">
            <div className="checkout-form-list">
              <label>
                {t('password')} {!watch || !watch('password') ? <span className="text-muted">({t('passwordWillBeGenerated')})</span> : ''}
              </label>
              <input
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: t('passwordMinLength'),
                  },
                })}
                type="password"
                placeholder={t('passwordPlaceholder')}
              />
              {errors.password && <ErrorMessage message={errors.password.message} />}
            </div>
          </div>
        )}

        {/* Consent Checkbox */}
        <div className="col-md-12">
          <div className="checkout-form-list">
            <label className="d-flex align-items-start">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="me-2 mt-1"
                required
              />
              <span>
                {t('consentText')} <span className="required">*</span>
              </span>
            </label>
            {!consentGiven && (
              <ErrorMessage message={t('consentRequired') || "You must accept the terms and conditions"} />
            )}
          </div>
        </div>

        <div className="order-notes">
          <div className="checkout-form-list">
            <label>{t('orderNotes')}</label>
            <textarea
              id="checkout-mess"
              cols="30"
              rows="10"
              placeholder={t('orderNotesPlaceholder')}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingDetails;
