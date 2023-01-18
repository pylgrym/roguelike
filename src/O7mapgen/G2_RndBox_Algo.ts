import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawer } from "./33MapDrawer";

export class G2_RndBox_Algo {
  constructor(public dm:MapDrawer) {}    
  run(dim:WPoint, r:Rnd) {
    let area = dim.x*dim.y;
    let ratio = 85; // A way to match #rects to area.
    let numRooms = area/ratio; 
    console.log(area, area/numRooms)
    for (let i=0;i<numRooms;++i) { this.addBox(dim,r); } 
  }
  addBox(dim:WPoint, r:Rnd) {
    let a = r.rndC(3,8);
    let b = r.rndC(5,13-a);
    let vert = r.oneIn(2);
    let w = (vert?a:b), h = (vert?b:a);
    let e = new WPoint(r.rnd(0,dim.x-w), 
                       r.rnd(0,dim.y-h));
    let f = new WPoint(e.x+w, e.y+h);
    this.draw(e,f);
  }
  draw(e:WPoint, f:WPoint) {
    for (let p = e.copy(); p.y <= f.y; ++p.y) {
      for (p.x = e.x; p.x <= f.x; ++p.x) {
        let edge = ( p.x==e.x || p.y==e.y ||
                     p.x==f.x || p.y==f.y); 
        this.dm.carve( p, 
          edge ? Glyph.Wall : Glyph.Floor,
          Glyph.Floor); // can't overwrite 'hard'.
      }
    }
  }
}
