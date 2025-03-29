import { useEffect, useState } from 'react';
import { i18n } from '@lingui/core';
import { Image, Menu, UnstyledButton } from '@mantine/core';
import images from './images/images';

const LANGUAGES = [
  { label: 'English', code: 'en', image: images.english },
  { label: 'Ukrainian', code: 'uk', image: images.polish },
];

export function LanguagePicker() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    LANGUAGES.find((lang) => lang.code === i18n.locale) || LANGUAGES[0]
  );

  useEffect(() => {
    const storedLang = localStorage.getItem('app-language');
    if (storedLang) {
      i18n.activate(storedLang);
      setSelected(LANGUAGES.find((lang) => lang.code === storedLang) || LANGUAGES[0]);
    }
  }, []);

  const handleLanguageChange = (lang: (typeof LANGUAGES)[0]) => {
    i18n.activate(lang.code);
    localStorage.setItem('app-language', lang.code);
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
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
