import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";
import { MsgLog } from "O2model/12MsgLog";
import { MobAiIF } from "O5ai/10MobAiIF";

export interface GameIF {
  rnd:Rnd;
  curMap():DMapIF|null;

  ply: Mob; // ch09  
  ai: MobAiIF | null; // ch10

  msg(s:string):void; // ch12
  log:MsgLog;
}
