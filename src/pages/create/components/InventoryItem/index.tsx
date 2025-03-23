import { FC } from 'react';
import { Element } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';
import { CoinIcon } from '@shared/Icons/components/Coin';
import { formatNumber } from '@shared/utils/format-sum-to-k';

import styles from './styles.module.css';
import clsx from 'clsx';

interface InventoryItemProps {
  element?: Element;
  onDoubleClick?: () => void;
}

export const InventoryItem: FC<InventoryItemProps> = ({ element, onDoubleClick }) => {
  const cover = `${import.meta.env.VITE_APP_HOST}/elements/${element?.name_eng}.webp`;

  if (!element) {
    return (
      <div className={clsx(styles.item, styles['_empty'])}>
        <p>?</p>
      </div>
    );
  }
  return (
    <div className={styles.item} onDoubleClick={onDoubleClick}>
      <img src={cover} alt={`${element.name_eng}-element-cover`} />
      <Flex className={styles.content} direction="column" justify="space-between" fullWidth>
        <p className={styles.count}>{element.count}</p>
        <Flex direction="column" fullWidth>
          <p>{element.name_eng}</p>
          <Flex fullWidth>
            <CoinIcon size={20} />
            <p>{formatNumber(element.income_hour)}</p>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default InventoryItem;
