'use client';
import Link from "next/link";
import React from "react";
import { useTranslations } from 'next-intl';

const CopyrightText = () => {
  const t = useTranslations('common');
  const year = new Date().getFullYear();
  
  return (
    <p>
      {t('copyright', { year })}
    </p>
  );
};

export default CopyrightText;
