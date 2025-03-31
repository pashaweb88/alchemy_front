import { Container, FillGradient, Graphics, Sprite, Text } from 'pixi.js';
import { SIZE, BORDER } from '../constants';

export class NavItem extends Container {
  frame: Graphics = new Graphics();
  itemType: string = '';

  constructor(texture: any, text: string) {
    super();

    this.frame = this.createFrame();
    const background = this.createSquare();
    const sprite = this.createSprite(texture);
    const textNode = this.createText(text, SIZE / 2);
    this.addChild(this.frame);
    this.addChild(background);
    this.addChild(sprite);
    this.addChild(textNode);
  }
  hover() {
    this.frame.alpha = 1;
  }
  leave() {
    this.frame.alpha = 0;
  }
  createFrame() {
    const colorStops = [0xebd09b, 0x776547];
    const gradientFill = new FillGradient(0, 0, 1, 1);

    colorStops.forEach((number, index) => {
      const ratio = index / colorStops.length;

      gradientFill.addColorStop(ratio, number);
    });
    const square = new Graphics();
    square.roundRect(0, 0, SIZE, SIZE, 10);
    square.fill(gradientFill);
    square.alpha = 0;
    return square;
  }
  createSquare() {
    const square = new Graphics();
    const m = BORDER;
    square.roundRect(m, m, SIZE - m * 2, SIZE - m * 2, 10);
    square.fill(0x2b174b);
    return square;
  }
  createSprite(texture: any) {
    const elementSprite = new Sprite(texture);
    elementSprite.width = 40;
    elementSprite.height = 40;
    elementSprite.x = 15;
    elementSprite.y = 10;
    return elementSprite;
  }
  createText(t: string, x: number) {
    const text = new Text({
      text: t,
      style: { fontFamily: 'Sf Ui Display Regular', fontSize: 10, fill: 0xebd09b },
      resolution: 3
    });
    text.anchor.set(0.5);
    text.scale.set(1, 1);
    text.x = x;
    text.y = SIZE - 14;
    return text;
  }
}
