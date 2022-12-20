import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { MoveCmd } from "./09MoveCmd";
import { HitCmd } from "./11HitCmd";
import { Able } from "./25Able";
import { Act } from "./25Act";

export class MoveBumpCmd extends CmdBase {
  constructor(
    public dir:WPoint, public me:Mob, public g:GameIF
  ) { super(me,g); }  
  
  able(m:Mob, g:GameIF,act:Act):Able { // ch25
    return { able:true, turn:false }
  } // (For MoveBumpCmd, each sub-cmd checks instead.)

  exc():boolean { 
    let g=this.g;
    let m=this.me;
    this.confused(g,this.dir);

    let np = this.dir.plus(m.pos);
    let map = <DMapIF> g.curMap();
    if (!map.legal(np)) { return false; }
    let cell = map.cell(np);     
    let cmd = cell.mob  
      ? new  HitCmd(m,cell.mob,g) 
      : new MoveCmd(this.dir,m,g);
    return cmd.turn();
  }
}
