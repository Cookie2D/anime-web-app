import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Flex, Group } from '@mantine/core';
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
        <AppLogo />
      </Group>

      <Group>
        <Flex component="nav" gap="md">
          <LocaleLink href="/">{t('pages.home.title')}</LocaleLink>
          <LocaleLink href="/about">{t('pages.about.title')}</LocaleLink>
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
