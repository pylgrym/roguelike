import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";

export class FreeSpace {
    public static findFree(map:DMapIF, rnd:Rnd):WPoint|null { 
      return this.find(Glyph.Floor,map,rnd); 
    }    
    public static find(c:Glyph, map:DMapIF, r:Rnd):WPoint|null {
      let e = new WPoint(map.dim.x-2, map.dim.y-2);
      let s = new WPoint(r.rndC(1,e.x), r.rndC(1,e.y));
      for (let p = s.copy();;) {
        let cell = map.cell(p);
        if (cell.env == c && !cell.mob) { 
            return p; 
        }
        ++p.x;
        if (p.x > e.x) {
          p.x = 1; ++p.y;
          if (p.y > e.y) { p.y=1; }
        }           
        if (p.eq(s)) { 
          console.trace('freespace not found',c,map);
          return null;
          //throw 'freespace not found'; 
        }
      }
    }
  }
  