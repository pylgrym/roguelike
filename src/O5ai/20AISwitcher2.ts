import { Glyph } from "O2model/07Glyph";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";
import { MoodAI } from "./18MoodAI";

export class AiSwitcher2 implements MobAiIF {
  ai2_cat:MobAiIF = new MobAI2_cat(); 
  ai3_ant:MobAiIF = new MobAI3_ant(); 
  ai4_bat:MobAiIF = MoodAI.stockMood(); //2); 
  ai5_std:MobAiIF = MoodAI.stockMood(); //1); 
    
  turn(me:Mob, enemy:Mob, game:GameIF):boolean { 
    var ai:MobAiIF;
    switch (me.g) {
      case Glyph.Ant: ai=this.ai3_ant;break;
      case Glyph.Bat: ai=this.ai4_bat;break;
      case Glyph.Cat: ai=this.ai2_cat;break;  
      default:        ai=this.ai5_std;break;
    }
    return ai.turn(me,enemy,game);
  }
}
