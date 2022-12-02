import { StackIF } from "O1term/05ScreenStackIF";
import { SScreenIF } from "O1term/05SScreenIF";
import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "O4cmds/09CmdIF";
import { MoveCmd } from "O4cmds/09MoveCmd";
import { WaitCmd } from "O4cmds/09WaitCmd";
import { MoveBumpCmd } from "O4cmds/11MoveBumpCmd";
import { DoorCmd } from "O4cmds/15DoorCmd";
import { PickupCmd } from "O4cmds/22PickupCmd";
import { MakerIF } from "./06ScreenMakerIF";
import { LogScreen } from "./12LogScreen";
import { CmdDirScreen } from "./15CmdDirScreen";
import { InvScreen } from "./22InvScreen";
import { WornScreen } from "./23WornScreen";

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
    var s:SScreenIF|undefined = undefined; // ch12
    let dir = new WPoint();
    switch (c) {
      case 'ArrowLeft':  case 'h': case 'H': dir.x-=1; break;
      case 'ArrowRight': case 'l': case 'L': dir.x+=1; break;
      case 'ArrowDown':  case 'j': case 'J': dir.y+=1; break;
      case 'ArrowUp':    case 'k': case 'K': dir.y-=1; break;
      case '.': return this.waitCmd(); break;   
      case 'q': s = new LogScreen(this.game,this.maker); break; // ch12
      case 'c': s = this.doorCmd(); break; // ch15
      case 'g': // ch22
        if (this.game.bag) {
          return new PickupCmd(this.game);
        }
        break;
      case 'i': // ch22
        if (this.game.bag) {
          s = new InvScreen(this.game,this.maker); 
        }
        break;    

        case 'u': // ch23
        if (this.game.worn) {
          s = new  WornScreen(this.game,this.maker); 
        }
        break;     
      }
    if (s) { ss.push(s); return null; }// ch12

    if (!dir.empty()) { return this.moveBumpCmd(dir); }
    return null;
  }
  moveCmd(dir:WPoint):CmdIF {
    return new MoveCmd(dir, this.ply, this.game); 
  }
  waitCmd(): CmdIF { return new WaitCmd(); }    

  moveBumpCmd(dir:WPoint):CmdIF { // ch11
    return new MoveBumpCmd(dir,this.ply,this.game); 
  }

  doorCmd():SScreenIF { // ch15
    let cmd = new DoorCmd(this.ply,this.game);
    return new CmdDirScreen(cmd,this.game,this.maker); 
  }  
}
