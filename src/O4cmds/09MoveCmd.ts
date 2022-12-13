import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class MoveCmd extends CmdBase {
  constructor(
    public dir:WPoint, public me:Mob, public g:GameIF
  ) { super(me,g); }
  
  exc0():boolean { 
    let map = <DMapIF> this.g.curMap();
    let np = this.dir.plus(this.me.pos);
    map.moveMob(this.me,np); 
    return true;
  }
  
  exc():boolean { 
    let map = <DMapIF> this.g.curMap();
    let np = this.dir.plus(this.me.pos);
    let legal = !map.blocked(np);
    if (legal) { map.moveMob(this.me,np); }
    return legal;
  }  
}
