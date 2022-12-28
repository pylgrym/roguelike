import { CmdBase } from "./09CmdBase";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { Buff } from "O2model/24BuffEnum";

export class CleanseBuffCmd extends CmdBase {
  constructor(
    public buff:Buff|null,public me:Mob, public g:GameIF
  ) { super(me,g); }
  exc(): boolean {
    let g=this.g;
    let m=this.me;
    // we should also have a cleanse-all.
    if (this.buff) {
      this.me.buffs.cleanse(this.buff,g,m);
    }
    //let msg = `${this.me.name} feels better`; g.msg(msg);
    return true; 
  }
}

export class CleanseAllCmd extends CmdBase {
  constructor(
    public me:Mob, public g:GameIF
  ) { super(me,g); }
  exc(): boolean {
    let m=this.me;
    m.buffs._map.clear();
    let g=this.g;
    let msg = `${m.name} eases up`; 
    g.msg(msg);
    return true; 
  }
}
