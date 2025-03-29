import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Button, Image, Menu } from '@mantine/core';
import images from './images/images';

const LANGUAGES = [
  { label: 'locales.English', code: 'en', image: images.english },
  { label: 'locales.Ukrainian', code: 'uk', image: images.ukraine },
];
export function LanguagePicker() {
  const router = useRouter();
  const t = useTranslations();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    LANGUAGES.find((lang) => lang.code === router.locale) || LANGUAGES[0]
  );

  useLayoutEffect(() => {
    const storedLang = localStorage.getItem('app-language');
    if (storedLang) {
      setSelected(LANGUAGES.find((lang) => lang.code === storedLang) || LANGUAGES[0]);
      if (storedLang !== router.locale) {
        router.push(router.asPath, router.asPath, { locale: storedLang });
      }
    }
  }, [router.locale]);

  const handleLanguageChange = (lang: (typeof LANGUAGES)[0]) => {
    localStorage.setItem('app-language', lang.code);

    router.push(router.asPath, router.asPath, { locale: lang.code });

    setSelected(lang);
  };

  return (
    <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" withinPortal>
      <Menu.Target>
        <Button px={5} variant="transparent" data-expanded={opened || undefined}>
          <Image src={selected.image} alt={selected.label} width={22} height={22} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {LANGUAGES.map((lang) => (
          <Menu.Item
            key={lang.code}
            leftSection={<Image src={lang.image} alt={lang.label} width={18} height={18} />}
            onClick={() => handleLanguageChange(lang)}
          >
            {t(lang.label)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
