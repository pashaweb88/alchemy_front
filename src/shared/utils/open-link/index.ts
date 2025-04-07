import WebApp from '@twa-dev/sdk';

export const openLink = (link: string) => {
  if (WebApp?.platform === 'tdesktop' || WebApp?.platform === 'macos') {
    link.includes('https://t.me')
      ? WebApp.openTelegramLink(link)
      : WebApp.openLink(link, { try_instant_view: true });
  } else {
    window.open(link, '_blank');
  }
};
