import { FC } from 'react';
import styles from './styles.module.css';
import magicImage from '@pages/elements/images/magic.png';
import { Flex } from '@shared/components/Flex';
import iconCoin from '@assets/icons/icon-coin-w-60-h-41.svg';

export const Header: FC = () => {
  return (
    <div className={styles.header}>
      <img src={magicImage} alt="magic-header" />

      <Flex className={styles.content} align="center" direction="column" fullWidth>
        <p>Элементы</p>
        <Flex justify="center" align="center" fullWidth>
          <div className={styles.coin}>
            <img src={iconCoin} alt="coin-icon" />
          </div>
          <p>asd</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
