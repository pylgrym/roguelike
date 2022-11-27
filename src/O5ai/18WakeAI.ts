import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";
import { SleepAI } from "./18SleepAI";

export class WakeAI implements MobAiIF {
  aiDir:MobAiIF = new MobAI2_cat();
  aiRnd:MobAiIF = new MobAI3_ant();
  turn(me:Mob, enemy:Mob, game:GameIF):boolean { 
    let r = game.rnd; 
    for (let i=0;i<2;++i) {
      var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
      ai.turn(me,enemy,game);
    }
    let far = SleepAI.isNear(me,enemy);    
    if (far) { me.mood = r.oneIn(3) ? Mood.Asleep : Mood.Wake; }    
    return true;
  }
}
