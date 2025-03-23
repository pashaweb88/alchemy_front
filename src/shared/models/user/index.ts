import { create } from 'zustand';
import request from '@shared/utils/request';
import WebApp from '@twa-dev/sdk';
import getUserInfo from '@shared/api/get-user-info';
import { LOCAL_STORAGE_KEY_AUTH } from '@shared/constants/storage';

type UserElement = {
  id: number;
  name: string;
  count: number;
};
type User = {
  id: number;
  telegramUserId: string;
  data: string;
  username: string;
  energy: string;
  balance: string;
  loading: boolean;
  last_name: string;
  first_name: string;
  photo_url: string;
  claim: Date;
  isClaimReady: boolean;
  hour_profit: string;
  userElements: UserElement[];
};

type Store = {
  loading: boolean;
  user?: User;
};

export const useUserStore = create<Store>()(() => ({
  loading: true
}));

export const getUserData = async () => {
  const tgUser = WebApp.initDataUnsafe.user;

  useUserStore.setState(() => ({ loading: true }));

  if (!tgUser) {
    return;
  }
  try {
    const auth = await request<{ accessToken?: string }>('/auth/login', {
      method: 'post',
      data: {
        id: tgUser.id,
        username: tgUser.username,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name
      }
    });
    if (auth.result?.accessToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, auth.result.accessToken);
    }

    const info = await getUserInfo({ id: tgUser.id.toString() });
    const data = info.result as any;

    useUserStore.setState(prev => ({
      ...prev,
      user: { ...data, photo_url: tgUser.photo_url },
      loading: false
    }));
    console.log('NEW: ', useUserStore.getState());
  } catch (e) {
    console.error(e);
    useUserStore.setState(() => ({ loading: false }));
  }
};
