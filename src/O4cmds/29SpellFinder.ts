import { HealCmd } from './28HealCmd';
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from './09CmdIF';
import { PortCmd } from './28PortCmd';
import { BulletCmd } from './27BulletCmd';
import { CmdDirScreen } from 'O6screen/15CmdDirScreen';
import { MakerIF } from 'O6screen/06ScreenMakerIF';
import { SScreenIF } from 'O1term/05SScreenIF';
import { Spell } from './29Spell';
import { CostIF } from './28CostIF';
import { PayloadCmd } from './29PayloadCmd';
import { BuffCmd } from './24BuffCmd';
import { Buff } from 'O2model/24BuffEnum';
import { Mob } from 'O2model/09Mob';
import { CleanseAllCmd } from './29CleanseCmd';
import { MultiplyCmd } from './29MultiplyCmd';
import { SummonCmd } from './29SummonCmd';
import { StackIF } from 'O1term/05ScreenStackIF';
import { BreathCmd } from './30BreathCmd';

export interface CmdOrScreen {
    cmd:CmdIF;
    s:SScreenIF|undefined;
}

export class SpellFinder {
  constructor(public g:GameIF, public ss:StackIF,
              public maker:MakerIF) {}
  find(spell:Spell,cost:CostIF|undefined): CmdIF|SScreenIF|null {
    let g = this.g;
    let me = g.ply;
    let level = 1;
    var s:SScreenIF|undefined;
    var cmd:CmdIF;

    let b = this.buff.bind(this);
    switch (spell) {
    case Spell.Heal:    cmd = new HealCmd(level,me,g); break;
    case Spell.D_Charm:   ({s,cmd}=b(Buff.Charm,   me));break;
    case Spell.D_Slow:    ({s,cmd}=b(Buff.Slow,    me));break;
    case Spell.D_Afraid:  ({s,cmd}=b(Buff.Afraid,  me));break;
    case Spell.Missile: 
      s = this.dir(
        cmd = new BulletCmd(g.ply,g,this.ss,this.maker)
      ); 
      break;
    case Spell.D_Poison:  ({s,cmd}=b(Buff.Poison,  me));break;
    case Spell.D_Confuse: ({s,cmd}=b(Buff.Confuse, me));break;
    case Spell.D_Silence: ({s,cmd}=b(Buff.Silence, me));break;
    case Spell.Cleanse: cmd = new CleanseAllCmd(me,g); break;
    case Spell.D_Stun:    ({s,cmd}=b(Buff.Stun,    me));break;
    case Spell.D_Burn:    ({s,cmd}=b(Buff.Burn,    me));break;
    case Spell.D_Blind:   ({s,cmd}=b(Buff.Blind,   me));break;
    case Spell.Multiply: cmd = new MultiplyCmd(me,g); break;
    case Spell.D_Freeze:  ({s,cmd}=b(Buff.Freeze,  me));break;
    case Spell.D_Root:    ({s,cmd}=b(Buff.Root,    me));break;
    case Spell.D_Shock:   ({s,cmd}=b(Buff.Shock,   me));break;
    case Spell.Port:    cmd = new PortCmd(6,me,g); break;
    case Spell.D_Paralyze:({s,cmd}=b(Buff.Paralyze,me));break;
    case Spell.D_Sleep:   ({s,cmd}=b(Buff.Sleep,   me));break;
    case Spell.D_Petrify: ({s,cmd}=b(Buff.Petrify, me));break;
    case Spell.Summon: cmd = new SummonCmd(me,g); break;
    case Spell.D_Bleed:   ({s,cmd}=b(Buff.Bleed,   me));break;
    case Spell.D_Levitate:({s,cmd}=b(Buff.Levitate,me));break;
    case Spell.D_Disarm:  ({s,cmd}=b(Buff.Disarm,  me));break;
    case Spell.Breath: 
      s = this.dir(
        cmd = new BreathCmd(g.ply,g,this.ss,this.maker)
      ); 
      break;
    default: return null; 
    }
    cmd.setCost(cost);
    return s ? s : cmd;
  }   
  buff(buff:Buff,me:Mob): CmdOrScreen {
    let buffCmd = new BuffCmd(buff,me,this.g,me);
    let {cmd,s} =  this.payload(buffCmd, me);
    return {cmd:cmd,s:s};
  }
  payload(inner:CmdIF,me:Mob):CmdOrScreen {
    let cmd:CmdIF = new PayloadCmd(
      me,this.g,this.ss,this.maker,inner
    );
    let dirScreen:SScreenIF = this.dir(cmd);
    return {cmd:cmd,s:dirScreen};
  }
  dir(cmd:CmdIF):SScreenIF { 
    return new CmdDirScreen(cmd,this.g,this.maker); 
  }
}
 