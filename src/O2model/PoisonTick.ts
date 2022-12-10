import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "O4cmds/11HealthAdj";
import { Mob } from "./09Mob";
import { TickIF } from "./24BuffIF";


export class PoisonTick implements TickIF {
  tick(time: number): void {
    if (time % 2) { return; }
    let dmg = 1;
    if (this.mob.isPly) {
      this.game.msg(`the poison hurts:${dmg}`);
    }
    HealthAdj.dmg(this.mob, dmg, this.game, null);
  }
  constructor(public mob: Mob,
    public game: GameIF) { }
}


