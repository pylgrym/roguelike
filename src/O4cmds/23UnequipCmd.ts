import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { Worn } from "O2model/23Worn";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class UnequipCmd extends CmdBase {
  constructor(public slot:Slot,
              public g:GameIF) { super(g.ply,g); }
  exc(): boolean {
    let slot = this.slot;
    if (slot == Slot.NotWorn) { return false; }
    let game = this.g;
    let worn = <Worn> game.worn;
    if (!worn.has(slot)) {
      let label:string = Slot[slot];
      let s = `${label} not WORN (${slot})`;
      game.flash(s); return false;
    }  
    let o:Obj|undefined = worn.get(slot);
    if (!o) { throw `no item ${slot}?`;}
    worn.remove(slot); 
    game.bag!.add(o);  
    game.msg(`ply removes ${o.desc()}`);  
    return true;
  }
}
