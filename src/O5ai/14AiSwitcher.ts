import { Glyph } from "O2model/07Glyph";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MobAiIF } from "./10MobAiIF";
import { MobAI2_cat } from "./11MobAI2_cat";
import { MobAI3_ant } from "./14MobAi3_ant";

export class AiSwitcher implements MobAiIF {
  ai2:MobAiIF = new MobAI2_cat(); 
  ai3:MobAiIF = new MobAI3_ant(); 
  turn(me:Mob, enemy:Mob, game:GameIF):boolean { 
    var ai:MobAiIF;
    switch (me.g) {
      case Glyph.Ant: ai=this.ai3;break;
      case Glyph.Cat: ai=this.ai2;break;
      default:        ai=this.ai2;break;
    }
    return ai.turn(me,enemy,game);
  }
}
