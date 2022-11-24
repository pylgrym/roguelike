import { BuildIF0 } from "O3build/08BuildIF0";
import { GameIF } from "O3build/08GameIF";
import { AutoHeal } from "O4cmds/17AutoHeal";
import { MobAiIF } from "O5ai/10MobAiIF";
import { DMapIF } from "./07DMapIF";
import { Rnd } from "./07Rnd";
import { Mob } from "./09Mob";
import { MsgLog } from "./12MsgLog";
import { Dung } from "./13Dung";

export class Game0 implements GameIF { 
  constructor(public rnd:Rnd) {}
  map:DMapIF|null = null;
  curMap():DMapIF|null { return this.map;}
  ply:Mob = <Mob><unknown> undefined; // ch09    
  ai:MobAiIF|null = null; // ch10
  log:MsgLog = <MsgLog>  <unknown> undefined; // ch12 fixup.
  msg(s:string){} 
  flash(s:string){}
  dung:Dung = <Dung> <unknown> undefined; // ch13
  build:BuildIF0 = <BuildIF0> <unknown> undefined; // ch13
  autoHeal:AutoHeal|undefined; // ch17
}