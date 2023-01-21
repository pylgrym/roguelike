import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";
import { MapSurf } from "./MapSurf";
import { SurfaceIF, Tile } from "./SurfaceIF";

export class Surface implements SurfaceIF {
  dungsurf:MapSurf;
  constructor(public s:MapDrawerIF,                  
              public rnd:Rnd) { 
    this.dungsurf = new MapSurf(s); 
  }
  tunnel(s:WPoint,e:WPoint, tile:Tile) {
    let mid = this.rnd.rnd(2) 
      ? new WPoint(s.x,e.y) : new WPoint(e.x,s.y);
    //console.log('mid:', mid);
    if (!this.box(s,mid,tile)) { return false; }
    if (!this.box(mid,e,tile)) { return false; }
    return true;
  }
  box(a:WPoint, b:WPoint, wall:Tile):boolean {
    let dx = (a.x < b.x ? 1: -1);
    let dy = (a.y < b.y ? 1: -1);  
    var inside:boolean;
    var charToSet:Tile;
    for (let xi=a.x; ; xi+=dx) {
      for (let yj=a.y; ; yj+=dy) {  
        inside = (xi != a.x && xi != b.x 
               && yj != a.y && yj != b.y);
        // (INSIDES <- FLOOR, BORDERS <- WALL.)
        charToSet = inside ? Tile.C_FLOOR : wall; 
        let wantsWall:boolean = 
          (charToSet == Tile.C_WALL) || 
          (charToSet == Tile.C_HALLWALL);
        if (!this.overrideCell(xi,yj,charToSet, !wantsWall)) {   
          return false; // Wall may not override floor.
        }
        if (yj==b.y) { break; }
      }
      if (xi==b.x) { break; }
    }
    return true;    
  }
  overrideCell(x:number, y:number, 
               tile:Tile, override:boolean) { 
    if (!override) {
      // wall may not overwrite floor.
      let ex = this.dungsurf.getTile(x,y);
      let hasFloor = 
        (ex == Tile.C_FLOOR || ex == Tile.C_CORRFLOOR);
      let wantsWall =
        (ex == Tile.C_WALL || ex == Tile.C_HALLWALL);
      if (hasFloor && wantsWall) { return false; }
    }
    this.dungsurf.setTile(x,y,tile); 
    return true;
  }
  box_empty(s:WPoint,e:WPoint):boolean{ 
    for (var x=s.x; x<=e.x; ++x) {
      for (var y=s.y; y<=e.y; ++y) {
        if (this.dungsurf.getTile(x,y) != Tile.UNSET) { 
          return false; 
        }
      }
    }
    return true; // no walls found.       
  }
}
