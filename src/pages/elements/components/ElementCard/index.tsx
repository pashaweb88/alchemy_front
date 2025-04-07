import { FC } from 'react';
import iconNew from '@assets/icons/icon-status-isnew.svg';
import { Flex } from '@shared/components/Flex';
import styles from './styles.module.css';
import iconArrow from '@assets/icons/arrow.svg';
import Typography from '@shared/components/Typography';
import capitalize from '@shared/utils/capitalize';

interface ElementCardProps {
  src?: string;
  isNew?: boolean;
  name?: string;
}

export const ElementCard: FC<ElementCardProps> = ({ src = '', isNew = false, name = '' }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={src} alt="card" />
      {isNew && (
        <div className={styles.badge}>
          <img src={iconNew} alt="icon-new" />
        </div>
      )}
      <Flex className={styles.info} justify="space-between" fullWidth>
        <Typography size={12}>{capitalize(name)}</Typography>
        <img className={styles.icon} src={iconArrow} alt="arrow" />
      </Flex>
    </div>
  );
};

export default ElementCard;
