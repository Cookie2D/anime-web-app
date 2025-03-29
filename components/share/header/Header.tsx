import { FC } from 'react';
import { Button, Flex, Group, HoverCard, Text } from '@mantine/core';
import { LanguagePicker } from './components/LanguagePicker';
import classes from './Header.module.css';

const Header: FC = () => {
  return (
    <Flex justify="space-between" align="center" className={classes.container}>
      <Group>logo</Group>

      <Group>
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Button>Hover to reveal the card</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">
              Hover card is revealed when user hovers over target element, it will be hidden once
              mouse is not over both target and dropdown elements
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Group>
        {/*lang/theme*/}
        <LanguagePicker />
      </Group>
    </Flex>
  );
};
export default Header;
