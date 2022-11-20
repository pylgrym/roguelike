import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MoveCmd } from "O4cmds/09MoveCmd";
import { MobAiIF } from "./10MobAiIF";

export class MobAI1_sheep implements MobAiIF {
  turn(me:Mob, enemy:Mob, game:GameIF):boolean {
    let dir = me.pos.dir(enemy.pos);
    let cmd = new MoveCmd(dir,me,game);
    return cmd.exc();  
  }
}
