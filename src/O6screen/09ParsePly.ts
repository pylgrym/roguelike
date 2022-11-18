import { StackIF } from "O1term/05ScreenStackIF";
import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "O4cmds/09CmdIF";
import { MoveCmd } from "O4cmds/09MoveCmd";
import { WaitCmd } from "O4cmds/09WaitCmd";

export class ParsePly {
  public ply:Mob;
  public map:DMapIF;    
  constructor(public game:GameIF, public maker:MakerIF) {
    this.ply = <Mob> game.ply;
    this.map = <DMapIF> game.curMap();          
  }    
  static keyPressToCode(e:JQuery.KeyDownEvent):string {
    let c:string = e.key;
    switch (e.code) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      c = e.code; break;
    }
    return c;
  }
  parseKeyCodeAsTurn(c:string, ss:StackIF,
                     e:JQuery.KeyDownEvent|null):boolean {
    let cmd = this.parseKeyCmd(c,ss,e);
    return (cmd ? cmd.exc() : false);
  }
  parseKeyCmd(c:string, ss:StackIF,
              e:JQuery.KeyDownEvent|null):CmdIF|null {
    let dir = new WPoint();
    switch (c) {
      case 'ArrowLeft':  case 'h': case 'H': dir.x-=1; break;
      case 'ArrowRight': case 'l': case 'L': dir.x+=1; break;
      case 'ArrowDown':  case 'j': case 'J': dir.y+=1; break;
      case 'ArrowUp':    case 'k': case 'K': dir.y-=1; break;
      case '.': return this.waitCmd(); break;   
    }
    if (!dir.empty()) { return this.moveCmd(dir); }
    return null;
  }
  moveCmd(dir:WPoint):CmdIF {
    return new MoveCmd(dir, this.ply, this.game); 
  }
  waitCmd(): CmdIF { return new WaitCmd(); }    
}
