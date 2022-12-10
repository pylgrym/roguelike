import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "O4cmds/11HealthAdj";
import { Mob } from "./09Mob";
import { TickIF } from "./24BuffIF";


export class BurnTick implements TickIF {
  tick(time: number): void {
    if (time % 2) { return; }
    let g = this.game;
    let dmg = g.rnd.rndC(2, 4);
    if (this.mob.isPly) {
      g.msg(`ply burns! ${dmg}`);
    }
    HealthAdj.dmg(this.mob, dmg, g, null);
  }
  constructor(public mob: Mob, public game: GameIF) { }
}




