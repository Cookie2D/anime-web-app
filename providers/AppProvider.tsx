import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import { QUERY_STALE_TIME } from '@/utils/const';

interface Props {
  messages: Record<string, string>;
}
export default function AppProvider({ children, messages = {} }: React.PropsWithChildren<Props>) {
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: QUERY_STALE_TIME,
          },
        },
      })
  );

  return (
    <NextIntlClientProvider locale={router.locale} timeZone="Europe/Vienna" messages={messages}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
