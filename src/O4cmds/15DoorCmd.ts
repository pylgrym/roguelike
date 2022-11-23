import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { CmdIF } from "./09CmdIF";

export class DoorCmd extends CmdBase {
  dir:WPoint = new WPoint();
  constructor(public m:Mob, public game:GameIF){
    super();
  }
  setDir(dir:WPoint):CmdIF { 
    this.dir = dir; return this; 
  }
  exc():boolean {
    let p = this.m.pos;
    let door = p.plus(this.dir);
    let map = <DMapIF>this.game.curMap();
    let cell = map.cell(door);        
    switch (cell.env) {
    case Glyph.Door_Closed: 
      cell.env=Glyph.Door_Open;   break;
    case Glyph.Door_Open: 
      cell.env=Glyph.Door_Closed; break;
    default: 
      this.game.flash(`No door here!`); 
      return false;
    }
    this.msg(cell.env);
    return true;
  }
  msg(env:Glyph) {
    let open = (env == Glyph.Door_Open);
    let action = open ? 'opens': 'closes';
    let who = this.m.name;
    this.game.msg(`${who} ${action} the door`);
  }  
}
