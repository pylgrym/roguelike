import { DMapIF } from "O2model/07DMapIF";
import { Bag } from "O2model/22Bag";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class PickupCmd extends CmdBase { 
  constructor(public game:GameIF) { super(); }   
	exc():boolean { 
    let game = this.game; 
    let map = <DMapIF> game.curMap();
    let ply = game.ply;
    let bag = <Bag>game.bag;
    let c = map.cell(ply.pos);
    let obj = c.obj;
    if (!obj) { 
      game.flash('Nothing to get here.');
      return false;
    }       
    c.obj = undefined; // Remove from floor.
    bag.add(obj); // Put into bag instead. 
    let msg = `ply gets ${obj.desc()}.`;    
    game.flash(msg);
    return true;
  }
}
