import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { MoveCmd } from "./09MoveCmd";
import { HitCmd } from "./11HitCmd";

export class MoveBumpCmd extends CmdBase {
  constructor(
    public dir:WPoint, public mob:Mob, public game:GameIF
  ) { super(); }  
  exc():boolean { 
    let np = this.dir.plus(this.mob.pos);
    let map = <DMapIF> this.game.curMap();
    if (!map.legal(np)) { return false; }
    let cell = map.cell(np);           
    return cell.mob  
      ? new  HitCmd(this.mob,cell.mob,this.game).exc() 
      : new MoveCmd(this.dir,this.mob,this.game).exc();
  }
}
