import { Game } from '../';

export class DropController {
  constructor(private readonly game: Game) {}

  handle(e: any) {
    if (this.game.dragTarget) {
      const elementDrop = this.game.dragTarget;

      this.game.dragTarget.zIndex = 0;
      this.game.dragTarget = null;

      const combination = this.game.getCombination(e.client);
      const button = this.game.checkButton(e.client);

      if (button?.itemType === 'inventory') {
        this.game.nav?.setMainActive();
        return this.game.clearElement(elementDrop);
      }

      if (button?.itemType === 'sell') {
        this.game.nav?.setMainActive();
        this.game.clearElement(elementDrop);
        return this.game.sellElement(elementDrop);
      }

      this.game.nav?.setMainActive();

      if (combination.length > 1) {
        this.game.checkCombination(combination);
      }
    }
  }
}
