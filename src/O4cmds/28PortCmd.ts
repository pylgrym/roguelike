import { CmdBase } from "./09CmdBase";
import { GameIF } from "O2model/08GameIF";
import { WPoint } from "O2model/07WPoint";
import { DMapIF } from "O2model/07DMapIF";
import { Mob } from "O2model/09Mob";

export class PortCmd extends CmdBase {
    constructor(
        public r:number, public me:Mob, public g:GameIF
    ) { super(me,g); }
    exc(): boolean {
        let g = this.g;
        let map = <DMapIF> g.curMap();
        let p = this.find(this.me.pos, this.r, map);
        if (!p) { return false; }
        map.moveMob(this.me,p);        
        g.msg(`${this.me.name} shimmers`);
        return true; 
    }
    find(c:WPoint,r:number,map:DMapIF):WPoint|null {
        let R = this.g.rnd;
        let p = new WPoint();
        for (let ix=15; ix>0; ) {
            p.x = c.x + R.rnd(-r,r);
            p.y = c.y + R.rnd(-r,r);
            if (!map.legal(p)) { continue; }
            --ix;
            if (!map.cell(p).blocked()){return p;}
        } 
        return null;
    }
}
