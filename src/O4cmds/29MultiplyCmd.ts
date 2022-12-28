import { CmdBase } from "./09CmdBase";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { WPoint } from "O2model/07WPoint";
import { DMapIF } from "O2model/07DMapIF";
import { Rnd } from "O2model/07Rnd";

export class MultiplyCmd extends CmdBase {
  constructor(
      public me:Mob, public g:GameIF
  ) { super(me,g); }
  exc(): boolean {
    let g = this.g;
    let map = <DMapIF> g.curMap();
    let p = this.find(map,g.rnd);
    if (p == null) { return true; }

    this.spawnMob(p,map,g);
    return true; 
  }
  spawnMob(p:WPoint,map:DMapIF,g:GameIF) {
    let m = this.me;
    g.build.addNPC(m.g,p.x,p.y,map,m.level);    
    g.msg(`${m.name} breeds`);
  }
  find(map:DMapIF,r:Rnd):WPoint|null {
    let pos = this.me.pos;
    let c:WPoint[] = [];
    let a=new WPoint();
    for (a.y=-1;a.y<=1;++a.y) {
      for (a.x=-1;a.x<=1;++a.x) {
        let b = pos.plus(a);
        if (!map.blocked(b)) {c.push(b);}
      }
    }
    return this.pick(c,r);
  }
  pick(c:WPoint[], r:Rnd):WPoint|null {
    if (c.length == 0) { return null;}
    let ix = r.rnd(c.length);
    return c[ix];
  }
}
