import { HealthAdj } from "./11HealthAdj";
import { CmdBase } from "./09CmdBase";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
//import { GameIF } from "O2model/08GameIF";

export class HealCmd extends CmdBase {
    constructor(
        public r:number, 
        public me:Mob, public g:GameIF
    ) { super(me,g); }
    exc(): boolean {
        let g = this.g;
        let R = g.rnd;
        let r = this.r;
        let a = Math.ceil( r*0.5);
        let b = Math.floor(r*1.5);
        let hp = R.rnd(a,b);
        console.table({a,b,hp});       
        
        HealthAdj.heal(this.me, hp); 
        let msg = `${this.me.name} feels better (${hp})`;
        g.msg(msg);
        return true; 
    }
}
