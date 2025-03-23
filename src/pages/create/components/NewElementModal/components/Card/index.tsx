import { FC } from 'react';
import { Flex } from '@shared/components/Flex';
import { Element } from '@shared/models/elements';
import styles from './styles.module.css';
import iconNew from '@assets/icons/icon-status-isnew.svg';

interface CardProps {
  element?: Element;
  isNew?: boolean;
  titleSize?: string;
  src: string;
}

export const Card: FC<CardProps> = ({ element, src, isNew, titleSize = '12px' }) => {
  return (
    <div className={styles.card}>
      <img src={src} alt="card" />
      {isNew && (
        <div className={styles.badge}>
          <img src={iconNew} alt="icon-new" />
        </div>
      )}
      <Flex className={styles.info} justify="space-between" fullWidth>
        <p style={{ fontSize: titleSize }}>{element?.name_eng}</p>
      </Flex>
    </div>
  );
};

export default Card;
