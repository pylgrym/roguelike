import { Term } from "O1term/03Term";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { GameIF } from "O3build/08GameIF";
import { MakerIF } from "./06ScreenMakerIF";

export class WinOverScreen implements SScreenIF {
  name='wingameover'; 
  constructor(public make:MakerIF,
              public g:GameIF|undefined) {}
  draw(term:Term) { 
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
}
