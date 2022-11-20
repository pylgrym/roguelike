import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class MoveCmd extends CmdBase {
  constructor(
    public dir:WPoint, public mob:Mob, public game:GameIF
  ) { super(); }
  
  exc0():boolean { 
    let map = <DMapIF> this.game.curMap();
    let np = this.dir.plus(this.mob.pos);
    map.moveMob(this.mob,np); 
    return true;
  }
  
  exc():boolean { 
    let map = <DMapIF> this.game.curMap();
    let np = this.dir.plus(this.mob.pos);
    let legal = !map.blocked(np);
    if (legal) { map.moveMob(this.mob,np); }
    return legal;
  }  
}
