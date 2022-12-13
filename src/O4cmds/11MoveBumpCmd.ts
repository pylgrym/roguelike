import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { MoveCmd } from "./09MoveCmd";
import { HitCmd } from "./11HitCmd";

export class MoveBumpCmd extends CmdBase {
  constructor(
    public dir:WPoint, public me:Mob, public g:GameIF
  ) { super(me,g); }  
  exc():boolean { 
    let np = this.dir.plus(this.me.pos);
    let map = <DMapIF> this.g.curMap();
    if (!map.legal(np)) { return false; }
    let cell = map.cell(np);           
    return cell.mob  
      ? new  HitCmd(this.me,cell.mob,this.g).exc() 
      : new MoveCmd(this.dir,this.me,this.g).exc();
  }
}
