import { GameIF } from "O3build/08GameIF";
import { MultiplyCmd } from "./29MultiplyCmd";
import { WPoint } from "O2model/07WPoint";
import { DMapIF } from "O2model/07DMapIF";
import { BuildIF3 } from "O3build/29BuildIF3";

export class SummonCmd extends MultiplyCmd {
  spawnMob(p:WPoint,map:DMapIF,g:GameIF) {
    let m = this.me;
    let b = <BuildIF3> g.build;
    let s = b.addMapLevel_Mob(p,map,g.rnd);    
    g.msg(`${m.name} summons ${s.name}`);
  }
}
