import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "O4cmds/11HealthAdj";
import { Mob } from "./09Mob";
import { TickIF } from "./24BuffIF";


export class FreezeTick implements TickIF {
  tick(time: number): void {
    if (time % 2) { return; }
    if (this.mob.sinceMove < 2) { return; }
    let g = this.game;
    let r = g.rnd;
    let dmg = r.rndC(0, 2);
    if (this.mob.isPly) {
      g.msg(`ply feels cold! ${dmg}`);
    }
    HealthAdj.dmg(this.mob, dmg, g, null);
  }
  constructor(public mob: Mob, public game: GameIF) { }
}
