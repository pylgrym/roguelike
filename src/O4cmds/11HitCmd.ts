import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";
import { Worn } from "O2model/23Worn";
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
    
    let rest = (this.him.hp - dmg);
    let s=dmg? `${me} hits ${him} for ${dmg}→${rest}`
             : `${me} misses ${him}`;
    if (this.me.isPly || this.him.isPly) { // ch12
      this.game.msg(s); // ch12
    }
    HealthAdj.adjust(this.him,-dmg,this.game,this.me);
    return true;
  }
  calcDmg(rnd:Rnd, me:Mob): number {
    return rnd.rndC(0,this.power(me));
  }
  power(me:Mob):number {
    return me.isPly ? this.ply_Power(me) : this.NPC_Power(me);
  }
  NPC_Power(m:Mob):number{ return m.level+1; }
  unarmed():number { return 3; } 
  ply_Power(ply:Mob):number {
    let g = this.game;
    if (g.worn) { return this.wornPower(g,g.worn); }
    return this.unarmed();
  }
  wornPower(g:GameIF,w:Worn):number {
    return w.weapon() ? w.weaponDmg() : this.unarmed();
  }
}
