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
    public me:Mob, public him:Mob, public g:GameIF
  ) { super(me,g); }
  exc():boolean { // ch25
    let g=this.g;
    let m=this.me;
    let r = g.rnd;

    let dmg:number = this.calcDmg(r,m); // ch20
    let back:number=0;
    if (m.is(Buff.Shock) && r.oneIn(2)) {
      dmg = this.shockDmg(dmg);
      back = r.rndC(2,3);
    }

    let me = m.name, him = this.him.name;
    this.doDmg(dmg,this.him,m,g,me,him);
    if (back>0) {
      this.doDmg(back,m,m,g,'SHOCK',me);
    }

    this.clearCharm(g); // ch25
    return true;
  }
  shockDmg(dmg:number): number { 
    return Math.floor(dmg*3/2); 
  }
  doDmg(dmg:number,tgt:Mob, atk:Mob, g:GameIF, 
        me:string,him:string) {
    let rest = (tgt.hp - dmg);
    let s=dmg? `${me} hits ${him} for ${dmg}→${rest}`
             : `${me} misses ${him}`;  
    if (atk.isPly || tgt.isPly) {
      g.msg(s);  
    }
    if (dmg) { 
      HealthAdj.adjust(tgt,-dmg,g,atk);
    }
  }
  clearCharm(g:GameIF) { // ch25
    let h = this.him;
    if (!h.is(Buff.Charm)) { return; }
    h.buffs.cleanse(Buff.Charm, this.g, h);
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
    let g = this.g;
    if (g.worn) { return this.wornPower(g,g.worn); }
    return this.unarmed();
  }
  wornPowerPre25(g:GameIF,w:Worn):number {
    return w.weapon() ? w.weaponDmg() : this.unarmed();
  }
  // ch25
  wornPower(g:GameIF,w:Worn): number {
    let disarm = g.ply.is(Buff.Disarm);
    if (w.weapon()) {
      if (disarm) {
        g.msg('ply hits bare-handed.');
      } else {
        return w.weaponDmg();
      }
    } 
    return this.unarmed();
  }
}
