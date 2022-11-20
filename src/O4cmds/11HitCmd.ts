import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { HealthAdj } from "./11HealthAdj";

export class HitCmd extends CmdBase {
  constructor(
    public me:Mob, public him:Mob, public game:GameIF
  ) { super(); }

  exc0():boolean {
    let me = this.me.name, him = this.him.name;
    let dmg = 1;
    let s = `${me} hits ${him} for ${dmg}`;
    this.him.hp -= dmg;
    console.log(s);
    return true;
  }
  exc():boolean {
    let me = this.me.name, him = this.him.name;
    let rnd = this.game.rnd;
    let dmg = rnd.rndC(0,3);
    if (dmg == 3) { dmg = 1; }
    let s=dmg? `${me} hits ${him} for ${dmg}`
             : `${me} misses ${him}`;
    //this.him.hp -= dmg;
    HealthAdj.adjust(this.him, -dmg, this.game);
    console.log(s);
    return true;
  }
}
