import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";

export class UseCmd extends CmdBase {
  constructor(public obj:Obj, public ix:number,
              public g:GameIF) { 
    super(g.ply,g); 
  }
  exc(): boolean {
    let game = this.g; 
    let obj:Obj = this.obj;
    if (!this.usable(obj)) {return false;}

    game.bag!.removeIx(this.ix);
    game.msg(`You use ${obj.name()}.`);
    return true;
  }
  usable(obj:Obj):boolean {
    let canUse = (obj.slot == Slot.NotWorn);
    if (!canUse) {
      this.g.flash(`${obj.name()} is not usable: ${obj.slot}`);
    }
    return canUse;
  }
}
