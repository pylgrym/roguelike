import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";
import { MapDrawerIF } from "./33MapDrawerIF";

export class G3_GridBox_Algo {
  maxx:number; maxy:number;
  constructor(public dm:MapDrawerIF) { 
    this.maxx = dm.dim.x-1; this.maxy = dm.dim.y-1; 
  }    
  run(r:Rnd, dim:WPoint, ratio:number) {
    this.dm.render();
    let rnd_size:boolean = false;
    let rnd_offset:boolean = false;
    let avg = 7;
    let half = Math.floor(avg*0.5);
    for (let bx=half; bx < dim.x-half-1; bx += avg) {
      for (let by=half; by < dim.y-half-1; by += avg) {
        //if (!r.oneIn(ratio)) { continue;} 
        if (((bx+by)%ratio)==1) { continue;}
        let a = avg-2, b = avg-2; 
        if (rnd_size) { 
          a = r.rndC(3,8); b = r.rndC(5,13-a); 
        }
        let vert = r.oneIn(2);
        let w = (vert?a:b), h = (vert?b:a);   
        let xo=0,yo=0;     
        if (rnd_offset) {
          let xr = Math.floor((avg-w)*0.5); 
          let yr = Math.floor((avg-h)*0.5);
          xo = r.rndC(-xr, xr);  
          yo = r.rndC(-yr, yr); 
        }
        this.addBoxAt(bx+xo,by+yo, w, h);                
      } // for
    } // for
  } // run.
  addBoxAt(x:number, y:number, w:number, h:number) { 
    this.draw(new WPoint(x, y),this.clip(new WPoint(x+w, y+h))); 
  }
  draw(e:WPoint, f:WPoint) {
    for (let p = e.copy(); p.y <= f.y; ++p.y) {
      for (p.x = e.x; p.x <= f.x; ++p.x) {
        let edge = (p.x==e.x || p.y==e.y ||
                     p.x==f.x || p.y==f.y); 
        this.dm.carve(p,edge?
           Glyph.Wall:Glyph.Floor,Glyph.Floor);         
      } // can't overwrite HARD.
    }
  }
  clip(BR:WPoint):WPoint {
    if (BR.x > this.maxx) { BR.x = this.maxx; }
    if (BR.y > this.maxy) { BR.y = this.maxy; }
    return BR;
  }  
}