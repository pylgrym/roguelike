import { TermIF } from "O1term/03TermIF";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";

export class WinOverScreen implements SScreenIF {
  name='wingameover'; 
  constructor(public make:MakerIF,
              public g:GameIF|undefined) {}
  draw(term:TermIF) { 
    this.showLog(term);
    let won = (this.g && this.g.gameWon);
    if (won) {
      term.txt(1,1,' YOU WON! ', 'blue', 'lime');
    } else {
      term.txt(1,1,' GAME OVER! ', 'yellow', 'red');
    }
  }
  onTime():boolean{return false;} // OverScreen0
  onKey(e:JQuery.KeyDownEvent, s:StackIF) {
    s.pop();
    s.push(this.make.new_Game());  
  }

  showLog(term:TermIF) { 
    let log = this.g?.log.archive;
    if (!log) {return;}
    term.txt(0,0, 'Log:', 'yellow', 'black'); 
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
}
