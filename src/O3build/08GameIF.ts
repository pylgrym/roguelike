import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";
import { Mob } from "O2model/09Mob";
import { MsgLog } from "O2model/12MsgLog";
import { Dung } from "O2model/13Dung";
import { Bag } from "O2model/22Bag";
import { AutoHeal } from "O4cmds/17AutoHeal";
import { MobAiIF } from "O5ai/10MobAiIF";
import { BuildIF0 } from "./08BuildIF0";

export interface GameIF { 
  rnd:Rnd;
  curMap():DMapIF|null;
  ply: Mob; // ch09  
  ai: MobAiIF | null; // ch10
  msg(s:string):void; // ch12
  flash(s:string):void;//ch15
  log:MsgLog;
  dung:Dung;          // ch13
  build:BuildIF0; 

  autoHeal: AutoHeal|undefined; // ch17
  bag:Bag|undefined; // ch22
}
