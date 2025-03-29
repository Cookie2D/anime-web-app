import React from 'react';
import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';

interface Props {
  messages: Record<string, string>;
}
export default function AppProvider({ children, messages = {} }: React.PropsWithChildren<Props>) {
  const router = useRouter();

  return (
    <NextIntlClientProvider locale={router.locale} timeZone="Europe/Vienna" messages={messages}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </NextIntlClientProvider>
  );
}
