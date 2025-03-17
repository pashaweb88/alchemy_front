import './styles.scss';
import { FC } from 'react';
import { IconAvatarFrame } from '@assets/icons';

interface UserInfoProps {
  imgUrl?: string;
  first_name?: string;
  last_name?: string;
}
export const UserInfo: FC<UserInfoProps> = ({ imgUrl, first_name = 'foo', last_name = 'bar' }) => {
  return (
    <div className="user-info">
      <div className="user-info__avatar">
        {/*<avatar-frame className="user-info__avatar-frame"/>*/}
        <div className="user-info__avatar-frame">
          <IconAvatarFrame />
        </div>
        <img src={imgUrl} className="user-info__avatar-img" alt="" />
      </div>
      <div className="user-info__name">{`${first_name} ${last_name}`}</div>
    </div>
  );
};

export default UserInfo;
