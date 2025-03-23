import { Container, FillGradient, Graphics, Sprite } from 'pixi.js';
import { Element } from '@shared/models/elements';
import { Game } from '..';

export class ElementNode extends Container {
  frame?: Graphics;
  constructor(
    private readonly game: Game,
    public readonly element: Element,
    private readonly texture: any,

    pos: { x: number; y: number }
  ) {
    super();
    this.x = pos.x;
    this.y = pos.y;
    this.createGraphicMask();

    this.on('pointerdown', e => {
      this.zIndex = 9;
      this.game.setDragTarget(this);
      this.game.setDragOffset({
        x: e.client.x - this.position.x,
        y: e.client.y - this.position.y
      });
    });

    this.eventMode = 'static';
    this.cursor = 'pointer';
  }

  setActive(isActive: boolean) {
    this.frame!.alpha = isActive ? 1 : 0;
  }

  createGraphicMask() {
    const colorStops = [0xebd09b, 0x776547];
    const gradientFill = new FillGradient(0, 0, 1, 1);

    colorStops.forEach((number, index) => {
      const ratio = index / colorStops.length;

      gradientFill.addColorStop(ratio, number);
    });

    this.frame = new Graphics();
    this.frame.roundRect(0, 0, 84, 84, 15).fill(gradientFill);
    this.frame.alpha = 0;

    const square = new Graphics();
    square.roundRect(2, 2, 80, 80, 15);
    square.fill(0x000000);

    const elementSprite = new Sprite(this.texture);
    elementSprite.x = -28;
    elementSprite.y = -1;
    elementSprite.scale.x = 0.1;
    elementSprite.scale.y = 0.1;
    elementSprite.mask = square;

    this.addChild(this.frame);
    this.addChild(square);
    this.addChild(elementSprite);
  }
}
