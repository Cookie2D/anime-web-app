import { FC } from 'react';
import { Trans, useLingui } from '@lingui/react/macro';
import AppLayout from '@/components/share/layout/AppLayout';
import { getPageTitle } from '@/utils/common/getPageTitle';

interface Props {}

const HomePage: FC<Props> = () => {
  const { t } = useLingui();

  return (
    <AppLayout title={getPageTitle(t`Home`)}>
      <Trans>Home page</Trans>
    </AppLayout>
  );
};

export default HomePage;
