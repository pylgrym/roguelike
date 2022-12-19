import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";

export interface StepIF {
  // steps return their 'next step'
  excS():StepIF|null; 
  setPos(pos:WPoint):void;
  setDir(dir:WPoint):void;
  setTarget(tgt:Mob):void;
  setTime(time:number):void;
}
