import { Glyph } from "O2model/07Glyph";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";
import { Dirs } from "./Dir";

export class G6_CaveIn {
  constructor(public dm:MapDrawerIF){}
  run(dim:WPoint) {
    let round=0;
    let count = 1;
    while (count > 0 && round < 100) {
      count = this.cave(dim); 
      console.log('round', round++, 'caves', count);
    } 
  }
  cave(dim:WPoint):number {
    let total=0;
    for (let p=new WPoint(1,1); p.x < dim.x; p.x += 2) {
      for (p.y=1; p.y < dim.y; p.y += 2) {
        total += this.findDoor(p);
      }
    }
    return total;
  }
  findDoor(p:WPoint):number {
    let numDoors=0;
    var pdoor:WPoint|null=null, dir:WPoint|null = null;
    for (let d of Dirs.dirs) {
      let dp = p.plus(d); 
      if (this.isDoor(dp)) {              
        // if we have seen >1 doors, not a deadend.   
        if (++numDoors > 1) { return 0; } 
        pdoor = dp; dir = d;
      } // idea: when we close a door, keep chasing that direction.
    }
    if (numDoors == 1) { 
      // fix, I think direction is opposite here?
      this.closeDoor(p, pdoor); 
      if (dir == null) { throw 'null dir'; }
      numDoors += this.findDoor(
        new WPoint(p.x+2*dir.x, p.y+2*dir.y)
      );
    }
    return numDoors;
  }
  isDoor(p:WPoint):boolean { 
    return this.dm.get(p) == Glyph.Floor; 
  }
  closeDoor(p:WPoint, d:WPoint|null) { 
    if (d == null) { throw 'closeDoor, d is null'; }
    let debug = 0;
    let doorFill = debug ? Glyph.Ply :  Glyph.Wall;
    let roomFill = debug ? Glyph.Cap :  Glyph.Wall;
    this.dm.setp(p, roomFill);  
    this.dm.setp(d, doorFill);  
  }
}
