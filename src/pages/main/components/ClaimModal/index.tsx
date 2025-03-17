import { FC, useState } from 'react';
import styles from './styles.module.css';
import frame from './images/frame.png';
import Button from '@shared/components/Button';
import claim from '@shared/api/claim';
import { getUserData } from '@shared/models/user';
import WebApp from '@twa-dev/sdk';

export const ClaimModal: FC = () => {
  const [loading, setLoading] = useState(false);
  const clickHandle = async () => {
    try {
      setLoading(true);
      const tgUser = WebApp.initDataUnsafe.user;
      if (!tgUser?.id) {
        console.log('No tg user');
        return setLoading(false);
      }
      const data = await claim({ id: tgUser?.id || 0 });

      if (data.result?.success) {
        await getUserData();
      }

      setLoading(false);
    } catch (e) {
      console.error('CLIAM ERROR');
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <img src={frame} alt="frame" />

        <div className={styles.content}>
          <p>GOOD</p>
          <Button loading={loading} onClick={clickHandle}>
            Hola
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;
