import { Assets } from 'pixi.js';

export class Loader {
  textureQuestionIcon: any;
  textureChestIcon: any;
  textureBagIcon: any;
  textureHoleIcon: any;

  textureBagOpenIcon: any;
  textureSellIcon: any;

  async load() {
    Assets.addBundle('fonts', [
      { alias: 'SFUI', src: `${import.meta.env.VITE_APP_HOST}/font/SF-UI-Display-Regular.ttf` }
    ]);
    await Assets.loadBundle('fonts');

    this.textureQuestionIcon = await Assets.load(
      `${import.meta.env.VITE_APP_HOST}/icons/game/question.png`
    );

    this.textureChestIcon = await Assets.load(
      `${import.meta.env.VITE_APP_HOST}/icons/game/chest.png`
    );

    this.textureBagIcon = await Assets.load(`${import.meta.env.VITE_APP_HOST}/icons/game/bag.png`);

    this.textureHoleIcon = await Assets.load(
      `${import.meta.env.VITE_APP_HOST}/icons/game/hole.png`
    );

    this.textureSellIcon = await Assets.load(
      `${import.meta.env.VITE_APP_HOST}/icons/game/sell.png`
    );

    this.textureBagOpenIcon = await Assets.load(
      `${import.meta.env.VITE_APP_HOST}/icons/game/bag_open.png`
    );
  }
}

export const loader = new Loader();
