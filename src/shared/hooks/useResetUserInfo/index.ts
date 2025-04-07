import { getUserData } from '@shared/models/user';
import { getElements } from '@shared/models/elements';
import { parseReferer } from '@shared/utils/parse-referer';
import WebApp from '@twa-dev/sdk';

export const useResetUserInfo = () => {
  const friend = parseReferer(WebApp?.initDataUnsafe?.start_param || '');
  console.log('FRINED: ', friend);
  const fetchUserData = async () => await Promise.all([getUserData(friend), getElements()]);

  return { fetchUserData };
};

export default useResetUserInfo;
