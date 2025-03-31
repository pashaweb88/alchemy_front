import { Container } from 'pixi.js';
import { loader } from '@shared/game/Loader';
import { Game } from '@shared/game';
import { SIZE, OFFSET, MESSAGE_KEY_OPEN_TUTOR, MESSAGE_KEY_OPEN_INVENTORY } from '../constants';
import { NavItem } from '../NavItem';

export class Navigation extends Container {
  items = [
    { text: 'Инструкция', texture: loader.textureQuestionIcon, textX: 7, type: 'tutor' },
    { text: 'Инвентарь', texture: loader.textureChestIcon, textX: 7, type: 'inventory' },
    // { text: 'Продать', texture: loader.textureBagIcon, textX: 7, type: 'sell' },
    { text: 'Очистить', texture: loader.textureHoleIcon, textX: 7, type: 'clear' }
  ];
  hoverItems = [
    { text: 'Инвентарь', texture: loader.textureBagOpenIcon, textX: 7, type: 'inventory' },
    { text: 'Продать', texture: loader.textureSellIcon, textX: 7, type: 'sell' }
  ];

  mainMenu: Container[] = [];
  asideMenu: Container[] = [];
  activePosY = 0;

  constructor(private readonly game: Game) {
    super();
    this.activePosY = game.app.canvas.height - 200;
  }

  createMainMenu() {
    const screenCenterX = this.game.app.canvas.width / 2;
    const navWidth = (74 * 3 + OFFSET * 2) / 2;
    let posX = screenCenterX - navWidth;
    for (const item of this.items) {
      const navItem = new NavItem(item.texture, item.text);

      navItem.eventMode = 'static';
      navItem.on('pointerdown', () => {
        if (item.type === 'tutor') {
          return window.postMessage({ key: MESSAGE_KEY_OPEN_TUTOR });
        }
        if (item.type === 'inventory') {
          return window.postMessage({ key: MESSAGE_KEY_OPEN_INVENTORY });
        }
        if (item.type === 'clear') {
          return this.game.clearElements();
        }
      });
      navItem.x = posX;
      navItem.y = this.activePosY;

      this.mainMenu.push(navItem);
      this.game.app.stage.addChild(navItem);
      posX += SIZE + OFFSET;
    }

    this.x = this.game.app.canvas.width / 2 - this.width / 2;
    this.y = this.game.app.canvas.height - 200;
  }

  createAsideMenu() {
    const screenCenterX = this.game.app.canvas.width / 2;
    const navWidth = (74 * 2 + OFFSET) / 2;
    let posX = screenCenterX - navWidth;
    // const posY = this.game.app.canvas.height - 200;

    for (const item of this.hoverItems) {
      const navItem = new NavItem(item.texture, item.text);
      navItem.eventMode = 'static';
      navItem.itemType = item.type;
      navItem.x = posX;
      navItem.y = 1000;

      this.asideMenu.push(navItem);
      this.game.app.stage.addChild(navItem);
      posX += SIZE + OFFSET;
    }
  }

  setAsideActive() {
    this.mainMenu.forEach(item => {
      item.y = 1000;
    });
    this.asideMenu.forEach(item => {
      item.y = this.activePosY;
    });
  }
  setMainActive() {
    this.mainMenu.forEach(item => {
      item.y = this.activePosY;
    });
    this.asideMenu.forEach(item => {
      item.y = 1000;
    });
  }
}
