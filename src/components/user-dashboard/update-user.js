'use client';
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "@utils/toast";
import { useUpdateProfileMutation } from "src/redux/features/auth/authApi";

const SvgSave = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
  </svg>
);

const schema = Yup.object().shape({
  name: Yup.string().required("Le nom est requis"),
  email: Yup.string().required("L'email est requis").email("Email invalide"),
  phone: Yup.string().required("Le téléphone est requis"),
  address: Yup.string().required("L'adresse est requise"),
});

const fieldStyles = `
  .st-profile-form { padding: 1.5rem; }
  .st-profile-form-title {
    font-size: 1.125rem; font-weight: 700; color: #1e293b;
    margin: 0 0 0.25rem; display: flex; align-items: center; gap: 0.5rem;
  }
  .st-profile-form-subtitle { font-size: 0.875rem; color: #94a3b8; margin: 0 0 1.5rem; }
  .st-pf-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 640px) { .st-pf-grid { grid-template-columns: 1fr 1fr; } }
  .st-pf-full { grid-column: 1 / -1; }
  .st-pf-label { display: block; font-size: 0.875rem; font-weight: 600; color: #475569; margin-bottom: 0.375rem; }
  .st-pf-input {
    width: 100%; height: 48px; padding: 0 1rem;
    border: 1.5px solid #e2e8f0; border-radius: 0.75rem;
    font-size: 0.9375rem; color: #1e293b; background: white;
    transition: border-color .2s, box-shadow .2s; outline: none; box-sizing: border-box;
  }
  .st-pf-input:focus { border-color: #ee6d0a; box-shadow: 0 0 0 3px rgba(238,109,10,.1); }
  .st-pf-input.error { border-color: #ef4444; }
  .st-pf-error { font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; }
  .st-pf-divider { height: 1px; background: #f1f5f9; margin: 1.5rem 0; grid-column: 1 / -1; }
  .st-pf-section-label {
    grid-column: 1 / -1; font-size: 0.8125rem; font-weight: 700;
    color: #94a3b8; text-transform: uppercase; letter-spacing: .075em;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .st-pf-section-label::after {
    content: ''; flex: 1; height: 1px; background: #f1f5f9;
  }
  .st-pf-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem; grid-column: 1 / -1; }
  .st-pf-btn-save {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #ee6d0a; color: white; border: none; border-radius: 0.75rem;
    padding: 0.6875rem 1.5rem; font-size: 0.9375rem; font-weight: 600;
    cursor: pointer; transition: all .2s;
  }
  .st-pf-btn-save:hover { background: #d15b00; box-shadow: 0 4px 12px rgba(238,109,10,.25); }
  .st-pf-btn-cancel {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; border-radius: 0.75rem;
    padding: 0.6875rem 1.25rem; font-size: 0.9375rem; font-weight: 500;
    cursor: pointer; transition: background .15s;
  }
  .st-pf-btn-cancel:hover { background: #e2e8f0; }
`;

const SvgUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#94a3b8' }}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const UpdateUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateProfile] = useUpdateProfileMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    updateProfile({ id: user?._id, ...data }).then((result) => {
      if (result?.error) notifyError(result?.error?.data?.message);
      else notifySuccess(result?.data?.message || "Profil mis à jour !");
    });
    reset();
  };

  return (
    <>
      <style>{fieldStyles}</style>
      <div className="st-profile-form">
        <h3 className="st-profile-form-title">
          Mon Profil
        </h3>
        <p className="st-profile-form-subtitle">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="st-pf-grid">
            <span className="st-pf-section-label">Informations personnelles</span>

            {/* Name */}
            <div>
              <label className="st-pf-label">Prénom &amp; Nom</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Votre nom complet"
                defaultValue={user?.name}
                className={`st-pf-input${errors.name ? ' error' : ''}`}
              />
              {errors.name && <p className="st-pf-error">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="st-pf-label">Numéro de téléphone</label>
              <input
                {...register("phone")}
                type="text"
                placeholder="+216 XX XXX XXX"
                defaultValue={user?.phone || ""}
                className={`st-pf-input${errors.phone ? ' error' : ''}`}
              />
              {errors.phone && <p className="st-pf-error">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div className="st-pf-full">
              <label className="st-pf-label">Adresse email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="votre@email.com"
                defaultValue={user?.email}
                className={`st-pf-input${errors.email ? ' error' : ''}`}
              />
              {errors.email && <p className="st-pf-error">{errors.email.message}</p>}
            </div>

            {/* Address */}
            <div className="st-pf-full">
              <label className="st-pf-label">Adresse de livraison</label>
              <input
                {...register("address")}
                type="text"
                placeholder="Votre adresse complète"
                defaultValue={user?.address || ""}
                className={`st-pf-input${errors.address ? ' error' : ''}`}
              />
              {errors.address && <p className="st-pf-error">{errors.address.message}</p>}
            </div>

            {/* Actions */}
            <div className="st-pf-actions">
              <button type="button" className="st-pf-btn-cancel" onClick={() => reset()}>
                Annuler
              </button>
              <button type="submit" className="st-pf-btn-save">
                <SvgSave />
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
