import { FC, useState } from 'react';

import { Flex } from '@shared/components/Flex';
import { Button } from '@shared/components/Button';
import { CopyIcon } from '@shared/Icons/components/Copy';
import { Typography } from '@shared/components/Typography';
import styles from './styles.module.css';
import bgframe from '../../images/bgframe.png';
import { FriendsList } from '../../components';
import { share } from '@shared/utils/share/idnex.ts';
import WebApp from '@twa-dev/sdk';
import { useFriendsStore } from '@shared/models/friends';

export const Friends: FC = () => {
  const [show, setShow] = useState(false);
  const { loading } = useFriendsStore();

  const closeHandle = () => setShow(false);

  const openHandle = async () => setShow(true);

  const shareHandle = () => {
    const id = WebApp?.initDataUnsafe?.user?.id;
    if (id) {
      share(id.toString());
    }
  };

  return (
    <div className={styles.friends}>
      <img src={bgframe} alt="frame" />
      <Flex gap="m" className={styles.content} direction="column" noWrap fullWidth>
        <Typography size={16} weight={600}>
          Приглашай друзей
        </Typography>
        <div>
          <Typography color="secondary" size={12}>
            + 5 000 для вас и вашего друга без Telegram Premium
          </Typography>
          <Typography color="secondary" size={12}>
            + 25 000 для вас и вашего друга с Telegram Premium
          </Typography>
        </div>
        <Flex gap="s" fullWidth>
          <div style={{ flex: 1 }}>
            <Button onClick={shareHandle}>Пригласить друга</Button>
          </div>
          <div style={{ width: '45px', flexShrink: 0 }}>
            <Button>
              <CopyIcon style={{ width: '20px', height: '20px' }} color="#0E0923" />
            </Button>
          </div>
        </Flex>
        <Button variant="rahmon" onClick={openHandle} loading={loading}>
          Список приглашенных друзей
        </Button>
      </Flex>
      <FriendsList open={show} onClose={closeHandle} />
    </div>
  );
};

export default Friends;
