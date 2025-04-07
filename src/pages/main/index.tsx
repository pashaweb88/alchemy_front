import { Layout } from '@shared/components/Layout';
import { Flex } from '@shared/components/Flex';

import { Header, ClaimModal } from './components';
import IconCoin from '@assets/icons/icon-coin-w50-h48.svg';
import IconCoinSm from '@assets/icons/icon-coin-w25-h24.svg';
import IconInfo from '@assets/icons/icon-info.svg';

import infoImage from './images/info.png';
import styles from './styles.module.css';
import clsx from 'clsx';
import { spacing } from '@shared/mixins/MixSpacing';
import { useUserStore } from '@shared/models/user';
import { formatNumber } from '@shared/utils/format-sum-to-k';

export const MainPage = () => {
  const { user } = useUserStore();

  return (
    <Layout>
      <Flex style={{ height: '100%' }} direction="column" justify="space-between" fullWidth>
        <Header />

        <Flex direction="column" align="center" fullWidth>
          <Flex align="center">
            <div>
              <img src={IconCoin} alt="coin" />
            </div>
            <p style={{ fontWeight: 600, fontSize: '32px' }}>{user?.balance}</p>
          </Flex>

          <Flex style={{ position: 'relative', marginBottom: '100px' }}>
            <img className={styles.frame} src={infoImage} alt="info" />

            <Flex align="center" className={clsx(styles.info)}>
              <Flex align="center" direction="column" fullWidth>
                <p style={{ fontSize: '13px' }}>Прибыль в час</p>
                <Flex align="center" gap="s">
                  <div>
                    <img src={IconCoinSm} alt="coin-icon" />
                  </div>
                  <p
                    style={{ fontWeight: 700, fontSize: '15px' }}
                    className={spacing({ pt: '1x' })}
                  >
                    {formatNumber(user?.hour_profit || '0')}
                  </p>
                  <div className={spacing({ pt: '1x' })}>
                    <img src={IconInfo} alt="info-icon" />
                  </div>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <ClaimModal open={user?.isClaimReady} />
    </Layout>
  );
};

export default MainPage;
