import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { StairCmd } from "./13StairCmd";

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
    if (legal) { 
      map.moveMob(this.mob,np); 
      if (this.mob.isPly) { // ch13
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
    new StairCmd(dir,this.game).exc();
  }
}
