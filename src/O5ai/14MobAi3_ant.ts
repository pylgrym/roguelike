import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { MoveBumpCmd } from "O4cmds/11MoveBumpCmd";
import { MobAiIF } from "./10MobAiIF";

export class MobAI3_ant implements MobAiIF {
  turn(me:Mob, enemy:Mob, game:GameIF):boolean {
    let r = game.rnd;
    let dir = r.rndDir2();
    return new MoveBumpCmd(dir, me, game).npcTurn();
  }
}
