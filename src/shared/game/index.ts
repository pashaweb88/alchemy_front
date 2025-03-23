import { Application, Assets, FederatedPointerEvent } from 'pixi.js';
import { Element } from '@shared/models/elements';
import { ElementNode } from './Element';
import { Navigation } from './Navigation';
import { loader } from './Loader';
import { request } from '@shared/utils/request';
import { useGameStore } from '@shared/game/model';
import { grid } from './grid';
import { hitTest } from './utils/hit-test';

export class Game {
  app = new Application();
  items: ElementNode[] = [];
  dragTarget: ElementNode | null = null;
  offset: { x: number; y: number } = { x: 0, y: 0 };
  lastGridPos: { x: number; y: number } = { x: -40, y: 20 };

  moveHandle(e: FederatedPointerEvent) {
    if (this.dragTarget) {
      this.dragTarget.position.set(e.clientX - this.offset.x, e.clientY - this.offset.y);

      const combination = this.getCombination(e.client);

      if (combination.length > 1) {
        combination[0].setActive(true);
      } else {
        this.setAllNodesInactive();
      }
    }
  }

  upHandle(e: FederatedPointerEvent) {
    if (this.dragTarget) {
      this.dragTarget.zIndex = 0;
      this.dragTarget = null;

      const combination = this.getCombination(e.client);

      if (combination.length > 1) {
        request<Element | null>('/api/check-combination', {
          method: 'POST',
          data: {
            element1: combination[0].element.name_rus,
            element2: combination[1].element.name_rus
          }
        })
          .then(response => {
            if (!response.result) {
              this.setAllNodesInactive();
            } else {
              useGameStore.getState().setNewElement(response.result);
              combination.forEach(child => {
                child.destroy({ children: true, texture: true });
                this.app.stage.removeChild(child);
              });
            }
          })
          .catch(e => {
            console.error('Check combination error', e);
            this.setAllNodesInactive();
          });
      }
    }
  }

  async init() {
    await loader.load();

    await this.app.init({
      backgroundAlpha: 0,
      resizeTo: document.getElementById('game-board') as any
    });

    this.app.stage.eventMode = 'static';
    this.app.stage.hitArea = this.app.screen;
    this.app.stage.on('pointermove', e => this.moveHandle(e));
    this.app.stage.on('pointerup', e => this.upHandle(e));
  }

  setAllNodesInactive() {
    const allNodes = this.app.stage.children.filter(
      (obj: any) => obj instanceof ElementNode
    ) as ElementNode[];
    allNodes.forEach((node: ElementNode) => {
      node.setActive(false);
    });
  }

  async addItem(element: Element) {
    const pos = { x: this.lastGridPos.x + 90, y: this.lastGridPos.y };
    if (pos.x > this.app.stage.width) {
      pos.x = 50;
      pos.y += 90;
    }
    const coverUrl = `${import.meta.env.VITE_APP_HOST}/elements/${element.name_eng}.webp`;
    const texture = await Assets.load(coverUrl);
    const elementNode = new ElementNode(this, element, texture, pos);

    // this.items.push(elementNode);
    this.app.stage.addChild(elementNode);
    this.lastGridPos = pos;
  }

  private getCombination(point: any) {
    return this.app.stage.children.filter(
      (obj: any) => obj instanceof ElementNode && hitTest(obj, point)
    ) as ElementNode[];
  }
  setDragTarget(card: ElementNode) {
    this.dragTarget = card;
  }
  setDragOffset(offset: { x: number; y: number }) {
    this.offset = offset;
  }
  createNav() {
    const nav = new Navigation();
    nav.createItems();
    this.app.stage.addChild(nav);
  }
}

export const game = new Game();
