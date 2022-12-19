import { DMapIF } from "O2model/07DMapIF";
import { WPoint } from "O2model/07WPoint";
import { Mob } from "O2model/09Mob";
import { GameIF } from "O3build/08GameIF";
import { HealthAdj } from "./11HealthAdj";
import { StepIF } from "./27StepIF";
import { TimedStep } from "./27TimedStep";

export class BlastStep extends TimedStep {
  target:Mob|null = null;
  pos:WPoint|null = null;
  setTarget(tgt:Mob):void { this.target = tgt; }
  setPos(pos:WPoint):void { this.pos = pos.copy(); }
  school():School { return this._school; }
  constructor(
    public amount:number, 
    public _school:School, 
    public actor:Mob, 
    public game:GameIF
  ) { super(); }
  excS():StepIF|null {
    let tgt = this.target;
    if (!tgt) { tgt = this.tgtFromPos(); }
    if (tgt) { // should track attacker and defender both.
      let school = School[this._school];
      let hp = tgt.hp;
      this.game.msg(
        `${tgt.name}${hp} is hurt ${this.amount} ${school}.`
      );
      HealthAdj.dmg(tgt,this.amount,this.game,this.actor);
    } else {
      console.log(' blastStep did not hit any mob.');
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

export enum School{Fire,Frost,Magic,Earth,Lightning}
