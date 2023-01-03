//import { Stack } from "O1term/05ScreenStack";
import { StackIF } from "O1term/05ScreenStackIF";
import { Glyph } from "O2model/07Glyph";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "O6screen/06ScreenMakerIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";
import { MoodAI } from "./18MoodAI";
import { DragonAI } from "./30DragonAI";

export class AiSwitcher2 implements MobAiIF {
  constructor(public ai5_std:MobAiIF) {}
  ai2_cat:MobAiIF = new MobAI2_cat(); 
  ai3_ant:MobAiIF = new MobAI3_ant(); 
  ai4_bat:MobAiIF = MoodAI.stockMood(2);   
  ai6_dragon:MobAiIF = new DragonAI(2,2); // ch30: is fast, casts spells often.
    
  turn(me:Mob, enemy:Mob, game:GameIF,ss:StackIF, maker:MakerIF):boolean { 
    var ai:MobAiIF;
    switch (me.g) {
      case Glyph.Ant: ai=this.ai3_ant;break;
      case Glyph.Bat: ai=this.ai4_bat;break;
      case Glyph.Cat: ai=this.ai2_cat;break;  
      case Glyph.Dragon:ai=this.ai6_dragon;break;  
      default:        ai=this.ai5_std;break;
    }
    return ai.turn(me,enemy,game,ss,maker);
  }
}
