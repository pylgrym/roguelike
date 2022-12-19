import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { StepIF } from "./27StepIF";

export class TimedStep implements StepIF {
  time:number=0;  
  excS():StepIF|null     {throw 'base excs'; }
  setPos(pos:WPoint):void{throw 'base setPos';}
  setDir(dir:WPoint):void{throw 'base setDir';}
  setTarget(tgt:Mob):void{throw 'base setTarget';}
  setTime(time:number):void { this.time = time; }
}
