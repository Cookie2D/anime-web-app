import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import AppLayout from '@/components/share/layout/AppLayout';

interface Props {
  links: HeaderLinks;
}

const ListPage: FC<Props> = ({ links }) => {
  const t = useTranslations();
  const router = useRouter();

  if (!router.query.status) {
    return null;
  }

  return (
    <AppLayout links={links} title={t('pages.list.title')}>
      <h1>{t(`pages.list.types.status.${router.query.status}`)}</h1>
      <p>{t(`pages.list.types.status.${router.query.status}_description`)}</p>
    </AppLayout>
  );
};

export default ListPage;
