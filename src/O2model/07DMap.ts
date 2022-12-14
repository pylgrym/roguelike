import { DMapIF } from "./07DMapIF";
import { Glyph } from "./07Glyph";
import { MapCell } from "./07MapCell";
import { WPoint } from "./07WPoint";
import { Mob } from "./09Mob";
import { TurnQ } from "./09TurnQ";
import { Obj } from "./21Obj";

export class DMap implements DMapIF {
  cells:MapCell[][];
  Q: TurnQ = new TurnQ(); // ch09

  constructor(public dim:WPoint, g_empty:Glyph, 
              public level:number) {
    this.cells = this.allocMap(g_empty);
  }
  cell(p:WPoint):MapCell { 
    return this.cells[p.y][p.x]; 
  }
  legal(p:WPoint):boolean { 
    return p.x >= 0 && p.x < this.dim.x
        && p.y >= 0 && p.y < this.dim.y; 
  }
  allocMap(g_empty:Glyph) {
    let cells = new Array(this.dim.y);
    let p:WPoint = new WPoint();
    for (p.y=0; p.y<this.dim.y; ++p.y) {
      cells[p.y] = new Array(this.dim.x);
      for (p.x=0; p.x<this.dim.x; ++p.x) {
        cells[p.y][p.x]=new MapCell(g_empty); 
      }
    }
    return cells;
  }  

  // ch09:
  moveMob(m:Mob, p:WPoint):void {
    this.cell(m.pos).mob = undefined;
    m.pos.x = p.x; m.pos.y = p.y;
    this.cell(m.pos).mob = m;
  }
  addNPC(m:Mob):Mob {
    this.cell(m.pos).mob = m;
    this.Q.pushMob(m);
    return m;
  }
  removeMob(m:Mob):void {
    this.Q.removeMob(m);
    this.cell(m.pos).mob = undefined;
  }
  enterMap(ply:Mob, np:WPoint):void {
    ply.pos.set(np);
    this.cell(ply.pos).mob = ply;
    this.Q.frontPushMob(ply);
  }
  blocked(p:WPoint):boolean {
    if (!this.legal(p)) { return true; }
    let c = this.cell(p);
    return c.blocked();
  }  

  // ch21:
  addObj(o:Obj, p:WPoint) { 
    this.cell(p).obj = o; 
  }
}
