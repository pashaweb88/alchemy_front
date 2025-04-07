import { FC } from 'react';
import { Backdrop } from '@shared/components/Backdrop';
import { Scroll } from '@shared/components/Scroll';
import { Typography } from '@shared/components/Typography';
import { Flex } from '@shared/components/Flex';
import { FrameIcon } from './components';
import { CoinText } from '@shared/components/CoinText';
import { UserAvatar } from '@shared/components/UserAvatar';
import styles from './styles.module.css';
import clsx from 'clsx';
import { spacing } from '@shared/mixins/MixSpacing';
import { useFriendsStore } from '@shared/models/friends';
import formatNumber from '@shared/utils/format-sum-to-k';

interface FriendsListProps {
  open?: boolean;
  onClose?: () => void;
}

export const FriendsList: FC<FriendsListProps> = ({ open, onClose }) => {
  const { friends } = useFriendsStore();

  return (
    <Backdrop width={315} open={open} onClose={onClose}>
      <Scroll>
        <div className={spacing({ px: '1x', py: '2x' })}>
          <Typography className={spacing({ mb: '4x' })} size={16} weight={600}>
            Список ваших друзей {`(${friends.length})`}
          </Typography>

          <Flex direction="column" fullWidth>
            {friends.map(({ balance, username, avatarUrl }, index) => (
              <div key={index} className={styles.item}>
                <FrameIcon styles={{ width: '100%' }} />

                <Flex
                  gap="m"
                  align="center"
                  className={clsx(styles.content, spacing({ px: '2x' }))}
                  fullWidth
                >
                  <div className={styles.avatar}>
                    <UserAvatar url={avatarUrl} />
                  </div>
                  <Flex direction="column" className={styles.text}>
                    <Typography size={12} weight={600}>
                      {username}
                    </Typography>
                    {/*<CoinText>*/}
                    {/*  <Typography size={12} styles={{ color: '#968E8C' }}>*/}
                    {/*    476 (15K)*/}
                    {/*  </Typography>*/}
                    {/*</CoinText>*/}
                  </Flex>
                  <div className={styles.cost}>
                    <CoinText>
                      <Typography size={16} weight={600}>
                        +{formatNumber(balance)}
                      </Typography>
                    </CoinText>
                  </div>
                </Flex>
              </div>
            ))}
          </Flex>
        </div>
      </Scroll>
    </Backdrop>
  );
};

export default FriendsList;
