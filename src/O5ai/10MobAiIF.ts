import { StackIF } from "O1term/05ScreenStackIF";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "O6screen/06ScreenMakerIF";

export interface MobAiIF {
  //turn(me:Mob, enemy:Mob, game:GameIF):boolean;
  turn(me:Mob, enemy:Mob, game:GameIF,ss:StackIF, maker:MakerIF):boolean;
}
