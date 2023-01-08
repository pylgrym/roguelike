import { Mob } from "O2model/09Mob";
import { Buff } from "O2model/24BuffEnum";
import { BuffIF, TickIF } from "O2model/24BuffIF";
import { BleedTick } from "O2model/BleedTick";
import { BurnTick } from "O2model/BurnTick";
import { FreezeTick } from "O2model/FreezeTick";
import { PetrifyTick } from "O2model/PetrifyTick";
import { PoisonTick } from "O2model/PoisonTick";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class BuffCmd extends CmdBase {
  constructor(public buff:Buff, 
              public tgt:Mob, 
              g:GameIF,me:Mob){ super(me,g); }
  exc():boolean {
    // ch25:
    let m = this.mob, g = this.g;
    let effect:TickIF|undefined = undefined;
    switch (this.buff) {
      case Buff.Poison: effect = new PoisonTick(m,g); break;
      case Buff.Burn:   effect = new BurnTick(m,g);   break;
      case Buff.Freeze: effect = new FreezeTick(m,g); break;
      case Buff.Bleed:  effect = new BleedTick(m,g);  break;
      case Buff.Petrify:effect = new PetrifyTick(m,g);break;
    }  
    let active:BuffIF = { 
      buff:this.buff, time:8,  effect:effect
    }; 
    this.addBuffToMob(active,this.g,this.tgt);
    return true;
  }
  addBuffToMob(active:BuffIF, 
               game:GameIF, mob:Mob) {
    if (mob.isPly || this.me.isPly) {
      let who = mob.name;
      let what:string = Buff[active.buff];
      let by = this.me.name;
      game.msg(`${who} is ${what} by ${by}`);
    }
    mob.buffs.add(active,game,mob);
  }

}
