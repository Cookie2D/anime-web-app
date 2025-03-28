import { FC, PropsWithChildren } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AppShell } from '@mantine/core';
import { HEADER_MENU_HEIGHT } from '@/utils/const';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import AppHead from './AppHead';

interface Props extends PropsWithChildren {
  title?: string | null;
  description?: string | null;
  image?: string | null;
}

const AppLayout: FC<Props> = ({ title, description, image, children }) => {
  return (
    <AppShell
      header={{
        height: HEADER_MENU_HEIGHT,
      }}
      padding={0}
    >
      <AppHead title={title} description={description} image={image} />

      <AppShell.Header withBorder={false}>
        <Header />
      </AppShell.Header>

      <AppShell.Main className="flex flex-col">
        {children}

        <Footer />
      </AppShell.Main>

      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      )}
    </AppShell>
  );
};

export default AppLayout;
