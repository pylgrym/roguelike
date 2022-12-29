import { MobAiIF } from "O5ai/10MobAiIF";
import { BuildIF1 } from "./09BuildIF1";

export interface BuildIF2 extends BuildIF1 {
  makeAI(): MobAiIF | null;
  
  // ch29 (belongs in ch20)
  //addNPC(g:Glyph, x:number, y:number, 
  //  map:DMapIF, level:number):Mob;

  // If anything, this must go in BuildIF3.
  // ch29 (MUST RETURN mob!)
  //addMapLevel_Mob(pos:WPoint, map:DMapIF, rnd:Rnd):Mob;
}
