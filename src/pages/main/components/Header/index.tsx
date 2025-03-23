import { FC } from 'react';
import { Flex } from '@shared/components/Flex';
import { spacing } from '@shared/mixins/MixSpacing';
import walletIcon from './images/wallet.png';
import settingsIcon from './images/settings.png';
import energyIcon from './images/energy.png';
import energyIco from '@assets/images/icon-energy.png';
import styles from './styles.module.css';
import avatarFrame from '@assets/icons/avatar-frame.svg';
import WebApp from '@twa-dev/sdk';
import Typography from '@shared/components/Typography';

export const Header: FC = () => {
  console.log();
  const photoUrl = WebApp?.initDataUnsafe?.user?.photo_url;
  const name = WebApp?.initDataUnsafe?.user?.first_name || 'user';
  const surname = WebApp?.initDataUnsafe?.user?.last_name || Date.now();

  return (
    <Flex align="start" className={spacing({ p: '4x' })} justify="space-between" fullWidth>
      <Flex gap="m" align="center">
        {photoUrl && (
          <div className={styles.avatar}>
            <img src={photoUrl} className={styles.tg} alt="avatar" />
            <div className={styles.frame}>
              <img src={avatarFrame} alt="frame" />
            </div>
          </div>
        )}
        <Typography size={16} weight={600} color="primary">
          {name} {surname}
        </Typography>
      </Flex>

      <div>
        <Flex className={spacing({ mb: '3x' })} justify="space-between">
          <div className={styles.button}>
            <img src={walletIcon} alt="wallet" />
          </div>

          <div className={styles.button}>
            <img src={settingsIcon} alt="settings" />
          </div>
        </Flex>

        <div className={styles.energy}>
          <img src={energyIcon} alt="frame" />

          <Flex align="center" justify="center" className={styles.content}>
            <img className={styles['energy-icon']} src={energyIco} alt="energyIcon" />
            <Typography size={14} weight={600}>
              1000/1000
            </Typography>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default Header;
