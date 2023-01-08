import { Mob } from "O2model/09Mob";
import { Buff } from "O2model/24BuffEnum";
import { BuffIF, TickIF } from "O2model/24BuffIF";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class BuffCmd extends CmdBase {
  constructor(public buff:Buff, 
              public tgt:Mob, 
              g:GameIF,me:Mob){ super(me,g); }
  exc():boolean {
    let effect:TickIF|undefined = undefined;
    switch (this.buff) {
      //case Buff.Poison: effect = new PoisonTick(m,g); break;
    }
    let active:BuffIF = { 
      buff:this.buff, time:8,  effect:effect
    }; 
    this.addBuffToMob(active,this.g,this.tgt);
    return true;
  }
  addBuffToMob(active:BuffIF, 
               game:GameIF, mob:Mob) {
    mob.buffs.add(active,game,mob);
  }

}
