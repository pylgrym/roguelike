import { HealCmd } from './28HealCmd';
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from './09CmdIF';
import { PortCmd } from './28PortCmd';
import { MakerIF } from 'O6screen/06ScreenMakerIF';
import { SScreenIF } from 'O1term/05SScreenIF';
import { Spell } from './29Spell';
import { CostIF } from './28CostIF';
import { BuffCmd } from './24BuffCmd';
import { Buff } from 'O2model/24BuffEnum';
import { Mob } from 'O2model/09Mob';
import { CleanseAllCmd } from './29CleanseCmd';
import { MultiplyCmd } from './29MultiplyCmd';
import { SummonCmd } from './29SummonCmd';
import { StackIF } from 'O1term/05ScreenStackIF';
import { BulletCmd } from './27BulletCmd';
import { BreathCmd } from './30BreathCmd';

export class NPCSpellFinder {
  ply:Mob;
  constructor(public g:GameIF, public ss:StackIF,
              public maker:MakerIF) 
  { this.ply = g.ply; }
  find(me:Mob,spell:Spell,cost:CostIF|undefined): 
    CmdIF|SScreenIF|null 
  {
    let g = this.g;
    let level = 1;
    var s:SScreenIF|undefined;
    var cmd:CmdIF;
    let b=this.buff.bind(this);
    switch (spell) {
    case Spell.Heal:    cmd = new HealCmd(level,me,g); break;
    case Spell.D_Charm:   cmd=b(me,Buff.Charm    ); break;
    case Spell.D_Slow:    cmd=b(me,Buff.Slow     ); break;
    case Spell.D_Afraid:  cmd=b(me,Buff.Afraid   ); break;
    case Spell.Missile: 
      cmd=this.aim(new BulletCmd(me,g,this.ss,this.maker)); 
      break;
    case Spell.D_Poison:  cmd=b(me,Buff.Poison   ); break;
    case Spell.D_Confuse: cmd=b(me,Buff.Confuse  ); break;
    case Spell.D_Silence: cmd=b(me,Buff.Silence  ); break;
    case Spell.Cleanse: cmd = new CleanseAllCmd(me,g); break;
    case Spell.D_Stun:    cmd=b(me,Buff.Stun     ); break;
    case Spell.D_Burn:    cmd=b(me,Buff.Burn     ); break;
    case Spell.D_Blind:   cmd=b(me,Buff.Blind    ); break;
    case Spell.Multiply: cmd = new MultiplyCmd(me,g); break;
    case Spell.D_Freeze:  cmd=b(me,Buff.Freeze   ); break;
    case Spell.D_Root:    cmd=b(me,Buff.Root     ); break;
    case Spell.D_Shock:   cmd=b(me,Buff.Shock    ); break;
    case Spell.Port:    cmd = new PortCmd(6,me,g); break;
    case Spell.D_Paralyze:cmd=b(me,Buff.Paralyze ); break;
    case Spell.D_Sleep:   cmd=b(me,Buff.Sleep    ); break;
    case Spell.D_Petrify: cmd=b(me,Buff.Petrify  ); break;
    case Spell.Summon: cmd = new SummonCmd(me,g); break;
    case Spell.D_Bleed:   cmd=b(me,Buff.Bleed    ); break;
    case Spell.D_Levitate:cmd=b(me,Buff.Levitate ); break;
    case Spell.D_Disarm:  cmd=b(me,Buff.Disarm   ); break;
    case Spell.Breath: 
      cmd = this.aim(
        new BreathCmd(me,g,this.ss,this.maker)
      ); 
      break;
    default: return null; 
    }
    cmd.setCost(cost);
    return s ? s : cmd;
  }   
  aim(cmd:CmdIF): CmdIF {
    let dir = cmd.me.pos.dir(this.ply.pos);
    return cmd.setDir(dir);
  }
  buff(me:Mob,buff:Buff): CmdIF {
    return new BuffCmd(buff,this.ply,this.g,me);
  }
 }
