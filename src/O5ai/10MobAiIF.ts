import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";

export interface MobAiIF {
  turn(me:Mob, enemy:Mob, game:GameIF):boolean;
}
