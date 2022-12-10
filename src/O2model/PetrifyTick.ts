import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "O4cmds/11HealthAdj";
import { Mob } from "./09Mob";
import { TickIF } from "./24BuffIF";




export class PetrifyTick implements TickIF {
  tick(time: number): void {
    if (time % 2) { return; }
    let last = this.mob.sinceMove;
    if (last < 2) { return; }
    let r = this.game.rnd;
    let dmg = r.rndC(last, last * 2);
    if (this.mob.isPly) {
      this.game.msg(`ply petrifies! ${dmg}`);
    }
    HealthAdj.dmg(this.mob, dmg, this.game, null);
  }
  constructor(public mob: Mob, public game: GameIF) { }
}
