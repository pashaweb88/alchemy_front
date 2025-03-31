import { Application, Assets, FederatedPointerEvent } from 'pixi.js';
import { Element } from '@shared/models/elements';

import { hitTest } from './utils/hit-test';
import { sellElementApi } from '@shared/api/sell-element';
import { DragController } from './DragController';
import { ElementNode } from './Element';
import { Navigation } from './Navigation';
import { NavItem } from './NavItem';
import { loader } from './Loader';
import { DropController } from './DropController';
import { CombinationController } from '@shared/game/CombinationController';
import {
  MESSAGE_KEY_ADD_ITEM,
  MESSAGE_KEY_ADD_ITEM_LIMIT,
  MESSAGE_KEY_SELL_ITEM,
  MESSAGE_KEY_SELL_ITEM_FAIL
} from './constants';

export class Game {
  app = new Application();
  // items: ElementNode[] = [];
  dragTarget: ElementNode | null = null;
  offset: { x: number; y: number } = { x: 0, y: 0 };
  lastGridPos: { x: number; y: number } = { x: -40, y: 20 };
  nav?: Navigation;
  dragController?: DragController;
  dropController?: DropController;
  combinationController?: CombinationController;

  moveHandle(e: FederatedPointerEvent) {
    e.stopPropagation();
    this.dragController?.handle(e);
  }

  upHandle(e: FederatedPointerEvent) {
    this.dropController?.handle(e);
  }

  checkCombination(combination: ElementNode[]) {
    this.combinationController?.check(combination);
  }

  sellElement(el: ElementNode) {
    sellElementApi({
      name: el.element.name_eng || '',
      count: 1
    })
      .then(() => window.postMessage({ key: MESSAGE_KEY_SELL_ITEM, val: 'success' }))
      .catch(() => window.postMessage({ key: MESSAGE_KEY_SELL_ITEM_FAIL, val: 'error' }));
  }

  async init() {
    this.dragController = new DragController(this);
    this.dropController = new DropController(this);
    this.combinationController = new CombinationController(this);

    await loader.load();
    await this.app.init({
      backgroundAlpha: 0,
      resizeTo: window
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

  setAllNavItemsInactive() {
    const allNodes = this.app.stage.children.filter(
      (obj: any) => obj instanceof NavItem
    ) as NavItem[];
    allNodes.forEach((node: NavItem) => {
      node.leave();
    });
  }

  async addItem(element: Element, maxCount: number = 0) {
    const boardCount = this.getElementsCountByName(element.name_eng);

    if (boardCount >= maxCount) {
      return window.postMessage({ key: MESSAGE_KEY_ADD_ITEM_LIMIT, val: 'error' });
    }

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

    window.postMessage({ key: MESSAGE_KEY_ADD_ITEM, val: 'success' });
  }

  getCombination(point: any) {
    return this.app.stage.children.filter(
      (obj: any) => obj instanceof ElementNode && hitTest(obj, point)
    ) as ElementNode[];
  }

  getElementsCountByName(name: string) {
    return this.app.stage.children.filter(
      (obj: any) => obj instanceof ElementNode && obj.element.name_eng === name
    ).length;
  }

  checkButton(point: any) {
    return this.app.stage.children.find(
      (obj: any) => obj instanceof NavItem && hitTest(obj, point)
    ) as NavItem;
  }
  setDragTarget(card: ElementNode) {
    this.dragTarget = card;
    this.nav?.setAsideActive();
  }
  setDragOffset(offset: { x: number; y: number }) {
    this.offset = offset;
  }
  createNav() {
    if (this.nav) {
      return;
    }

    this.nav = new Navigation(this);
    this.nav.createMainMenu();
    this.nav.createAsideMenu();
    this.app.stage.addChild(this.nav);
  }

  clearElement(el: ElementNode) {
    el.destroy();
    this.app.stage.removeChild(el);
  }

  clearElements() {
    this.lastGridPos = { x: -40, y: 20 };

    const nodes = this.app.stage.children.filter(
      (obj: any) => obj instanceof ElementNode
    ) as ElementNode[];

    nodes.forEach(child => {
      child.destroy({ children: true, texture: true });
      this.app.stage.removeChild(child);
    });
  }
}

export const game = new Game();
