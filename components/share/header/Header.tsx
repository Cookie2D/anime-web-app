import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Flex, Group, HoverCard, Stack, Text } from '@mantine/core';
import LocaleLink from '@/components/common/Link/LocaleLink';
import AppLogo from './components/AppLogo';
import { ColorSchemeToggle } from './components/ColorSchemeToggle';
import { LanguagePicker } from './components/LanguagePicker';
import classes from './Header.module.css';

const Header: FC = () => {
  const t = useTranslations();

  return (
    <Flex justify="space-between" align="center" className={classes.container}>
      <Group>
        <LocaleLink href="/">
          <AppLogo />
        </LocaleLink>
      </Group>

      <Group>
        <Flex component="nav" gap="md">
          <LocaleLink href="/">{t('pages.home.title')}</LocaleLink>
          <LocaleLink href="/about">{t('pages.about.title')}</LocaleLink>

          <HoverCard width={200} shadow="md">
            <HoverCard.Target>
              <Text>{t('nav.status.title')}</Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Stack>
                <LocaleLink href="/list?status=ongoing">{t('nav.status.items.ongoing')}</LocaleLink>
                <LocaleLink href="/list?status=finished">
                  {t('nav.status.items.finished')}
                </LocaleLink>
                <LocaleLink href="/list?status=announced">
                  {t('nav.status.items.announced')}
                </LocaleLink>
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard>
        </Flex>
      </Group>

      <Group justify="center" gap="xs">
        <LanguagePicker />
        <ColorSchemeToggle />
      </Group>
    </Flex>
  );
};

export default Header;
