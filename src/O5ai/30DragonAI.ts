import { StackIF } from "O1term/05ScreenStackIF";
import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "O4cmds/09CmdBase";
import { CanSee } from "O4cmds/18CanSee";
import { CostIF } from "O4cmds/28CostIF";
import { PortCmd } from "O4cmds/28PortCmd";
import { NPCSpellFinder } from "O4cmds/29NPCSpellFinder";
import { Spell } from "O4cmds/29Spell";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";
import { SleepAI } from "./18SleepAI";

export class DragonAI implements MobAiIF {
  constructor(public speed:number,
              public spellRate:number) {}
  aiDir:MobAiIF = new MobAI2_cat();
  aiRnd:MobAiIF = new MobAI3_ant();
  turn(me:Mob, enemy:Mob, g:GameIF,
       ss:StackIF, maker:MakerIF):boolean {
    let r = g.rnd; 
    if (DragonAI.isNear(2,me,enemy)) {
      if (r.oneIn(3)) { return this.port(5,me,g); }
    } // if ply is near, often port away.

    // should dragons even sleep?
    let far = !SleepAI.isNear(me,enemy); 
    if (far) { 
      me.mood = 
        r.oneIn(3) ? Mood.Asleep : Mood.Wake;
      if (me.mood == Mood.Asleep) {
        return true;
      } // if mob now sleeps, don't do more.
    }
    let lineOfFire = this.aim(me.pos,enemy.pos);
    if (lineOfFire) {
      let act = r.rndC(0,2);
      console.log('dragon LOF reaction',act);
      switch (act) {
      default: break; // ignore it.
      case 0: return this.port(5,me,g);// flee
      case 1: return this.shoot(
                Spell.Breath,me,enemy,g,ss,maker
              ); 
      }
    }
    
    if (this.didBreathe(me,r,g,enemy,ss,maker)) {
      console.log('dragon breathed');
      return true;
    }
    if (this.maybeCastSpell(me,enemy,g,ss,maker)) {
      console.log('dragon used spell');
      return true;
    }
    for (let i=0;i<this.speed;++i) {
      console.log('dragon moved', ++this.moveIx);
      var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
      ai.turn(me,enemy,g,ss,maker);
    }
    return true;
  }
  moveIx:number = 1;
  port(rad: number,me:Mob,g:GameIF): boolean {
    console.log('dragon ports');
    return new PortCmd(rad,me,g).npcTurn();
  }
  static isNear(limit:number, me:Mob, enemy:Mob):boolean {
    let dist = me.pos.dist(enemy.pos);
    return dist < limit;    
  }

  maybeCastSpell(me:Mob, enemy:Mob, game:GameIF,
                 ss:StackIF, maker:MakerIF):boolean
  {
    let map = <DMapIF> game.curMap();
    if (!CanSee.canSee2(me,enemy,map,true)) { return false; }

    let r = game.rnd; 
    if (!r.oneIn(this.spellRate)) { return false; }
    let spell = this.pickSpell(me, r);
    return this.castSpell(spell,me,enemy,game,ss,maker);
  }
  pickSpell(me:Mob, r:Rnd):Spell {
    // 'None' is last buff:
    let range:number = (Spell.None)+1;   
    // dragons can cast ALL spells:
    let spellIx:number = r.rndC(0,range);
    // Pick the Spell at <SpellIx> offset:
    let spell:Spell = <Spell> spellIx;
    console.log(`${me.name} spell: ${Spell[spell]}`);
    return spell; 
  }
  castSpell(spell:Spell, me:Mob,
    enemy:Mob, game:GameIF,
    ss:StackIF, maker:MakerIF):boolean
  {
    let finder = new NPCSpellFinder(game,ss,maker);
    let noCost:CostIF|undefined = undefined;
    let CoS = finder.find(me,spell,noCost);
    if (CoS instanceof CmdBase) {
      console.log('CB', CoS);
      return CoS.npcTurn();
    }
    console.log('CS');
    return true;
  }
  didBreathe(me:Mob,r:Rnd,g:GameIF,him:Mob,
           ss:StackIF,maker:MakerIF):boolean {
    if (!this.aim(me.pos,him.pos)) { return false; }
    if (!r.oneIn(this.spellRate)) { return false; }
    let map = <DMapIF> g.curMap();
    if (!CanSee.canSee2(me,him,map,true)) { return false; }
    let didShoot = this.shoot(Spell.Breath,me,him,g,ss,maker);
    console.log('didSh?', didShoot);
    return  didShoot;
  }
  aim(m:WPoint,e:WPoint) {
    let d = m.minus(e);
    if (d.x==0 || d.y==0) { return true; } // on axis.
    let ax = Math.abs(d.x), ay = Math.abs(d.y);
    return (ax==ay);// diagonal.
  } // check 8 dirs.
  isMissileSpell(s:Spell) { return s == Spell.Missile; }
  shoot(spell:Spell,me:Mob,enemy:Mob,g:GameIF,
        ss:StackIF,maker:MakerIF): boolean { 
    this.castSpell(spell,me,enemy,g,ss,maker);
    return true;
  } 
}
