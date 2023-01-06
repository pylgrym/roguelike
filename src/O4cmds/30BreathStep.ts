import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { MapCell } from "O2model/07MapCell";
import { WPoint } from "O2model/07WPoint";
import { GameIF } from "O3build/08GameIF";
import { StepIF } from "./27StepIF";
import { TimedStep } from "./27TimedStep";

export class BreathStep extends TimedStep {
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
  cells:MapCell[] = [];
  excS():StepIF|null {
    let p = this.pos;
    let map = this.map;
    let r = this.game.rnd;
    //map.cell(p).sprite = undefined;
    if (this.dir == null) { 
      throw 'DirStep.dir is null'; 
    }
    p.addTo(this.dir);
    // ie abort, don't carry on.
    if (!map.legal(p)) { return null; } 
    let cell = map.cell(p);
    let done = cell.blocked();
    if (!done) { 
      let EO = r.oneIn(2);
      // alternate fire:
      cell.sprite = (EO ? this.sprite : Glyph.Fire3); 
       // remember the cells we painted:
      this.cells.push(cell);
      if (this.effect) { 
          this.effect.setPos(p);
          this.effect.excS(); 
      }
    } else { // transfer args.
      if (this.next) { 
        this.next.setPos(p); 
      }
      this.cleanup();
    }
    return done ? this.next : this;
  }

  cleanup() {
    for (let c of this.cells) {c.sprite = undefined;}
  } // we remove dragon-fire at end.
}
