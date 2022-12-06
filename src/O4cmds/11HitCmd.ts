import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";
import { Worn } from "O2model/23Worn";
import { Buff } from "O2model/24BuffEnum";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { HealthAdj } from "./11HealthAdj";
import { Act } from "./25Act";

export class HitCmd extends CmdBase {
  act:Act = Act.Hit; // ch25.

  constructor(
    public me:Mob, public him:Mob, public game:GameIF
  ) { super(); }
  exc():boolean {
    let g=this.game;
    let me = this.me.name, him = this.him.name;
    let rnd = g.rnd;
    let dmg:number = this.calcDmg(rnd, this.me); // ch20
    let rest = (this.him.hp - dmg);
    let s=dmg? `${me} hits ${him} for ${dmg}→${rest}`
             : `${me} misses ${him}`;
    if (this.me.isPly || this.him.isPly) { // ch12
      g.msg(s); // ch12
    }
    HealthAdj.adjust(this.him,-dmg,g,this.me);
    this.clearCharm(g); // ch25
    return true;
  }
  clearCharm(g:GameIF) { // ch25
    let h = this.him;
    if (!h.is(Buff.Charm)) { return; }
    h.buffs.cleanse(Buff.Charm, this.game, h);
    if (h.isPly) {
      let s = 'the charm wears off!';
      g.msg(s);
    }
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
