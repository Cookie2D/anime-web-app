import React from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import AppLayout from '@/components/share/layout/AppLayout';

export default function AboutPage() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <AppLayout title={t('pages.list.title')}>
      <h1>{t(`nav.status.items.${router.query.status}`)}</h1>
    </AppLayout>
  );
}
