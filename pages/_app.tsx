import AppProvider from '@/providers/AppProvider';

import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { HydrationBoundary } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider messages={pageProps.messages}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </AppProvider>
  );
}
