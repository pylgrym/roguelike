import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { HealthAdj } from "./11HealthAdj";

export class HitCmd extends CmdBase {
  constructor(
    public me:Mob, public him:Mob, public game:GameIF
  ) { super(); }
  exc():boolean {
    let me = this.me.name, him = this.him.name;
    let rnd = this.game.rnd;
    let dmg:number = this.calcDmg(rnd, this.me); // ch20
    //let dmg = rnd.rndC(0,3);
    //if (dmg == 3) { dmg = 1; }
    let s=dmg? `${me} hits ${him} for ${dmg}`
             : `${me} misses ${him}`;
    if (this.me.isPly || this.him.isPly) { // ch12
      this.game.msg(s); // ch12
    }
    HealthAdj.adjust(this.him,-dmg,this.game,this.me);
    return true;
  }
  calcDmg(rnd:Rnd, me:Mob): number {
    let level = me.level;
    let lim = level+1;
    if (me.isPly) { lim = 3; } 
    let dmg = rnd.rndC(0,lim);
    return dmg;
  }
}
