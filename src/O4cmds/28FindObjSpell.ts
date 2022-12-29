import { HealCmd } from './28HealCmd';
import { Glyph } from "O2model/07Glyph";
import { Obj } from "O2model/21Obj";
import { Slot } from "O2model/21Slot";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from './09CmdIF';
import { PortCmd } from './28PortCmd';
import { Stack } from 'O1term/05ScreenStack';
import { BulletCmd } from './27BulletCmd';
import { CmdDirScreen } from 'O6screen/15CmdDirScreen';
import { MakerIF } from 'O6screen/06ScreenMakerIF';
import { ChargedItemCost1 } from './28ItemCost';
import { SScreenIF } from 'O1term/05SScreenIF';
import { Spell } from './29Spell';
import { SpellFinder } from './29SpellFinder';

export class FindObjSpell {
  constructor(public obj:Obj, public ix:number,
              public g:GameIF, public ss:Stack,
              public maker:MakerIF) {}

  usable28(obj:Obj):boolean {
    let canUse = (obj.slot == Slot.NotWorn);
    if (!canUse) {
      this.g.flash(`${obj.name()} is not usable: ${obj.slot}`);
    }
    return canUse;
  }

  usable29(obj:Obj,g:GameIF):boolean {
    let canUse = (obj.spell != Spell.None);
    if (!canUse) {
      g.flash(`${obj.name()} is not usable: ${obj.slot}`);
    }
    return canUse;
  }

  find29(): CmdIF|SScreenIF|null {
    let g=this.g;
    let obj:Obj = this.obj;
    if (!this.usable29(obj,g)) {return null;}
    let finder = new SpellFinder(g,this.ss,this.maker);
    let cost = new ChargedItemCost1(g,this.obj,this.ix);
    return finder.find(obj.spell,cost);
  }
 
  find28(): CmdIF|SScreenIF|null {
    let obj:Obj = this.obj;
    if (!this.usable28(obj)) {return null;}

    let g = this.g;
    let me = g.ply;
    var s:SScreenIF|undefined;
    var cmd:CmdIF|undefined;

    switch (obj.g) {
    case Glyph.Potion: 
      cmd = new HealCmd(obj.level+4,me,g); break;
    case Glyph.Scroll: 
      cmd = new PortCmd(6,me,g); break;
    case Glyph.Wand:   
      cmd = new BulletCmd(g.ply,g,this.ss,this.maker);
      s = new CmdDirScreen(cmd,g,this.maker); 
      break;
    default: 
      return null; 
    }
    cmd.setCost(new ChargedItemCost1(g,this.obj,this.ix));
    return s ? s : cmd;
  }   
}


 