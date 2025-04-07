import { FC } from 'react';
import styles from './styles.module.css';

import { FrameDefaultIcon, FrameActiveIcon } from './icons';
import { Flex } from '@shared/components/Flex';
import Typography from '@shared/components/Typography';
import CoinText from '@shared/components/CoinText';
import formatNumber from '@shared/utils/format-sum-to-k';

interface DailyItemProps {
  active?: boolean;
  reward?: number;
  day?: number;
}

export const DailyItem: FC<DailyItemProps> = ({ active = true, reward = 0, day = 0 }) => {
  return (
    <div className={styles.item}>
      <FrameDefaultIcon styles={{ width: '100%' }} />
      <FrameActiveIcon
        styles={{ width: '100%', opacity: active ? 1 : 0, position: 'absolute', top: 0, left: 0 }}
      />
      <Flex align="center" justify="center" className={styles.content} direction="column" fullWidth>
        <Typography styles={{ color: active ? '#0E0923' : 'white' }} size={12}>
          День {day}
        </Typography>
        <CoinText>
          <Typography styles={{ color: active ? '#0E0923' : '#968E8C' }} size={12}>
            {formatNumber(reward.toString())}
          </Typography>
        </CoinText>
      </Flex>
    </div>
  );
};

export default DailyItem;
