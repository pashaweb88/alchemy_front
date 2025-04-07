import request from '@shared/utils/request';
import { LOCAL_STORAGE_KEY_AUTH } from '@shared/constants/storage';
import WebApp from '@twa-dev/sdk';

export const login = async () => {
  try {
    const tgUser = WebApp.initDataUnsafe.user;
    const avatar = WebApp?.initDataUnsafe?.user?.photo_url;

    const auth = await request<{ accessToken?: string }>('/auth/login', {
      method: 'post',
      data: {
        id: tgUser?.id || 0,
        username: tgUser?.username || '',
        first_name: tgUser?.first_name || '',
        last_name: tgUser?.last_name || '',
        avatar
      }
    });
    if (auth.result?.accessToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, auth.result.accessToken);
    }
    return true;
  } catch (e) {
    return false;
  }
};

export default login;
