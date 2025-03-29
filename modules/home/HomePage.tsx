import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import AppLayout from '@/components/share/layout/AppLayout';

interface Props {
  links: HeaderLinks;
}
const HomePage: FC<Props> = ({ links }) => {
  const t = useTranslations();

  return (
    <AppLayout title={t('pages.about.title')} links={links}>
      {t('welcome')}
    </AppLayout>
  );
};

export default HomePage;
