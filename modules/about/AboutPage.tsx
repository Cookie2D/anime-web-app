import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import AppLayout from '@/components/share/layout/AppLayout';

interface Props {
  links: HeaderLinks;
}

const AboutPage: FC<Props> = ({ links }) => {
  const t = useTranslations();

  return (
    <AppLayout links={links} title={t('pages.about.title')}>
      <h1>{t('pages.about.title')}</h1>
    </AppLayout>
  );
};

export default AboutPage;
