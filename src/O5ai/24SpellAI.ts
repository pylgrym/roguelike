// from 18WakeAI
export class SpellAI implements MobAiIF {
  constructor(public speed:number, 
              public spellRate:number) {}
  ..
  turn(me:Mob, enemy:Mob, game:GameIF):boolean {
    if (this.maybeCastSpell(me,enemy,game)) {
        return true;
    }
    let r = game.rnd; 
    for (let i=0;i<this.speed;++i) {
      var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
      ai.turn(me,enemy,game);
    }
    let far = AsleepAI.isNear(me,enemy);
    if (far) { 
        me.mood = 
            r.oneIn(3) ? Mood.Asleep : Mood.Wake;
    }    
    return true;
  }

  maybeCastSpell(me:Mob, enemy:Mob, game:GameIF):boolean {
    let map = <DMapIF> game.curMap();
    if (!CanSee.canSee2(me,enemy,map,true)) { return false; }

      let r = game.rnd; 
      if (!r.oneIn(this.spellRate)) { return false; }
      let buff = this.pickBuff(me, r);
      return this.cast(buff,me,enemy,game);
  }

  pickBuff(me:Mob, r:Rnd):Buff { return Buff.Confuse; }
  
    cast(buff:number, me:Mob, 
         enemy:Mob, game:GameIF):boolean {
      let spell = new BuffCmd(buff,enemy,game);
      return spell.exc();
    }
