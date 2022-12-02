import { BuildIF0 } from "O3build/08BuildIF0";
import { GameIF } from "O3build/08GameIF";
import { AutoHeal } from "O4cmds/17AutoHeal";
import { MobAiIF } from "O5ai/10MobAiIF";
import { DMapIF } from "./07DMapIF";
import { Rnd } from "./07Rnd";
import { Mob } from "./09Mob";
import { MsgLog } from "./12MsgLog";
import { Dung } from "./13Dung";
import { Bag } from "./22Bag";
import { Worn } from "./23Worn";

export class Game4 implements GameIF { 
  constructor(public rnd:Rnd, public ply:Mob, 
              public build:BuildIF0) {}
  curMap():DMapIF|null { return this.dung.curMap(this); }
  ai: MobAiIF | null = null;
  log: MsgLog = new MsgLog();
  msg(s:string) { this.log.msg(s,false); }
  flash(s:string) { this.log.msg(s,true);  }
  dung:Dung = new Dung(); // ch13
  autoHeal:AutoHeal|undefined = new AutoHeal(); // ch17
  bag:Bag = new Bag(); // ch22 
  worn:Worn = <Worn><unknown> undefined; // ch23
}
