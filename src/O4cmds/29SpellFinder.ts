import { HealCmd } from './28HealCmd';
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from './09CmdIF';
import { PortCmd } from './28PortCmd';
import { Stack } from 'O1term/05ScreenStack';
import { BulletCmd } from './27BulletCmd';
import { CmdDirScreen } from 'O6screen/15CmdDirScreen';
import { MakerIF } from 'O6screen/06ScreenMakerIF';
import { SScreenIF } from 'O1term/05SScreenIF';
import { Spell } from './29Spell';
import { CostIF } from './28CostIF';

export class SpellFinder {
  constructor(public g:GameIF, public ss:Stack,
              public maker:MakerIF) {}

  find(spell:Spell,cost:CostIF|undefined): CmdIF|SScreenIF|null {
    let g = this.g;
    let me = g.ply;
    let level = 1;
    var s:SScreenIF|undefined;
    var cmd:CmdIF|undefined;

    switch (spell) {
    case Spell.Heal: cmd = new HealCmd(level,me,g); break;
    case Spell.Port: cmd = new PortCmd(6,me,g); break;
    case Spell.Missile:   
      cmd = new BulletCmd(g.ply,g,this.ss,this.maker);
      s = new CmdDirScreen(cmd,g,this.maker); 
      break;
    default: return null; 
    }
    cmd.setCost(cost);
    return s ? s : cmd;
  }   
}
