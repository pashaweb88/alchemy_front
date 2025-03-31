import { FC } from 'react';
import { Element } from '@shared/models/elements';
import { Flex } from '@shared/components/Flex';
import { formatNumber } from '@shared/utils/format-sum-to-k';

import styles from './styles.module.css';
import clsx from 'clsx';
import CoinText from '@shared/components/CoinText';
import Typography from '@shared/components/Typography';
import { spacing } from '@shared/mixins/MixSpacing';

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
  const doubleClickHandle = (e: any) => {
    e.stopPropagation();
    onDoubleClick?.();
  };
  return (
    <div className={styles.item} onDoubleClick={doubleClickHandle}>
      <img src={cover} alt={`${element.name_eng}-element-cover`} />
      <Flex
        className={clsx(styles.content, spacing({ py: '05x', px: '1x' }))}
        direction="column"
        justify="space-between"
        fullWidth
      >
        <Typography size={12} className={styles.count} align="right">
          {element.count}
        </Typography>
        <Flex direction="column" fullWidth>
          <Typography size={12} weight={600}>
            {String(element.name_eng).charAt(0).toUpperCase() + String(element.name_eng).slice(1)}
          </Typography>
          <CoinText>
            <Typography size={10} weight={600}>
              {formatNumber(element.income_hour)}
            </Typography>
          </CoinText>
        </Flex>
      </Flex>
    </div>
  );
};

export default InventoryItem;
