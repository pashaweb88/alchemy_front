import { create } from 'zustand/index';
import { Friend as FriendType, getFriends as getFriendsApi } from '@shared/api/get-friends';

type Store = {
  loading: boolean;
  loaded: boolean;
  friends: FriendType[];
};

export const useFriendsStore = create<Store>(() => ({
  loading: false,
  loaded: false,
  friends: []
}));

export const getFriends = async () => {
  try {
    useFriendsStore.setState(() => ({ loading: true }));
    const data = await getFriendsApi();
    useFriendsStore.setState(() => ({
      loading: false,
      loaded: true,
      friends: data.result?.friends || []
    }));
  } catch (e) {
    useFriendsStore.setState(() => ({ loading: false }));
  }
};
