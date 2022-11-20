import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class LogScreen extends BaseScreen {
    name:string = 'log';     
    msgLog:string[];
    constructor(game:GameIF, maker:MakerIF) { 
        super(game,maker); 
        this.msgLog = game.log.archive; 
    }
    draw(term:TermIF) { 
        term.txt(0,0, 'Log:', 'yellow', 'black'); 
        let log = this.msgLog;        
        let range = term.dim.y-1;
        if (log.length < range) { range = log.length; }
        let offset = log.length-range;
        for (let p=0; p<range; ++p) {
            let pos = offset+p;
            if (pos < 0) {continue; }
            let row = log[pos];
          term.txt(0, 1+p, `${p} ${row}`, 'yellow', 'black'); 
        }
    }
    onKey(e:JQuery.KeyDownEvent, stack:Stack):boolean {
         stack.pop();
         return true; 
    }
}
