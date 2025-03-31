import WebApp from '@twa-dev/sdk';

export const validateTelegramUser = () => {
  const tgUser = WebApp.initDataUnsafe.user;
  if (!tgUser?.id) {
    console.log('No tg user');
    return false;
  }
  return true;
};
