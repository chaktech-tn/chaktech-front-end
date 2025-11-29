'use client';

import { useTranslations } from 'next-intl';
import React from "react";

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
