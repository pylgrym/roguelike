import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { GameIF } from "O3build/08GameIF";
import { FreeSpace } from "O3build/13FreeSpace";
import { CmdBase } from "./09CmdBase";

export class StairCmd extends CmdBase { 
    constructor(public levelDir:number, public g:GameIF){
      super(g.ply,g);
    } 
    exc(): boolean {
        let game = this.g;
        let dung = game.dung;
        let newLevel = dung.level + this.levelDir; 
        let newMap:DMapIF = dung.getLevel(newLevel, game);
        let newPos = FreeSpace.findFree(newMap, game.rnd);
        let dir = (this.levelDir != -1 ? 
                   'descends' : 'ascends');
        this.g.msg(`ply ${dir} some stairs.`);
        dung.plySwitchLevel(newLevel, <WPoint> newPos, game);
        return true;
    }
}
