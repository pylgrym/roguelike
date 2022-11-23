import { TPoint } from "O1term/03TPoint";
import { DMap } from "O2model/07DMap";
import { DMapIF } from "O2model/07DMapIF";
import { Glyph } from "O2model/07Glyph";
import { Rnd } from "O2model/07Rnd";
import { WPoint } from "O2model/07WPoint";

export class MapGen1 {
  constructor(public map:DMapIF, public r:Rnd) {}
  public loop(map:DMapIF, r:Rnd) {
    let num = 20;
    let UL = new WPoint(), XT = new WPoint(); 
    for (let n=0;n<num; ++n) { 
      this.pick(UL,XT);
      let filled = r.oneIn(3);
      this.draw(UL,XT,filled);
    }
    return map;
  } 
  pick(UL:WPoint, XT:WPoint) { 
    let r = this.r;
    let dim = this.map.dim;
    XT.y = r.rndC(2,8);
    XT.x = r.rndC(4,12);
    if (r.oneIn(2)) {
      let s = XT.x; XT.x = XT.y; XT.y = s;
    }
    UL.x = r.rnd(1,dim.x-XT.x-1);
    UL.y = r.rnd(1,dim.y-XT.y-1);
  }
  draw(UL:WPoint, XT:WPoint, filled:boolean) {
    let center = filled ? Glyph.Wall : Glyph.Floor;
    let x2 = XT.x-1, y2 = XT.y-1;
    let seconds:WPoint[] = [];
    let p = new WPoint();
    let y=0,x=0;
    for (y=0; y<=XT.y;++y) {
      p.y=y+UL.y;
      for (x=0; x<=XT.x;++x) {
        p.x=x+UL.x;
        let edge = (x==0||y==0||x==XT.x||y==XT.y);
        let secs = (x==1||y==1||x==x2  ||y==y2);
        let f = edge 
                 ? Glyph.Floor 
                 : (secs ? Glyph.Wall : center); 
        this.map.cell(p).env = f;
        if (secs) { seconds.push(p.copy()); }
      }
    }
    if (!filled) { this.makeDoors(seconds); }
  }
  makeDoors(seconds: WPoint[]) {
    let r = this.r;
    for (let i=r.rnd(1,3);i>=0;--i) {
      let ix = r.rnd(0,seconds.length);
      let p = seconds[ix];
      this.map.cell(p).env = Glyph.Door_Open;
    }
  } 

  public static test(level:number):DMapIF {
    let dim = TPoint.StockDims;
    let wdim = new WPoint(dim.x, dim.y); 
    let map = new DMap(wdim,Glyph.Rock,level);
    // hmm, we should make a stock-map.

    let rnd = new Rnd(42);
    let gen = new MapGen1(map,rnd);
    return gen.loop(map, rnd);    
  }
} // end of class here.
