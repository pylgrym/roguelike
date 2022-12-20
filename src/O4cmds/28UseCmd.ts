import { HealCmd } from './28HealCmd';
import { Glyph } from "O2model/07Glyph";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { CmdIF } from './09CmdIF';
import { PortCmd } from './28PortCmd';
import { Mob } from 'O2model/09Mob';

export class UseCmd extends CmdBase {
  constructor(public obj:Obj, public ix:number,
              public g:GameIF) { 
    super(g.ply,g); 
  }
  exc(): boolean {
    let game = this.g; 
    let obj:Obj = this.obj;
    if (!this.usable(obj)) {return false;}

    game.msg(`You use ${obj.name()}.`);
    let used = this.use(obj,this.me,this.g);
    if (!used) { return false; }

    game.bag!.removeIx(this.ix);
    return true;
  }
  usable(obj:Obj):boolean {
    let canUse = (obj.slot == Slot.NotWorn);
    if (!canUse) {
      this.g.flash(`${obj.name()} is not usable: ${obj.slot}`);
    }
    return canUse;
  }
  use(obj: Obj,me:Mob,g:GameIF):boolean {
    var cmd:CmdIF;
    switch (obj.g) {
      case Glyph.Potion: cmd = new HealCmd(obj.level+4,me,g); break;
      case Glyph.Scroll: cmd = new PortCmd(6,me,g); break;
      default: return false;
    }
    return cmd.raw();
  }
}
