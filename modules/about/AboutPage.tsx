import React from 'react';
import { useTranslations } from 'next-intl';
import AppLayout from '@/components/share/layout/AppLayout';

export default function AboutPage() {
  const t = useTranslations();

  return (
    <AppLayout title={t('pages.about.title')}>
      <h1>{t('pages.about.title')}</h1>
    </AppLayout>
  );
}
