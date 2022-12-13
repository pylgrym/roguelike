import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { StairCmd } from "./13StairCmd";

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
    //if (legal) { map.moveMob(this.me,np); }
    if (legal) { 
      map.moveMob(this.me,np); 
      if (this.me.isPly) { // ch13
        this.dealWithStairs(map,np);
      }
    }
    return legal;
  }  
  // ch13:
  dealWithStairs(map:DMapIF, np:WPoint):void { 
    var dir:number;
    switch (map.cell(np).env) {
      case Glyph.StairsDown: dir= 1;break;
      case Glyph.StairsUp:   dir=-1;break;
      default: return; // No stairs here.
    }
    new StairCmd(dir,this.g).exc();
  }
}
