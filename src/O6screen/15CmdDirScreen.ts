import { TermIF } from "O1term/03TermIF";
import { Stack } from "O1term/05ScreenStack";
import { WPoint } from "O2model/07WPoint";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "O4cmds/09CmdIF";
import { MakerIF } from "./06ScreenMakerIF";
import { BaseScreen } from "./09BaseScreen";

export class CmdDirScreen extends BaseScreen {
  name:string = 'dir';     
  constructor(public cmd:CmdIF, game:GameIF, 
              maker:MakerIF) 
  { 
    super(game,maker); 
  }
  draw(term:TermIF) { 
    term.txt(0,0, 'Which dir?', 'yellow', 'black'); 
    let R = ['H Left', 'J Down', 'K Up', 'L Right'];
    for (let i=0; i<R.length; ++i) {
      term.txt(0,i+1, R[i], 'yellow', 'black'); 
    }
  }
  onKey(e:JQuery.KeyDownEvent, 
        stack:Stack):boolean 
  {
    stack.pop(); // we pop in all cases.
    let dir = new WPoint();
    switch (e.key) {
      case 'h': dir.x = -1; break;
      case 'j': dir.y =  1; break;
      case 'k': dir.y = -1; break;
      case 'l': dir.x =  1; break;
    }
    if (!dir.empty()) { this.actDir(dir); }
    return true;
  }
  actDir(dir: WPoint):boolean {
    return this.cmd.setDir(dir).turn();
  }
}
