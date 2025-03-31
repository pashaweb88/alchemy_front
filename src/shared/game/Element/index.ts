import { Container, FillGradient, Graphics, Sprite } from 'pixi.js';
import { Element } from '@shared/models/elements';
import { Game } from '..';
import { SIZE } from '@shared/game/constants';
import gsap from 'gsap';

export class ElementNode extends Container {
  frame?: Graphics;
  form?: Graphics;
  sizeContainer?: Container;
  elementSprite?: Sprite;

  isSmall = false;

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
      // this.game.setDragOffset({
      //   x: e.client.x - this.position.x,
      //   y: e.client.y - this.position.y
      // });
    });

    this.eventMode = 'static';
    this.cursor = 'pointer';
  }

  setActive(isActive: boolean) {
    this.frame!.alpha = isActive ? 1 : 0;
  }
  setSmall(pos: { x: number; y: number }) {
    if (this.isSmall) return;
    this.isSmall = true;

    gsap.to(this.sizeContainer!.scale, {
      x: 0.7,
      y: 0.7,
      duration: 0.1,
      ease: 'power2.inOut'
    });
    gsap.to(this.sizeContainer!.position, {
      x: 10,
      y: 10,
      duration: 0.1,
      ease: 'power2.inOut'
    });
  }
  setNormal(pos: { x: number; y: number }) {
    if (!this.isSmall) return;
    this.isSmall = false;

    gsap.to(this.sizeContainer!.position, {
      x: 0,
      y: 0,
      duration: 0.1,
      ease: 'power2.inOut'
    });

    gsap.to(this.sizeContainer!.scale, {
      x: 1,
      y: 1,
      duration: 0.1,
      ease: 'power2.inOut'
    });
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

    this.form = new Graphics();
    this.form.roundRect(2, 2, 80, 80, 15);
    this.form.fill(0x000000);

    this.elementSprite = new Sprite(this.texture);
    this.elementSprite.x = 50;
    this.elementSprite.y = 45;
    this.elementSprite.scale.x = 0.1;
    this.elementSprite.scale.y = 0.1;
    this.elementSprite.anchor = 0.5;
    this.elementSprite.mask = this.form;

    this.sizeContainer = new Container();
    this.sizeContainer.addChild(this.frame);
    this.sizeContainer.addChild(this.form);
    this.sizeContainer.addChild(this.elementSprite);

    this.addChild(this.sizeContainer);
  }
}
