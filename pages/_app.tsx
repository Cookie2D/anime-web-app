import '@mantine/core/styles.css';

import { useMemo } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { MantineProvider } from '@mantine/core';
import { messages } from '@/locales/en/messages';
import { DEFAULT_LANGUAGE } from '@/utils/const';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  const i18nConfig = useMemo(() => {
    i18n.load(DEFAULT_LANGUAGE, messages);
    i18n.activate(DEFAULT_LANGUAGE);
    return i18n;
  }, []);

  return (
    <I18nProvider i18n={i18nConfig}>
      <MantineProvider theme={theme}>
        <Head>
          <title>Mantine Template</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </I18nProvider>
  );
}
