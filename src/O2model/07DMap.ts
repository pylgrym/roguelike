import { DMapIF } from "./07DMapIF";
import { Glyph } from "./07Glyph";
import { MapCell } from "./07MapCell";
import { WPoint } from "./07WPoint";

export class DMap implements DMapIF {
  cells:MapCell[][];
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
}
