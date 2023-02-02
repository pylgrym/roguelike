import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";
import { SurfaceIF } from "./SurfaceIF";

export class Surface implements SurfaceIF {
  constructor(public s:MapDrawerIF,                  
              public rnd:Rnd) { 
  }
  tunnel(s:WPoint,e:WPoint, tile:Glyph) {
    let mid = this.rnd.rnd(2) 
      ? new WPoint(s.x,e.y) : new WPoint(e.x,s.y);
    // console.log('mid:', mid);
    if (!this.box(s,mid,tile)) { return false; }
    if (!this.box(mid,e,tile)) { return false; }
    return true;
  }
  box(a:WPoint, b:WPoint, wall:Glyph):boolean {
    let dx = (a.x < b.x ? 1: -1);
    let dy = (a.y < b.y ? 1: -1);  
    var inside:boolean;
    var charToSet:Glyph;
    for (let xi=a.x; ; xi+=dx) {
      for (let yj=a.y; ; yj+=dy) {  
        inside = (xi != a.x && xi != b.x 
               && yj != a.y && yj != b.y);
        // (INSIDES <- FLOOR, BORDERS <- WALL.)
        charToSet = inside ? Glyph.Floor : wall; 
        let wantWall:boolean = (charToSet == Glyph.Wall);
        if (!this.overrideCell(xi,yj,charToSet,!wantWall)) {   
          return false; // Wall may not override floor.
        }
        if (yj==b.y) { break; }
      }
      if (xi==b.x) { break; }
    }
    return true;    
  }
  overrideCell(x:number, y:number, 
               tile:Glyph, override:boolean) { 
    let p = new WPoint(x,y);
    let canWrite:boolean = 
    (override || this.s.get(p) == Glyph.Unknown);
    if (canWrite) { this.s.setp(p,tile); }
    return canWrite;
  }
  box_empty(s:WPoint,e:WPoint):boolean { 
    let p = new WPoint();
    for (var x=s.x; x<=e.x; ++x) {
      for (var y=s.y; y<=e.y; ++y) {
        if (this.s.get(p) != Glyph.Unknown) { 
          return false; 
        }
      }
    }
    return true; // no walls found.       
  }
}
