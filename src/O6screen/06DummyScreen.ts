import { Term } from "O1term/03Term";
import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { MakerIF } from "./06ScreenMakerIF";

export class DummyScreen implements SScreenIF {
  name='dummy-game'; 
  constructor(public make:MakerIF) {}
  draw(term:Term) { 
    term.txt(1,1,' Press Key! ', 'cyan', 'blue');
  }
  onKey(e:JQuery.KeyDownEvent, s:StackIF) {
    s.pop();
    s.push(this.make.gameOver());  
  }
}
