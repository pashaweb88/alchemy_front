import { FC } from 'react';
import iconNew from '@assets/icons/icon-status-isnew.svg';
import { Flex } from '@shared/components/Flex';
import styles from './styles.module.css';
import iconArrow from '@assets/icons/arrow.svg';

interface ElementCardProps {
  src?: string;
  isNew?: boolean;
  name?: string;
  titleSize?: string;
}

export const ElementCard: FC<ElementCardProps> = ({
  src = '',
  isNew = false,
  name = '',
  titleSize = '12px'
}) => {
  return (
    <div className={styles.card}>
      <img src={src} alt="card" />
      {isNew && (
        <div className={styles.badge}>
          <img src={iconNew} alt="icon-new" />
        </div>
      )}
      <Flex className={styles.info} justify="space-between" fullWidth>
        <p style={{ fontSize: titleSize }}>{name}</p>
        <div>
          <img src={iconArrow} alt="arrow" />
        </div>
      </Flex>
    </div>
  );
};

export default ElementCard;
