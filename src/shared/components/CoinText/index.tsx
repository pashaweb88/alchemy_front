import { FC, ReactNode } from 'react';
import { Flex } from '@shared/components/Flex';
import { CoinIcon } from '@shared/Icons/components/Coin';
import { spacing } from '@shared/mixins/MixSpacing';

interface CoinTextProps {
  children?: ReactNode;
  coinSize?: number;
  offsetY?: number;
}

export const CoinText: FC<CoinTextProps> = ({ children, coinSize = 20, offsetY = 1 }) => {
  return (
    <Flex align="center" fullWidth>
      <div className={spacing({ mr: '05x' })} style={{ transform: `translateY(${-offsetY}%)` }}>
        <CoinIcon size={coinSize} />
      </div>

      {children}
    </Flex>
  );
};

export default CoinText;
