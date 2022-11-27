import { DMapIF } from "O2model/07DMapIF";
import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { CanSee } from "O4cmds/18CanSee";
import { MobAiIF } from "./10MobAiIF";

export class Sleep2AI implements MobAiIF {
  turn(me:Mob, enemy:Mob, game:GameIF):boolean { 
    if (!Sleep2AI.isNear(me,enemy)) { return true; }

    let map = <DMapIF> game.curMap();
    let canSee = CanSee.canSee2(me,enemy,map,true);
    if (!canSee) { return true; }

    me.mood = game.rnd.oneIn(3) 
      ? Mood.Wake : Mood.Asleep;
    return true;
  }

  static isNear(me:Mob, enemy:Mob):boolean {
    let dist = me.pos.dist(enemy.pos);
    return dist < 6;    
  }
}

