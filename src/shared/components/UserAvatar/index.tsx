import { FC } from 'react';
import styles from './styles.module.css';

interface UserAvatarProps {
  url?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ url }) => {
  return (
    <div className={styles.avatar}>
      <img src={url} className={styles.tg} alt="avatar" />
    </div>
  );
};

export default UserAvatar;
