import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import AppLayout from '@/components/share/layout/AppLayout';
import { AnimeList } from './components/AnimeList';

interface Props {
  links: HeaderLinks;
}

const ListPage: FC<Props> = ({ links }) => {
  const t = useTranslations();

  return (
    <AppLayout links={links} title={t('pages.list.title')}>
      <AnimeList filters={links} />
    </AppLayout>
  );
};

export default ListPage;
