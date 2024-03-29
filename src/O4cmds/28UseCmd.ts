import { HealCmd } from './28HealCmd';
import { Glyph } from "O2model/07Glyph";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "./09CmdBase";
import { CmdIF } from './09CmdIF';
import { PortCmd } from './28PortCmd';
import { Mob } from 'O2model/09Mob';
import { BulletCmd } from './27BulletCmd';
import { CmdDirScreen } from 'O6screen/15CmdDirScreen';
import { MakerIF } from 'O6screen/06ScreenMakerIF';
import { ChargedItemCost1 } from './28ItemCost';
import { StackIF } from 'O1term/05ScreenStackIF';

export class UseCmd extends CmdBase {
  constructor(public obj:Obj, public ix:number,
              public g:GameIF, public ss:StackIF,
              public maker:MakerIF) { 
    super(g.ply,g); 
  }

  usable(obj:Obj):boolean {
    let canUse = (obj.slot == Slot.NotWorn);
    if (!canUse) {
      this.g.flash(`${obj.name()} is not usable: ${obj.slot}`);
    }
    return canUse;
  }

  exc(): boolean {
    let game = this.g; 
    let obj:Obj = this.obj;
    if (!this.usable(obj)) {return false;}

    let didTurn = this.useObj(obj,this.me,this.g);
    if (didTurn) { 
      game.bag!.removeIx(this.ix);
    }
    return didTurn; // if we did a turn, it must run npcLoop.
  }
  
  useObj(obj: Obj,me:Mob,g:GameIF):boolean {
    var cmd:CmdIF;
    switch (obj.g) {
      case Glyph.Potion: cmd = new HealCmd(obj.level+4,me,g); break;
      case Glyph.Scroll: cmd = new PortCmd(6,me,g); break;
      case Glyph.Wand: return this.useZapItem(g); break;
      default: return false;
    }

    g.msg(`You use ${obj.name()}.`);
    return cmd.turn(); // these would be actual turns.
  }
  useZapItem(g:GameIF): boolean {
    let zap = new BulletCmd(g.ply,g,this.ss,this.maker); // (maker is because we'll be running screens.)
    zap.setCost(new ChargedItemCost1(g,this.obj,this.ix));
    let dir = new CmdDirScreen(zap,g,this.maker); 
    this.ss.pop(); // pop the old.
    this.ss.push(dir);
    return false; // this was not a turn.
  }
}





export class UseCmd0 extends CmdBase {
  constructor(public obj:Obj, public ix:number,
              public g:GameIF) { 
    super(g.ply,g); 
  }
  exc(): boolean { return false; }
}
