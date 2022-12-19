import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { GameIF } from "O3build/08GameIF";
import { StepIF } from "./27StepIF";
import { TimedStep } from "./27TimedStep";

export class DirStep extends TimedStep {
  map:DMapIF;
  dir:WPoint|null = null;
  setDir(dir:WPoint):void { this.dir = dir; }
  constructor(
    public effect:StepIF|null, 
    public next:StepIF|null, 
    public sprite:Glyph,
    public pos:WPoint, public game:GameIF
  ) {
    super();
    this.map = <DMapIF> game.curMap();
  }
  excS():StepIF|null {
    let p = this.pos;
    let map = this.map;
    map.cell(p).sprite = undefined;
    if (this.dir == null) { 
      throw 'DirStep.dir is null'; 
    }
    p.addTo(this.dir);
    // ie abort, don't carry on.
    if (!map.legal(p)) { return null; } 
    let cell = map.cell(p);
    let done = cell.blocked();
    if (!done) { 
      cell.sprite = this.sprite;
      if (this.effect) { 
          this.effect.setPos(p);
          this.effect.excS(); 
      }
    } else { // transfer args.
      if (this.next) { 
        this.next.setPos(p); 
      }
    }
    return done ? this.next : this;
  }
}
