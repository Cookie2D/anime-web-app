import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl'; // Import for translations
import { Image, Menu, UnstyledButton } from '@mantine/core';
import images from './images/images';

const LANGUAGES = [
  { label: 'locales.English', code: 'en', image: images.english },
  { label: 'locales.Ukrainian', code: 'uk', image: images.ukraine },
];
export function LanguagePicker() {
  const router = useRouter();
  const t = useTranslations(); // Get translation function
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    LANGUAGES.find((lang) => lang.code === router.locale) || LANGUAGES[0]
  );

  useEffect(() => {
    const storedLang = localStorage.getItem('app-language');
    if (storedLang) {
      setSelected(LANGUAGES.find((lang) => lang.code === storedLang) || LANGUAGES[0]);
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: (typeof LANGUAGES)[0]) => {
    localStorage.setItem('app-language', lang.code); // Store selected language in localStorage

    // Change the locale in Next.js router to trigger a page reload with the new language
    router.push(router.asPath, router.asPath, { locale: lang.code });

    setSelected(lang);
  };

  return (
    <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" withinPortal>
      <Menu.Target>
        <UnstyledButton data-expanded={opened || undefined}>
          <Image src={selected.image} alt={selected.label} width={22} height={22} />
        </UnstyledButton>
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
