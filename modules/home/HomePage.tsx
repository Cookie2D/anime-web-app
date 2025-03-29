import { FC } from 'react';
import { useTranslations } from 'next-intl';
import AppLayout from '@/components/share/layout/AppLayout';

const HomePage: FC = () => {
  const t = useTranslations();

  return <AppLayout title={t('pages.about.title')}>{t('welcome')}</AppLayout>;
};

export default HomePage;
