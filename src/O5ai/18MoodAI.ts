//import { Stack } from "O1term/05ScreenStack";
import { StackIF } from "O1term/05ScreenStackIF";
import { Mob } from "O2model/09Mob";
import { Mood } from "O2model/18MoodEnum";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { MobAiIF } from "./10MobAiIF";
import { Sleep2AI } from "./18Sleep2AI";
import { SleepAI } from "./18SleepAI";
import { WakeAI } from "./18WakeAI";
import { SpellAI } from "./24SpellAI";
import { ShootAI } from "./29ShootAI";

export class MoodAI implements MobAiIF {
  constructor(public asleep:MobAiIF, 
              public wake:MobAiIF) {}
  turn(me:Mob, enemy:Mob, game:GameIF,ss:StackIF, maker:MakerIF):boolean { 
    var ai:MobAiIF;
    switch (me.mood) {
      case Mood.Asleep: ai=this.asleep;break;
      case Mood.Wake:   ai=this.wake;  break;
    }
    return ai!.turn(me,enemy,game,ss,maker);
  }
    
  static stockMood(speed:number):MobAiIF {
    return new MoodAI(new Sleep2AI(),new WakeAI(speed));
  }

  // ch24
  static stockMood24(speed:number, spellRate:number):MobAiIF {
    return new MoodAI(new SleepAI(),
                      new SpellAI(speed,spellRate));
  }  
  static stockMood29(speed:number, spellRate:number):MobAiIF {
    return new MoodAI(new SleepAI(),
                      new ShootAI(speed,spellRate));
  }  
}
