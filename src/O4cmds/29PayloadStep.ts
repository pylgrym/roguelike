import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { CmdIF } from "./09CmdIF";
import { StepIF } from "./27StepIF";
import { TimedStep } from "./27TimedStep";

export class PayloadStep extends TimedStep {
  target:Mob|null = null;
  pos:WPoint|null = null;
  setTarget(tgt:Mob):void { this.target = tgt; }
  setPos(pos:WPoint):void { this.pos = pos.copy(); }
  constructor(    
    public actor:Mob, 
    public game:GameIF,
    public payload:CmdIF
  ) { super(); }
  excS():StepIF|null {
    let tgt = this.target;
    if (!tgt) { tgt = this.tgtFromPos(); } // ch29
    if (tgt) { 
      console.log('payload tgt now:', tgt);
      this.payload.setTarget(tgt);
      this.payload.raw();
    } else {
      console.log(' payloadStep did not hit any mob.');
    }
    return null; // this is a final step.
  }
  tgtFromPos():Mob|null {
    if (this.pos) {
      let map = <DMapIF> this.game.curMap();
      let cell = map.cell(this.pos);
      if (cell.mob) { return cell.mob; }
    }
    return null; 
  }
}
