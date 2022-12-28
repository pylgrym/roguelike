import { GameIF } from "O3build/08GameIF";
import { MultiplyCmd } from "./29MultiplyCmd";
import { WPoint } from "O2model/07WPoint";
import { DMapIF } from "O2model/07DMapIF";

export class SummonCmd extends MultiplyCmd {
  spawnMob(p:WPoint,map:DMapIF,g:GameIF) {
    let m = this.me;
    let s = g.build.addMapLevel_Mob(p,map,g.rnd);    
    g.msg(`${m.name} summons ${s.name}`);
  }
}
