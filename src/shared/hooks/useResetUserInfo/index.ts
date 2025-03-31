import { getUserData } from '@shared/models/user';
import { getElements } from '@shared/models/elements';

export const useResetUserInfo = () => {
  const fetchUserData = () => {
    Promise.all([getUserData(), getElements()]);
  };

  return { fetchUserData };
};

export default useResetUserInfo;
