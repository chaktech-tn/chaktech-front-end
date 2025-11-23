'use client';
import React from "react";
import { useTranslations } from 'next-intl';

const ErrorMessage = ({ message, onRetry, isNetworkError = false }) => {
  const t = useTranslations('common');
  
  return (
    <div className="error-message-wrapper" style={{
      padding: '60px 20px',
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="error-icon mb-30" style={{
        fontSize: '64px',
        marginBottom: '20px',
        opacity: 0.6
      }}>
        {isNetworkError ? '🔌' : '⚠️'}
      </div>
      <h3 className="section__title-13 mb-15" style={{
        color: '#e74c3c',
        fontSize: '24px',
        marginBottom: '12px',
        fontWeight: '600'
      }}>
        {isNetworkError ? (t('networkError') || 'Connection Error') : (t('error') || 'Error')}
      </h3>
      <p className="mb-30" style={{
        color: '#666',
        fontSize: '16px',
        marginBottom: '24px',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        {message || (isNetworkError 
          ? (t('backendNotResponding') || 'Unable to connect to the server. Please check your connection and try again.')
          : (t('somethingWentWrong') || 'Something went wrong. Please try again later.'))}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="tp-btn"
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {t('retry') || 'Retry'}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
