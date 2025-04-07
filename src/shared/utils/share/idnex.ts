import { openLink } from '@shared/utils/open-link';

const BOT_URL = import.meta.env.VITE_BOT_APP;

export const share = (userId: string) => {
  openLink(`https://t.me/share/url?url=${BOT_URL}?startapp=ref_${userId}`);
};
