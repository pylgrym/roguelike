import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "O4cmds/11HealthAdj";
import { Mob } from "./09Mob";
import { TickIF } from "./24BuffIF";



export class BleedTick implements TickIF {
  tick(time: number): void {
    if (time % 2) { return; }
    let move = this.mob.sinceMove;
    let r = this.game.rnd;;
    let dmg = (move > 1) ? 1 : r.rndC(2, 5);
    if (this.mob.isPly) {
      this.game.msg(`ply bleeds! ${dmg}`);
    }
    HealthAdj.dmg(this.mob, dmg, this.game, null);
  }
  constructor(public mob: Mob, public game: GameIF) { }
}
