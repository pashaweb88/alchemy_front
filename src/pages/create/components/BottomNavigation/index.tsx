import { FC } from 'react';
import { Flex } from '@shared/components/Flex';
import styles from './styles.module.css';
import { QuestionIcon } from '@shared/Icons/components/Question';
import { ChestIcon } from '@shared/Icons/components/Chest';
import { BagIcon } from '@shared/Icons/components/Bag';
import { HoleIcon } from '@shared/Icons/components/Hole';
import { NavigationType } from '../../types';

interface BottomNavigationProps {
  onMenuClick?: (t: NavigationType) => void;
}
export const BottomNavigation: FC<BottomNavigationProps> = ({ onMenuClick }) => {
  const items: { text: string; icon: any; itemType: NavigationType }[] = [
    {
      text: 'Инструкция',
      icon: QuestionIcon,
      itemType: 'Tutor'
    },
    {
      text: 'Инвентарь',
      icon: ChestIcon,
      itemType: 'Inventory'
    },
    {
      text: 'Продать',
      icon: BagIcon,
      itemType: 'Sell'
    },
    {
      text: 'Очистить',
      icon: HoleIcon,
      itemType: 'Clear'
    }
  ];
  return (
    <Flex className={styles.navigation} justify="center" gap="xs" noWrap fullWidth>
      {items.map((el, index) => {
        const Icon = el.icon;

        return (
          <Flex
            className={styles.item}
            direction="column"
            align="center"
            key={index}
            onClick={() => onMenuClick?.(el.itemType)}
            noWrap
            fullWidth
          >
            <Icon color="#EBD09B" />
            <p style={{ color: '#EBD09B' }}>{el.text}</p>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default BottomNavigation;
