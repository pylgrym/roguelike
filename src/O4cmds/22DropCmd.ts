import { DMapIF } from "O2model/07DMapIF";
import { Obj } from "O2model/21Obj";
import { Bag } from "O2model/22Bag";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class DropCmd extends CmdBase {
  constructor(public obj:Obj, public ix:number, 
              public game:GameIF) { super(); }
  exc(): boolean {
    let game = this.game;
    let map = <DMapIF>game.curMap();
    let ply = game.ply;
    let c = map.cell(ply.pos);
    if (c.hasObj()) { 
      game.flash('No room to drop here.');
      return false;
    }
    c.obj = this.obj;
    let bag = <Bag>game.bag;
    bag.removeIx(this.ix);
    game.msg(`You drop ${c.obj.name}.`);
    return true;
  }
}
