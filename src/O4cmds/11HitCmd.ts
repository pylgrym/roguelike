import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { HealthAdj } from "./11HealthAdj";

export class HitCmd extends CmdBase {
  constructor(
    public me:Mob, public him:Mob, public g:GameIF
  ) { super(me,g); }
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
    let rnd = this.g.rnd;
    let dmg = rnd.rndC(0,3);
    if (dmg == 3) { dmg = 1; }
    
    let s=dmg? `${me} hits ${him} for ${dmg}`
             : `${me} misses ${him}`;
    //console.log(s);
    if (this.me.isPly || this.him.isPly) { // ch12
      this.g.msg(s); // ch12
    }

    //this.him.hp -= dmg;
    HealthAdj.adjust(this.him, -dmg, this.g,this.me);
    return true;
  }
}
