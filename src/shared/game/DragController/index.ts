import { NavItem } from '@shared/game/NavItem';
import { hitTest } from '@shared/game/utils/hit-test';
import { Game } from '@shared/game';
import { SIZE } from '@shared/game/constants';

export class DragController {
  constructor(private readonly game: Game) {}

  handle(e: any) {
    if (this.game.dragTarget) {
      this.game.dragTarget.position.set(e.clientX - (SIZE + 4) / 2, e.clientY - (SIZE + 4) / 2);

      const navItem = this.game.app.stage.children.find(
        (obj: any) => obj instanceof NavItem && hitTest(obj, e.client)
      ) as NavItem;

      if (navItem) {
        navItem.hover();
        this.game.dragTarget.setSmall(e.client);
      } else {
        this.game.dragTarget.setNormal(e.client);
        this.game.setAllNavItemsInactive();
      }

      const combination = this.game.getCombination(e.client);

      if (combination.length > 1) {
        combination[0].setActive(true);
      } else {
        this.game.setAllNodesInactive();
      }
    }
  }
}
