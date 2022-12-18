export interface StepIF {
  // steps return their 'next step'
  excS():StepIF|null; 
  setPos(pos:WPoint):void;
  setDir(dir:WPoint):void;
  setTarget(tgt:Mob):void;
  setTime(time:number):void;
}
