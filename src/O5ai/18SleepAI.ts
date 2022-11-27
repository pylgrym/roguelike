import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { MobAiIF } from "./10MobAiIF";

export class SleepAI implements MobAiIF {
  turn(me:Mob, enemy:Mob, game:GameIF):boolean { 
    if (SleepAI.isNear(me,enemy)) { 
      me.mood = game.rnd.oneIn(3) 
        ? Mood.Wake : Mood.Asleep;
    }
    return true;
  }

  static isNear(me:Mob, enemy:Mob):boolean {
    let dist = me.pos.dist(enemy.pos);
    return dist < 6;    
  }
}

