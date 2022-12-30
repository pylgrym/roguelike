//import { Stack } from "O1term/05ScreenStack";
import { StackIF } from "O1term/05ScreenStackIF";
import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";
import { SleepAI } from "./18SleepAI";

export class WakeAI implements MobAiIF {
  constructor(public speed:number){}

  aiDir:MobAiIF = new MobAI2_cat();
  aiRnd:MobAiIF = new MobAI3_ant();
  turn(me:Mob, enemy:Mob, game:GameIF,ss:StackIF, maker:MakerIF):boolean { 
    let r = game.rnd; 
    for (let i=0;i<this.speed;++i) {
      var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
      ai.turn(me,enemy,game,ss,maker);
    }
    let far = !SleepAI.isNear(me,enemy);    
    if (far) { me.mood = r.oneIn(3) ? Mood.Asleep : Mood.Wake; }    
    return true;
  }
}
