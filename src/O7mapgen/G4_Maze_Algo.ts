import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";
import { Dirs } from "./Dir";

export class G4_Maze_Algo {
  pool:WPoint[] = [];
  constructor(public dm:MapDrawerIF, public rnd:Rnd, 
              public dim:WPoint) {}    
  run(r:Rnd) {
    this.dm.render();
    this.addRoom(this.center());
    while (this.pool.length > 0) { 
      this.processItem( this.pickPoolItem(r) ); 
    }
  } 
  pickPoolItem(r:Rnd) { 
    return r.rnd(this.pool.length); 
  }
  center():WPoint { 
    return new WPoint(Math.floor(this.dim.x/2), 
                      Math.floor(this.dim.y/2)); }
  processItem(ix:number) {
    let p = this.pool[ix];
    let ways = this.collectWays(p);
    if (ways.length == 0) { 
      this.pool.splice(ix,1); 
      return; 
    }
    let way = ways[this.rnd.rnd(ways.length)];
    this.markWay(p,way, p.plus(way));
  }
  collectWays(p:WPoint):WPoint[] { 
    return Dirs.dirs.filter( d => this.free(p,d) ); 
  }
  free(p:WPoint, d: WPoint):boolean { 
    let n = p.plus(d).addTo(d); 
    return this.dm.get(n) == Glyph.Wall; 
  } 
  markWay(p:WPoint, way:WPoint, door: WPoint) { 
    this.dm.setp(door, Glyph.Floor);  
    this.addRoom(door.plus(way));
  }
  addRoom(room:WPoint) {
    this.dm.setp(room, Glyph.Floor);
    this.pool.push(room); 
  }
}
