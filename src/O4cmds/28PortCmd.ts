import { CmdBase } from "./09CmdBase";
import { WPoint } from "O2model/07WPoint";
import { DMapIF } from "O2model/07DMapIF";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";

export class PortCmd extends CmdBase {
  constructor(
      public r:number, public me:Mob, public g:GameIF
  ) { super(me,g); }
  exc(): boolean {
    let g = this.g;
    let map = <DMapIF> g.curMap();
    let p = this.pick(this.me.pos, this.r, map);
    if (!p) { return false; }
    map.moveMob(this.me,p);        
    g.msg(`${this.me.name} shimmers`);
    return true; 
  }
  pick(c:WPoint,r:number,map:DMapIF):WPoint|null {
    let R = this.g.rnd;
    let p = new WPoint();
    for (let ix=15; ix>0; ) {
      let dx=R.rnd(-r,r), dy = R.rnd(-r,r);
      p.x = c.x + dx;
      p.y = c.y + dy;
      if (!map.legal(p)) { continue; }
      --ix;
      if (map.cell(p).blocked()){continue;}
      //console.table({r,dx,dy});
      return p;
    } 
    return null;
  }
}
