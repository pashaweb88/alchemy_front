export const getCoverUrl = (name: string = '') =>
  `${import.meta.env.VITE_APP_HOST}/elements/${name}.webp`;
