import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { loader } from '@shared/game/Loader';
import { game } from '@shared/game';
import { useGameStore } from '@shared/game/model';

export class Navigation extends Container {
  items = [
    { text: 'Инструкция', texture: loader.textureQuestionIcon, textX: 7 },
    { text: 'Инвентарь', texture: loader.textureChestIcon, textX: 7 },
    { text: 'Продать', texture: loader.textureBagIcon, textX: 7 },
    { text: 'Очистить', texture: loader.textureHoleIcon, textX: 7 }
  ];
  size = 70;
  offset = 10;

  constructor() {
    super();
  }

  createItems() {
    let posX = 0;

    for (const item of this.items) {
      const container = new Container();
      container.x = posX;
      container.y = 0;

      const square = new Graphics();
      square.roundRect(0, 0, this.size, this.size, 10);
      square.fill(0x2b174b);

      const elementSprite = new Sprite(item.texture);
      elementSprite.width = 40;
      elementSprite.height = 40;
      elementSprite.x = 15;
      elementSprite.y = 10;

      const text = new Text({
        text: item.text,
        style: { fontFamily: 'Sf Ui Display Regular', fontSize: 10, fill: 0xebd09b }
      });
      text.x = item.textX;
      text.y = 50;

      container.addChild(square);
      container.addChild(text);
      container.addChild(elementSprite);
      container.eventMode = 'static';
      container.on('pointerdown', () => {
        console.log('pointerdown');
        useGameStore.getState().openInventoryHandle();
      });
      this.addChild(container);
      posX += this.size + this.offset;
    }

    this.x = game.app.canvas.width / 2 - this.width / 2;
    this.y = game.app.canvas.height - 200;
  }
}
