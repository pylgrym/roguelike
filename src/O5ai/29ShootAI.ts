import { StackIF } from "O1term/05ScreenStackIF";
import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { CmdBase } from "O4cmds/09CmdBase";
import { CanSee } from "O4cmds/18CanSee";
import { CostIF } from "O4cmds/28CostIF";
import { NPCSpellFinder } from "O4cmds/29NPCSpellFinder";
import { Spell } from "O4cmds/29Spell";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";
import { SleepAI } from "./18SleepAI";

export class ShootAI implements MobAiIF {
  constructor(public speed:number, 
              public spellRate:number) {}  
  aiDir:MobAiIF = new MobAI2_cat();
  aiRnd:MobAiIF = new MobAI3_ant();
  turn(me:Mob, enemy:Mob, g:GameIF,ss:StackIF, maker:MakerIF):boolean {
    let r = g.rnd; 
    let far = SleepAI.isNear(me,enemy);
    if (far) { 
      me.mood = 
        r.oneIn(3) ? Mood.Asleep : Mood.Wake;
      if (me.mood == Mood.Asleep) {
        return true;
      } // if mob now sleeps, don't do more.
    }   
    if (this.didShoot(me,r,g,enemy)) {
      return true;
    }
    if (this.maybeCastSpell(me,enemy,g,ss,maker)) {
      return true;
    }
    for (let i=0;i<this.speed;++i) {
      var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
      ai.turn(me,enemy,g,ss,maker);
    }
    return true;
  }
  didShoot(me:Mob,r:Rnd,g:GameIF,enemy:Mob):boolean {
    if (!this.aim()) { return false; }
    let spell = this.pickSpell(me,r);
    if (!this.isMissileSpell(spell)) {return false; }
    if (!r.oneIn(this.spellRate)) { return false; }
    let map = <DMapIF> g.curMap();
    if (!CanSee.canSee2(me,enemy,map,true)) { return false; }
    return this.shoot();
  }
  aim() { return false; } // todo: check 8 dirs.
  shoot(): boolean { return true; } //todo, do the actual shot.
  isMissileSpell(s:Spell) { return s == Spell.Missile; }

  maybeCastSpell(me:Mob, enemy:Mob, game:GameIF,
                 ss:StackIF, maker:MakerIF):boolean 
  {
    let map = <DMapIF> game.curMap();
    if (!CanSee.canSee2(me,enemy,map,true)) { return false; }

    let r = game.rnd; 
    if (!r.oneIn(this.spellRate)) { return false; }
    //let buff = this.pickBuff(me, r);
    //return this.castBuff(buff,me,enemy,game);
    let spell = this.pickSpell(me, r);
    return this.castSpell(spell,me,enemy,game,ss,maker);
  }
  pickSpell(me:Mob, r:Rnd):Spell { 
    // 'None' is last buff:
    let range:number = (Spell.None)+1; 
    // Clip levels to spell-range:
    let spellIx:number = me.level % range;
    // Pick the Spell at <SpellIx> offset:
    let spell:Spell = <Spell> spellIx;
    console.log(`${me.name} spell: ${spell}`);
    return spell; 
  }
  castSpell(spell:Spell, me:Mob, 
    enemy:Mob, game:GameIF,
    ss:StackIF, maker:MakerIF):boolean 
  {
    // We probably should pass enemy to spell-finder:
    // (so we can attack someone other than the player.)
    let finder = new NPCSpellFinder(game,ss,maker);
    let noCost:CostIF|undefined = undefined;
    let CoS = finder.find(me,spell,noCost);
    if (CoS instanceof CmdBase) {
        return CoS.npcTurn();
    }
    return true;
  }
}
