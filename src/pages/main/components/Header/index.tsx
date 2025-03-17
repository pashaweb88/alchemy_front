import { FC } from 'react';
import { Flex } from '@shared/components/Flex';
import { spacing } from '@shared/mixins/MixSpacing';
import walletIcon from './images/wallet.png';
import settingsIcon from './images/settings.png';
import energyIcon from './images/energy.png';
import energyIco from '@assets/images/icon-energy.png';
import styles from './styles.module.css';
import { IconAvatarFrame } from '@assets/icons';

export const Header: FC = () => {
  return (
    <Flex align="start" justify="space-between" fullWidth>
      <Flex align="center">
        <IconAvatarFrame />
        <p>Volkov p</p>
      </Flex>

      <div>
        <Flex className={spacing({ mb: '5x' })} justify="space-between">
          <div className={styles.button}>
            <img src={walletIcon} alt="wallet" />
          </div>

          <div className={styles.button}>
            <img src={settingsIcon} alt="settings" />
          </div>
        </Flex>

        <div className={styles.energy}>
          <div className={styles.image}>
            <img src={energyIcon} alt="energy" />
          </div>
          <Flex align="center" justify="center" className={styles.content}>
            <div>
              <img src={energyIco} alt="energyIcon" />
            </div>
            <p>100/1000</p>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default Header;
