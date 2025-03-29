import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Flex, Group, HoverCard, ScrollAreaAutosize, Stack, Text } from '@mantine/core';
import LocaleLink from '@/components/common/Link/LocaleLink';
import AppLogo from './components/AppLogo';
import { ColorSchemeToggle } from './components/ColorSchemeToggle';
import { LanguagePicker } from './components/LanguagePicker';
import { HeaderLinks } from './types/header.types';
import classes from './Header.module.css';

interface Props {
  links?: HeaderLinks;
}

const Header: FC<Props> = ({ links }) => {
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
                {links?.status?.map((item) => (
                  <LocaleLink href={`/list?status=${item.type}`}>
                    {t(`pages.list.types.${item.name_key}`)}
                  </LocaleLink>
                ))}
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard>

          <HoverCard width={200} shadow="md">
            <HoverCard.Target>
              <Text>{t('nav.categories.title')}</Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <ScrollAreaAutosize mah={300}>
                <Stack>
                  {links?.categories?.map((item) => (
                    <LocaleLink href={`/list?category=${item.slug}`}>
                      {t(`pages.list.categories.${item.slug}`)}
                    </LocaleLink>
                  ))}
                </Stack>
              </ScrollAreaAutosize>
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
