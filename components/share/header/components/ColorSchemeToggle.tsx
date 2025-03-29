import { useEffect, useState } from 'react';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { Button, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  if (!isClient) {
    return (
      <Button c="gray.1" onClick={toggleColorScheme} px={5} variant="transparent">
        <IconMoonFilled size={24} />
      </Button>
    );
  }

  return (
    <Button
      c={colorScheme === 'dark' ? 'gray.1' : 'gray.9'}
      onClick={toggleColorScheme}
      px={5}
      variant="transparent"
    >
      {colorScheme === 'dark' ? <IconMoonFilled size={24} /> : <IconSunFilled size={24} />}
    </Button>
  );
}
