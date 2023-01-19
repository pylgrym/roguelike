import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapBuilder } from "./33MapBuilder";
import { MapDrawerIF } from "./33MapDrawerIF";

export class G9_BSP_Algo {
  constructor(public dm:MapDrawerIF, public rnd:Rnd) {}    
  run(dim:WPoint) { 
    MapBuilder.addFence(this.dm.map, Glyph.Rock);
    this.dm.render();
    this.divide(true, 0, 
      new WPoint(1,1), new WPoint(dim.x-2, dim.y-2)); 
  }
  divide(vert:boolean, level:number, a:WPoint, b:WPoint) {
    let c = this.split(vert ? a.x:a.y, vert ? b.x:b.y, this.rnd);
    if (c < 0) { return this.room(a,b, this.rnd); }
    let e = new WPoint(vert ? c : b.x, vert ? b.y : c);
    let f = new WPoint(vert ? c : a.x, vert ? a.y : c);
    this.draw(f,e,Glyph.Floor);
    this.divide(!vert, level+1, a, e);
    this.divide(!vert, level+1, f, b);        
  } 
  split(c:number, d:number, r:Rnd):number { 
    let dist = d-c; // 10 and 11 is quite different.         
    if (dist < 11) { return -1; }
    let range = Math.floor(dist*0.4)+1;
    let offset = -(range*0.5) + 0.5*(c+d);
    return Math.floor( r.rndC(0,range) + offset); 
  } 
  draw(a:WPoint, b:WPoint, g:Glyph) {
    if (!this.legal(a,b)) { 
      let e = `(${a.x},${a.y})-(${b.x},${b.y})`; 
      console.log(e); throw e; 
    }
    for (let p = a.copy(); p.y <= b.y; ++p.y) {
      for (p.x = a.x;p.x <= b.x ; ++p.x) { this.dm.setp(p, g); }
    }
  }
  room(a:WPoint, b:WPoint, r:Rnd) {
    let l=this.one;
    let a1=a.plus(l), b1=b.minus(l); 
    if (!this.legal(a1,b1)) {return;}
    this.draw(a1, b1, Glyph.Wall );

    let ex = b1.minus(a1); let size = Math.min(ex.x, ex.y);
    if (size < 4) { return; }

    let a2=a1.plus(l), b2=b1.minus(l);
    if (!this.legal(a2,b2)) {return;}
    this.draw(a2, b2, Glyph.Floor);  
    for (let k=r.rndC(1,2);k-->0;) { this.knockDoor(a1,b1,r); }
  }
  one:WPoint = new WPoint(1,1);
  legal(a:WPoint, b:WPoint){ return a.x<=b.x && a.y<=b.y; }
  knockDoor(a:WPoint, b:WPoint, r:Rnd) {
    let rx=r.rndC(a.x+1, b.x-1), ry = r.rndC(a.y+1,b.y-1);
    let vert = r.oneIn(2); let side = r.oneIn(2);
    let door = new WPoint(
      vert ? (side?a.x:b.x) : rx,
     !vert ? (side?a.y:b.y) : ry
    );
    this.dm.setp(door, Glyph.Door_Open);
  }
}
