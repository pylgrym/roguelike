import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MoveBumpCmd } from "O4cmds/11MoveBumpCmd";
import { MobAiIF } from "./10MobAiIF";

export class MobAI2_cat implements MobAiIF {
  turn(me:Mob, enemy:Mob, game:GameIF) {
    let r = game.rnd; // slows hunting a bit.
    if (r.oneIn(3)) { return false; } 

    let dir = me.pos.dir(enemy.pos);
    let cmd = new MoveBumpCmd(dir,me,game);
    return cmd.exc();  
  }
}
