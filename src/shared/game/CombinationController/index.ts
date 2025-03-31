import { Element } from '@shared/models/elements';
import { request } from '@shared/utils/request';
import { ElementNode } from '../Element';
import { Game } from '../';
import { MESSAGE_KEY_NEW_ELEMENT } from '../constants';

export class CombinationController {
  constructor(private readonly game: Game) {}
  check(combination: ElementNode[]) {
    request<Element | null>('/api/check-combination', {
      method: 'POST',
      data: {
        element1: combination[0].element.name_rus,
        element2: combination[1].element.name_rus
      }
    })
      .then(response => {
        if (!response.result) {
          this.game.setAllNodesInactive();
        } else {
          window.postMessage({ key: MESSAGE_KEY_NEW_ELEMENT, val: response.result });
          combination.forEach(child => {
            child.destroy({ children: true, texture: true });
            this.game.app.stage.removeChild(child);
          });
        }
      })
      .catch(e => {
        console.error('Check combination error', e);
        this.game.setAllNodesInactive();
      });
  }
}
