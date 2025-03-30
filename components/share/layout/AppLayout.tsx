import { FC, PropsWithChildren } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AppShell, Container } from '@mantine/core';
import { HEADER_MENU_HEIGHT } from '@/utils/const';
import Header from '../header/Header';
import { HeaderLinks } from '../header/types/header.types';
import AppHead from './AppHead';

interface Props extends PropsWithChildren {
  title?: string | null;
  description?: string | null;
  image?: string | null;

  links: HeaderLinks;
}

const AppLayout: FC<Props> = ({ title, description, image, children, links }) => {
  return (
    <AppShell
      header={{
        height: HEADER_MENU_HEIGHT,
      }}
      padding={0}
    >
      <AppHead title={title} description={description} image={image} />

      <AppShell.Header withBorder={false}>
        <Header links={links} />
      </AppShell.Header>

      <AppShell.Main className="flex flex-col">
        <Container>{children}</Container>
      </AppShell.Main>

      {/*<AppShell.Footer withBorder={false}>
        <Footer />
      </AppShell.Footer>*/}

      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      )}
    </AppShell>
  );
};

export default AppLayout;
